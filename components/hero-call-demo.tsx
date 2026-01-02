"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, PhoneOff, Volume2, BadgeDollarSign } from "lucide-react"

type DemoState =
  | "idle"
  | "ringing"
  | "voicemail"
  | "caller_talking"
  | "lost"
  | "done"

type Call = {
  id: string
  title: string
  transcript: string[]
  lostValue: number
  audioSrc?: string
}

const CALLS: Call[] = [
  {
    id: "urgent-hvac",
    title: "Urgent same-day repair",
    transcript: [
      "Hey, I'm calling to see if you're available today.",
      "My AC just stopped working and it's getting pretty hot in here.",
      "If you can come out this afternoon, call me back. Thanks.",
    ],
    lostValue: 450,
    audioSrc: "/audio/call-1.mp3",
  },
  {
    id: "plumbing-quote",
    title: "High-intent inbound lead (missed call)",
    transcript: [
      "Hi, !I found you on Google and I'm hoping you're available.",
      "I've got a leaking pipe under my kitchen sink and it's getting worse.",
      "I really need someone to take a look at it today.",
      "Please give me a call back as soon as you can. Thanks."
    ],
    lostValue: 275,
    audioSrc: "/audio/call-2.mp3",
  },
  {
    id: "commercial-job",
    title: "Commercial service request",
    transcript: [
      "Hello, this is Mark with Ridgeview Property Management.",
      "We're looking for someone to service a small commercial unit this week.",
      "If you handle commercial jobs, please give me a call back today.",
    ],
    lostValue: 1200,
    audioSrc: "/audio/call-3.mp3",
  },
]

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal?.aborted) return resolve()

    const t = setTimeout(resolve, ms)
    if (signal) {
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(t)
          resolve()
        },
        { once: true }
      )
    }
  })
}

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

/**
 * Simple ring tone using WebAudio:
 * alternates 480Hz + 440Hz "ring-ring" bursts.
 */
async function playRing(
  ctx: AudioContext,
  gain: GainNode,
  signal: AbortSignal | undefined,
  activeOscRef: React.MutableRefObject<OscillatorNode[]>,
  cycles = 2
) {
  const now = () => ctx.currentTime

  for (let i = 0; i < cycles; i++) {
    if (signal?.aborted) return

    // ring burst ~2s
    for (let j = 0; j < 4; j++) {
      if (signal?.aborted) return

      const o1 = ctx.createOscillator()
      const o2 = ctx.createOscillator()
      o1.type = "sine"
      o2.type = "sine"
      o1.frequency.value = 480
      o2.frequency.value = 440
      o1.connect(gain)
      o2.connect(gain)

      // Register so Reset can stop them
      activeOscRef.current.push(o1, o2)

      const t0 = now()
      gain.gain.setValueAtTime(0.0001, t0)
      gain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.45)

      o1.start(t0)
      o2.start(t0)
      o1.stop(t0 + 0.5)
      o2.stop(t0 + 0.5)

      await sleep(500, signal)
    }
    await sleep(700, signal) // pause between cycles
  }
}

async function playBeep(
  ctx: AudioContext,
  gain: GainNode,
  signal: AbortSignal | undefined,
  activeOscRef: React.MutableRefObject<OscillatorNode[]>,
  freq = 1000,
  durMs = 250
) {
  if (signal?.aborted) return

  const o = ctx.createOscillator()
  o.type = "sine"
  o.frequency.value = freq
  o.connect(gain)

  // Register so Reset can stop it
  activeOscRef.current.push(o)

  const t0 = ctx.currentTime
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(0.14, t0 + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + durMs / 1000)

  o.start(t0)
  o.stop(t0 + durMs / 1000 + 0.02)
  await sleep(durMs + 60, signal)
}

function playAudio(src: string, audioRef: React.MutableRefObject<HTMLAudioElement | null>): Promise<void> {
  return new Promise((resolve, reject) => {
    // Stop any previous audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    
    const audio = new Audio(src)
    audioRef.current = audio
    
    audio.onended = () => {
      audioRef.current = null
      resolve()
    }
    audio.onerror = (e) => {
      audioRef.current = null
      console.error("Audio playback error:", e)
      reject(e)
    }
    audio.play().catch((e) => {
      audioRef.current = null
      console.error("Audio play failed:", e)
      reject(e)
    })
  })
}

function speak(lines: string[], onBoundary?: (idx: number) => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return Promise.resolve()

  // Stop anything already speaking
  window.speechSynthesis.cancel()

  return new Promise<void>((resolve) => {
    let i = 0
    const next = () => {
      if (i >= lines.length) {
        resolve()
        return
      }
      const u = new SpeechSynthesisUtterance(lines[i])
      u.rate = 1.0
      u.pitch = 1.0
      u.onstart = () => onBoundary?.(i)
      u.onend = () => {
        i += 1
        next()
      }
      window.speechSynthesis.speak(u)
    }
    next()
  })
}

