'use client'

import { useEffect } from 'react'

/**
 * Cleanup component to hide empty nextjs-portal elements
 * These portals are created by Next.js dev tools and shouldn't be visible when empty
 */
export function PortalCleanup() {
  useEffect(() => {
    function cleanupPortals() {
      const portals = document.querySelectorAll('nextjs-portal')
      portals.forEach((portal) => {
        // Hide portals that are empty or have zero dimensions
        if (
          portal.children.length === 0 ||
          (portal.getBoundingClientRect().width === 0 &&
            portal.getBoundingClientRect().height === 0)
        ) {
          ;(portal as HTMLElement).style.display = 'none'
        }
      })
    }

    // Run immediately
    cleanupPortals()

    // Run after a short delay to catch dynamically added portals
    const timeoutId = setTimeout(cleanupPortals, 100)

    // Use MutationObserver to catch portals added dynamically
    const observer = new MutationObserver(cleanupPortals)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  return null
}



