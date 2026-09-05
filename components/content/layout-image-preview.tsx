"use client"

import Image from "next/image"
import { Maximize2, X } from "lucide-react"
import { createPortal } from "react-dom"
import { useEffect, useRef, useState } from "react"

interface LayoutImagePreviewProps {
  className: string
  src: string
  alt: string
  width: number
  height: number
}

export function LayoutImagePreview({ className, src, alt, width, height }: LayoutImagePreviewProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
      openButtonRef.current?.focus()
    }
  }, [open])

  const modal = open && mounted ? createPortal(
    <div className="layout-preview-modal" role="dialog" aria-modal="true" aria-label={`Preview: ${alt}`} onClick={() => setOpen(false)}>
      <div className="layout-preview-frame" onClick={event => event.stopPropagation()}>
        <Image className="layout-preview-full-image" src={src} alt={alt} width={width} height={height} sizes="90vw" priority />
        <button ref={closeButtonRef} className="layout-preview-close" type="button" aria-label="Close image preview" onClick={() => setOpen(false)}><X aria-hidden="true" /></button>
      </div>
    </div>,
    document.body,
  ) : null

  return <div className={`${className} layout-preview-trigger`}>
    <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw" />
    <button ref={openButtonRef} className="layout-preview-open" type="button" aria-label={`Open image preview: ${alt}`} onClick={() => setOpen(true)}><Maximize2 aria-hidden="true" /></button>
    {modal}
  </div>
}