export function HeroCallDemo() {
  const [state, setState] = React.useState<DemoState>("idle")
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentCallIndex, setCurrentCallIndex] = React.useState(0)
  const [currentCallValue, setCurrentCallValue] = React.useState(0)
  const [totalLostValue, setTotalLostValue] = React.useState(0)
  const [log, setLog] = React.useState<string[]>([
    "Tap play to hear what missed calls sound like.",
  ])
  const [valueKey, setValueKey] = React.useState(0) // For triggering animations

  const audioRef = React.useRef<{
    ctx: AudioContext
    gain: GainNode
  } | null>(null)
  const currentAudioRef = React.useRef<HTMLAudioElement | null>(null)
  const subtitleTimeoutsRef = React.useRef<NodeJS.Timeout[]>([])
  const abortRef = React.useRef<AbortController | null>(null)
  const activeOscRef = React.useRef<OscillatorNode[]>([])

  const reset = React.useCallback(() => {
    // Abort async demo loop immediately
    abortRef.current?.abort()
    abortRef.current = null

    // Kill any WebAudio oscillators immediately
    activeOscRef.current.forEach((o) => {
      try {
        o.stop()
      } catch {}
      try {
        o.disconnect()
      } catch {}
    })
    activeOscRef.current = []

    // Mute WebAudio gain instantly (extra safety)
    if (audioRef.current) {
      try {
        audioRef.current.gain.gain.setValueAtTime(0.0001, audioRef.current.ctx.currentTime)
      } catch {}
    }

    setState("idle")
    setIsPlaying(false)
    setCurrentCallIndex(0)
    setCurrentCallValue(0)
    setTotalLostValue(0)
    setValueKey(0)
    setLog(["Tap play to hear what missed calls sound like."])

    // Stop speech
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }

    // Stop HTML audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
      currentAudioRef.current = null
    }

    // Clear subtitle timeouts
    subtitleTimeoutsRef.current.forEach(clearTimeout)
    subtitleTimeoutsRef.current = []
  }, [])

  const ensureAudio = React.useCallback(async () => {
    if (audioRef.current) return audioRef.current
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const gain = ctx.createGain()
    gain.gain.value = 0.0001
    gain.connect(ctx.destination)
    audioRef.current = { ctx, gain }
    return audioRef.current
  }, [])

  const runDemo = React.useCallback(async () => {
    if (isPlaying) return
    setIsPlaying(true)

    const controller = new AbortController()
    abortRef.current = controller
    const signal = controller.signal

    try {
      const { ctx, gain } = await ensureAudio()
      if (ctx.state === "suspended") await ctx.resume()

      let runningTotal = 0

      // Loop through all calls
      for (let callIdx = 0; callIdx < CALLS.length; callIdx++) {
        if (signal.aborted) return

        const call = CALLS[callIdx]
        setCurrentCallIndex(callIdx)
        setCurrentCallValue(call.lostValue)

        // Ring
        setLog((l) => [...l.slice(-3), `Incoming call ${callIdx + 1} of ${CALLS.length}…`])
        setState("ringing")
        await playRing(ctx, gain, signal, activeOscRef, 2)
        if (signal.aborted) return

        // Voicemail beep
        setLog((l) => [...l.slice(-3), "No answer. Caller waits…"])
        setState("voicemail")
        await playBeep(ctx, gain, signal, activeOscRef, 1000, 220)
        await sleep(250, signal)
        if (signal.aborted) return

        // Caller speaks
        setState("caller_talking")
        
        if (call.audioSrc) {
          // Use audio file if available
          try {
            // Preload audio to get duration for subtitle timing
            const preloadAudio = new Audio(call.audioSrc)
            let audioDuration = 0
            
            await new Promise<void>((resolve) => {
              preloadAudio.addEventListener('loadedmetadata', () => {
                audioDuration = preloadAudio.duration
                resolve()
              })
              preloadAudio.addEventListener('error', () => {
                // If metadata fails, estimate 2 seconds per line
                audioDuration = call.transcript.length * 2
                resolve()
              })
              preloadAudio.load()
            })
            
            // Show first line immediately
            setLog((l) => [...l.slice(-3), `Caller: "${call.transcript[0]}"`])
            
            // Calculate timing for each line (distribute evenly across duration)
            const lineDuration = audioDuration / call.transcript.length
            
            // Schedule remaining lines
            const lineTimeouts: NodeJS.Timeout[] = []
            for (let i = 1; i < call.transcript.length; i++) {
              const timeout = setTimeout(() => {
                setLog((l) => [...l.slice(-3), `Caller: "${call.transcript[i]}"`])
              }, lineDuration * i * 1000)
              lineTimeouts.push(timeout)
              subtitleTimeoutsRef.current.push(timeout)
            }
            
            // Play the actual audio
            await playAudio(call.audioSrc, currentAudioRef)
            if (signal.aborted) return
            
            // Clear any remaining timeouts (in case audio finished early)
            lineTimeouts.forEach(clearTimeout)
            // Remove cleared timeouts from ref
            subtitleTimeoutsRef.current = subtitleTimeoutsRef.current.filter(
              (t) => !lineTimeouts.includes(t)
            )
            
            // Ensure all lines are shown at the end
            if (call.transcript.length > 1) {
              setLog((l) => [...l.slice(-3), `Caller: "${call.transcript[call.transcript.length - 1]}"`])
            }
          } catch (e) {
            // Fallback to text-to-speech if audio fails
            console.warn("Audio playback failed, using text-to-speech:", e)
            await speak(
              call.transcript,
              (idx) => {
                if (idx < call.transcript.length) {
                  setLog((l) => [...l.slice(-3), `Caller: "${call.transcript[idx]}"`])
                }
              },
            )
            if (signal.aborted) return
          }
        } else {
          // Fallback to text-to-speech
          await speak(
            call.transcript,
            (idx) => {
              if (idx < call.transcript.length) {
                setLog((l) => [...l.slice(-3), `Caller: "${call.transcript[idx]}"`])
              }
            },
          )
          if (signal.aborted) return
        }

        // Show lost value for this call
        setState("lost")
        runningTotal += call.lostValue
        setTotalLostValue(runningTotal)
        setValueKey((k) => k + 1) // Trigger animation
        setLog((l) => [...l.slice(-3), `Missed lead • Est. value: ${formatMoney(call.lostValue)}`])
        
        // Animate current call value
        const start = call.lostValue
        const end = 0
        const steps = 20
        for (let i = 0; i <= steps; i++) {
          if (signal.aborted) return
          const v = Math.round(start + (end - start) * (i / steps))
          setCurrentCallValue(v)
          if (i === 0) {
            setValueKey((k) => k + 1) // Trigger animation at start
          }
          await sleep(20, signal)
        }
        if (signal.aborted) return

        // Brief pause between calls (except after last)
        if (callIdx < CALLS.length - 1) {
          await playBeep(ctx, gain, signal, activeOscRef, 220, 150)
          await sleep(400, signal)
          if (signal.aborted) return
        }
      }

      if (signal.aborted) return

      // Final summary
      await playBeep(ctx, gain, signal, activeOscRef, 220, 180)
      if (signal.aborted) return

      setState("done")
      setCurrentCallValue(0)
      setLog((l) => [
        ...l.slice(-2),
        `${CALLS.length} missed calls. ${formatMoney(runningTotal)} in lost revenue.`,
        "Fixr answers every call automatically.",
      ])
    } catch (e) {
      console.error(e)
      setLog((l) => [...l.slice(-3), "Audio blocked by browser settings."])
      setState("idle")
    } finally {
      // Only clear if we're the active controller
      if (abortRef.current === controller) abortRef.current = null
      setIsPlaying(false)
    }
  }, [ensureAudio, isPlaying])

  React.useEffect(() => {
    return () => {
      // Cleanup on unmount
      try {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel()
        }
        audioRef.current?.ctx?.close?.()
        if (currentAudioRef.current) {
          currentAudioRef.current.pause()
          currentAudioRef.current.currentTime = 0
        }
        subtitleTimeoutsRef.current.forEach(clearTimeout)
      } catch {}
      audioRef.current = null
      currentAudioRef.current = null
      subtitleTimeoutsRef.current = []
    }
  }, [])

  const statusLabel =
    state === "ringing"
      ? `Ringing… (${currentCallIndex + 1}/${CALLS.length})`
      : state === "voicemail"
        ? "No answer…"
        : state === "caller_talking"
          ? "Caller speaking…"
          : state === "lost"
            ? "Lead lost"
            : state === "done"
              ? "All calls missed"
              : "Ready"

  return (
    <Card className="w-full rounded-2xl border border-accent/20 bg-accent/5">
      <div className="p-2.5 sm:p-4 lg:p-6 flex flex-col justify-center gap-4">
        <div className="flex items-start justify-between gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
          <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-xs lg:text-sm font-semibold text-foreground flex items-center gap-1.5 sm:gap-2">
              <Phone className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-accent flex-shrink-0" />
              <span className="truncate">Missed Call Simulator</span>
            </div>
            <div className="text-xs sm:text-[10px] lg:text-xs text-muted-foreground mt-0.5 sm:mt-1">
              Hear what happens when nobody picks up.
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-[10px] sm:text-[10px] lg:text-[11px] uppercase tracking-wide text-muted-foreground">Status</div>
            <div className="text-sm sm:text-xs lg:text-sm font-semibold text-foreground whitespace-nowrap">{statusLabel}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 lg:gap-4">
          <div className={`rounded-lg sm:rounded-xl border px-2 pt-2 pb-0 sm:px-2.5 sm:pt-2.5 sm:pb-0 lg:px-4 lg:pt-4 lg:pb-0 flex flex-col ${
            totalLostValue > 0 
              ? "border-red-500/20 bg-red-50/50 dark:bg-red-950/20" 
              : "border-accent/15 bg-background/70"
          }`}>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2 lg:mb-2 flex-shrink-0">
              <div className={`text-xs sm:text-[10px] lg:text-xs font-medium ${
                totalLostValue > 0 
                  ? "text-red-600 dark:text-red-400" 
                  : "text-muted-foreground"
              }`}>Total lost revenue</div>
              <BadgeDollarSign className={`h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 flex-shrink-0 ${
                totalLostValue > 0 ? "text-red-500" : "text-accent"
              }`} />
            </div>
            <div className={`text-2xl sm:text-xl lg:text-3xl font-bold tabular-nums relative flex-shrink-0 ${
              totalLostValue > 0 
                ? "text-red-600 dark:text-red-400" 
                : "text-foreground"
            }`}>
              <span 
                key={`total-${valueKey}`}
                className={`inline-block ${totalLostValue > 0 ? "animate-money-away" : ""}`}
              >
                {totalLostValue > 0 ? "-" : ""}{formatMoney(totalLostValue)}
              </span>
            </div>
            {state !== "idle" && state !== "done" && currentCallValue > 0 && (
              <div className="mt-1.5 sm:mt-2 lg:mt-2 pt-1.5 sm:pt-2 lg:pt-2 border-t border-red-200 dark:border-red-800 -mx-2 sm:-mx-2.5 lg:-mx-4 px-2 sm:px-2.5 lg:px-4 pb-2 sm:pb-2.5 lg:pb-4">
                <div className="text-xs sm:text-[10px] lg:text-xs text-red-600/80 dark:text-red-400/80 mb-0.5 sm:mb-1 font-medium">Current call</div>
                <div className="text-base sm:text-base lg:text-lg font-semibold text-red-600 dark:text-red-400 tabular-nums relative">
                  <span 
                    key={`current-${valueKey}-${currentCallValue}`}
                    className="inline-block animate-money-away"
                  >
                    -{formatMoney(currentCallValue)}
                  </span>
                </div>
              </div>
            )}
            {state === "done" && (
              <div className="mt-2 text-xs sm:text-xs text-red-600/70 dark:text-red-400/70 flex-shrink-0">
                {CALLS.length} missed calls
              </div>
            )}
          </div>

          <div className="rounded-lg sm:rounded-xl border border-accent/15 bg-background/70 p-2 sm:p-2.5 lg:p-4 flex flex-col mb-0">
            <div className="text-xs sm:text-[10px] lg:text-xs text-muted-foreground mb-1 sm:mb-1.5 lg:mb-2 flex-shrink-0">What you hear</div>
            <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 overflow-y-auto flex-1 min-h-0 pr-0.5 sm:pr-1">
              {log.slice(-3).map((line, idx) => (
                <div
                  key={`${line}-${idx}`}
                  className="text-xs sm:text-[11px] lg:text-sm text-foreground/90 leading-tight sm:leading-snug break-words"
                  style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                >
                  • {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:gap-2.5 lg:gap-3">
          {state !== "done" ? (
            <>
              <Button
                onClick={runDemo}
                disabled={isPlaying}
                className="h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 text-sm sm:text-sm lg:text-base"
              >
                <Volume2 className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 mr-1.5 sm:mr-2" />
                {isPlaying ? "Playing…" : "Play missed calls"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={reset}
                className="h-9 sm:h-10 lg:h-11 border-accent/40 hover:bg-accent/10 text-sm sm:text-sm lg:text-base"
              >
                <PhoneOff className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 mr-1.5 sm:mr-2" />
                Reset
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  const demoSection = document.getElementById("demo")
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 flex-1 text-sm sm:text-sm lg:text-base"
              >
                See how Fixr handles this →
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={reset}
                className="h-9 sm:h-10 lg:h-11 border-accent/40 hover:bg-accent/10 text-sm sm:text-sm lg:text-base"
              >
                <PhoneOff className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 mr-1.5 sm:mr-2" />
                Reset
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
