"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface LightboxProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  children?: React.ReactNode
}

export function LightboxImage({ src, alt, width = 400, height = 400, className = "", children }: LightboxProps) {
  const [open, setOpen] = useState(false)

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onKeyDown])

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-zoom-in group relative"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') setOpen(true) }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto rounded-lg border border-gray-200 transition-transform duration-200 group-hover:scale-[1.02] ${className}`}
        />
        {children}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors duration-200 flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
            Click to enlarge
          </span>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
