'use client'

import { ReactLenis } from 'lenis/react'

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactLenis
      root
      options={{
        // Höher = Scroll folgt direkter. Bei 0.1 lief die Seite spürbar nach.
        lerp: 0.14,
        smoothWheel: true,
        // Smooth-scroll in-page anchor links (#kontakt, timeline jumps, …)
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
