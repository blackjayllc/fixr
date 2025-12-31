"use client"

import { useState, useEffect, useRef } from "react"

export default function HammerNail() {
  const [isHammering, setIsHammering] = useState(false)
  const [nailDepth, setNailDepth] = useState(0)
  const [hammerRotation, setHammerRotation] = useState(0)
  const [hammerY, setHammerY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const maxDepth = 100

  const handleClick = () => {
    if (isHammering) return

    setIsHammering(true)
    setHammerRotation(-45) // Rotate hammer down
    setHammerY(30) // Move hammer down

    setTimeout(() => {
      // Hit the nail
      setNailDepth((prev) => Math.min(prev + 15, maxDepth))
      
      // Bounce back
      setHammerRotation(10)
      setHammerY(-10)

      setTimeout(() => {
        // Return to rest position
        setHammerRotation(0)
        setHammerY(0)
        setIsHammering(false)
      }, 200)
    }, 150)
  }

  // Auto-animate on mount for initial effect
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClick()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const nailProgress = (nailDepth / maxDepth) * 100

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-pointer select-none"
      onClick={handleClick}
      style={{ touchAction: "none" }}
    >
      {/* Wood surface */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/40 to-amber-800/30" />

      {/* Wood grain lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-px bg-amber-900/20"
          style={{ bottom: `${10 + i * 4}%` }}
        />
      ))}

      {/* Nail */}
      <div className="absolute left-1/2 bottom-[30%] transform -translate-x-1/2 transition-all duration-150">
        <div
          className="relative w-1 bg-gray-600 shadow-lg"
          style={{
            height: `${20 + nailDepth * 0.3}px`,
            transform: `translateY(${nailDepth * 0.3}px)`,
          }}
        >
          {/* Nail head */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-3 h-3 rounded-full bg-gray-700 shadow-md border border-gray-800"
            style={{
              opacity: nailDepth > 80 ? 0 : 1,
              transform: `translateX(-50%) translateY(${-1 - nailDepth * 0.15}px)`,
            }}
          />
          {/* Nail tip */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-500" />
        </div>
      </div>

      {/* Hammer */}
      <div
        className="absolute left-1/2 top-[20%] transform -translate-x-1/2 transition-all duration-150 ease-out origin-bottom"
        style={{
          transform: `translateX(-50%) translateY(${hammerY}px) rotate(${hammerRotation}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        {/* Hammer handle */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded shadow-lg" />
          
          {/* Hammer head */}
          <div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded shadow-xl"
            style={{
              transform: "translateX(-50%)",
            }}
          >
            {/* Hammer face */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800 rounded" />
            {/* Hammer claw side */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gray-800 rounded-l" />
          </div>
        </div>
      </div>

      {/* Impact particles when hammering */}
      {isHammering && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-[60%] w-1 h-1 bg-amber-400 rounded-full animate-ping"
              style={{
                left: `${50 + (Math.random() - 0.5) * 20}%`,
                animationDelay: `${i * 30}ms`,
                animationDuration: "400ms",
              }}
            />
          ))}
        </>
      )}

      {/* Progress indicator */}
      {nailDepth < maxDepth && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-50">
          Click to hammer
        </div>
      )}

      {/* Completion message */}
      {nailDepth >= maxDepth && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-accent animate-pulse">
          Nailed it!
        </div>
      )}
    </div>
  )
}
