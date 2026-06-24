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
        lerp: 0.1,
        smoothWheel: true,
        // Smooth-scroll in-page anchor links (#kontakt, timeline jumps, …)
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
