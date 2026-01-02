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
      "Hi, I found you on Google and I'm hoping you're available.",
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

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

/**
 * Simple ring tone using WebAudio:
 * alternates 480Hz + 440Hz "ring-ring" bursts.
 */
async function playRing(ctx: AudioContext, gain: GainNode, cycles = 2) {
  const now = () => ctx.currentTime

  for (let i = 0; i < cycles; i++) {
    // ring burst ~2s
    for (let j = 0; j < 4; j++) {
      const o1 = ctx.createOscillator()
      const o2 = ctx.createOscillator()
      o1.type = "sine"
      o2.type = "sine"
      o1.frequency.value = 480
      o2.frequency.value = 440
      o1.connect(gain)
      o2.connect(gain)

      const t0 = now()
      gain.gain.setValueAtTime(0.0001, t0)
      gain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.45)

      o1.start(t0)
      o2.start(t0)
      o1.stop(t0 + 0.5)
      o2.stop(t0 + 0.5)

      await sleep(500)
    }
    await sleep(700) // pause between cycles
  }
}

async function playBeep(ctx: AudioContext, gain: GainNode, freq = 1000, durMs = 250) {
  const o = ctx.createOscillator()
  o.type = "sine"
  o.frequency.value = freq
  o.connect(gain)

  const t0 = ctx.currentTime
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(0.14, t0 + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + durMs / 1000)

  o.start(t0)
  o.stop(t0 + durMs / 1000 + 0.02)
  await sleep(durMs + 60)
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

  const reset = React.useCallback(() => {
    setState("idle")
    setIsPlaying(false)
    setCurrentCallIndex(0)
    setCurrentCallValue(0)
    setTotalLostValue(0)
    setValueKey(0)
    setLog(["Tap play to hear what missed calls sound like."])
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    // Stop any playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
      currentAudioRef.current = null
    }
    // Clear any subtitle timeouts
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

    try {
      const { ctx, gain } = await ensureAudio()
      if (ctx.state === "suspended") await ctx.resume()

      let runningTotal = 0

      // Loop through all calls
      for (let callIdx = 0; callIdx < CALLS.length; callIdx++) {
        const call = CALLS[callIdx]
        setCurrentCallIndex(callIdx)
        setCurrentCallValue(call.lostValue)

        // Ring
        setLog((l) => [...l.slice(-3), `Incoming call ${callIdx + 1} of ${CALLS.length}…`])
        setState("ringing")
        await playRing(ctx, gain, 2)

        // Voicemail beep
        setLog((l) => [...l.slice(-3), "No answer. Caller waits…"])
        setState("voicemail")
        await playBeep(ctx, gain, 1000, 220)
        await sleep(250)

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
          const v = Math.round(start + (end - start) * (i / steps))
          setCurrentCallValue(v)
          if (i === 0) {
            setValueKey((k) => k + 1) // Trigger animation at start
          }
          await sleep(20)
        }

        // Brief pause between calls (except after last)
        if (callIdx < CALLS.length - 1) {
          await playBeep(ctx, gain, 220, 150)
          await sleep(400)
        }
      }

      // Final summary
      await playBeep(ctx, gain, 220, 180)
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
    <Card className="h-full w-full rounded-2xl border border-accent/20 bg-accent/5 overflow-hidden">
      <div className="p-6 sm:p-7 h-full flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              Missed Call Simulator
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Hear what happens when nobody picks up.
            </div>
          </div>

          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Status</div>
            <div className="text-sm font-semibold text-foreground">{statusLabel}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 ${
            totalLostValue > 0 
              ? "border-red-500/20 bg-red-50/50 dark:bg-red-950/20" 
              : "border-accent/15 bg-background/70"
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`text-xs font-medium ${
                totalLostValue > 0 
                  ? "text-red-600 dark:text-red-400" 
                  : "text-muted-foreground"
              }`}>Total lost revenue</div>
              <BadgeDollarSign className={`h-4 w-4 ${
                totalLostValue > 0 ? "text-red-500" : "text-accent"
              }`} />
            </div>
            <div className={`text-3xl font-bold tabular-nums relative ${
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
              <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800">
                <div className="text-xs text-red-600/80 dark:text-red-400/80 mb-1 font-medium">Current call</div>
                <div className="text-lg font-semibold text-red-600 dark:text-red-400 tabular-nums relative">
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
              <div className="mt-2 text-xs text-red-600/70 dark:text-red-400/70">
                {CALLS.length} missed calls
              </div>
            )}
          </div>

          <div className="rounded-xl border border-accent/15 bg-background/70 p-4">
            <div className="text-xs text-muted-foreground mb-2">What you hear</div>
            <div className="space-y-2">
              {log.slice(-3).map((line, idx) => (
                <div
                  key={`${line}-${idx}`}
                  className="text-sm text-foreground/90 leading-snug"
                >
                  • {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
          {state !== "done" ? (
            <>
              <Button
                onClick={runDemo}
                disabled={isPlaying}
                className="h-11 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {isPlaying ? "Playing…" : "Play missed calls"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={reset}
                className="h-11 border-accent/40 hover:bg-accent/10"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
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
                className="h-11 bg-accent text-accent-foreground hover:bg-accent/90 flex-1"
              >
                See how Fixr handles this →
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={reset}
                className="h-11 border-accent/40 hover:bg-accent/10"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
