"use client"

import Image from "next/image"
import { useState } from "react"

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50)
  const clipPath = `inset(0 ${100 - position}% 0 0)`

  return <figure className="before-after" aria-label="Living room before and after interior transformation">
    <Image className="before-after-image" src="/images/home/living-room-before.jpg" alt="Unfinished apartment living room before interior work" fill priority draggable={false} sizes="(max-width: 900px) calc(100vw - 40px), 46vw" />
    <div className="before-after-reveal" style={{ clipPath, WebkitClipPath: clipPath }}>
      <Image className="before-after-image" src="/images/home/living-room-after.jpg" alt="The same living room after complete interior design and execution" fill priority draggable={false} sizes="(max-width: 900px) calc(100vw - 40px), 46vw" />
    </div>
    <span className="before-after-label before-label">Initial</span>
    <span className="before-after-label after-label">Final</span>
    <span className="before-after-divider" style={{ left: `${position}%` }} aria-hidden="true"><span className="before-after-handle">↔</span></span>
    <input className="before-after-range" type="range" min="0" max="100" value={position} onInput={event => setPosition(Number(event.currentTarget.value))} onChange={event => setPosition(Number(event.currentTarget.value))} aria-label="Drag to compare the initial and final interior" />
    <figcaption>Drag to reveal the transformation</figcaption>
  </figure>
}
