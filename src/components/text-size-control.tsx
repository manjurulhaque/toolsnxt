"use client"

import { useEffect, useRef, useState } from "react"
import { CheckIcon, TextSizeAaIcon, XIcon } from "@/components/icons"
import { showToast } from "@/components/toast"
import { useToolPreferences, type TextSize } from "@/lib/user-preferences"

const TEXT_SIZE_OPTIONS: Array<{
  id: TextSize
  label: string
  scaleLabel: string
  description: string
}> = [
  {
    id: "normal",
    label: "Normal",
    scaleLabel: "100%",
    description: "Standard readable size with automatic PWA enhancement",
  },
  {
    id: "large",
    label: "Large",
    scaleLabel: "+10%",
    description: "Generous font scaling for higher comfort on mobile & desktop PWA",
  },
  {
    id: "xlarge",
    label: "Extra Large",
    scaleLabel: "+22%",
    description: "Maximum legibility across all tools, controls, and code snippets",
  },
]

export function TextSizeControl() {
  const { textSize, setTextSize } = useToolPreferences()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync dataset on document root when textSize changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-text-size", textSize)
    }
  }, [textSize])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  function handleSelect(size: TextSize) {
    setTextSize(size)
    const option = TEXT_SIZE_OPTIONS.find((o) => o.id === size)
    showToast(`Text size set to ${option?.label || size} (${option?.scaleLabel})`, "info")
    setIsOpen(false)
  }

  const isCustomScale = textSize !== "normal"
  const currentOption = TEXT_SIZE_OPTIONS.find((o) => o.id === textSize)

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Text size settings"
        title={`Text size: ${currentOption?.label || "Normal"} (${currentOption?.scaleLabel})`}
        className={`relative flex h-9 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:py-2 ${
          isCustomScale
            ? "border-[var(--accent-rust)]/40 bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] shadow-xs"
            : "border-[var(--ink-900)]/10 bg-white text-[var(--ink-700)] shadow-xs hover:border-[var(--ink-900)]/30 hover:bg-[var(--page-cream)]/50 hover:text-[var(--ink-900)]"
        }`}
      >
        <TextSizeAaIcon className="h-4 w-4" />
        <span className="hidden md:inline font-medium">Text</span>
        {isCustomScale ? (
          <span className="rounded-full bg-[var(--accent-rust)] px-1.5 py-0.2 text-[10px] font-bold text-white leading-tight">
            {currentOption?.scaleLabel}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Text size options"
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-[var(--ink-900)]/12 bg-white p-4 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between border-b border-[var(--ink-900)]/8 pb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-900)]">
                Text Size
              </p>
              <p className="text-[11px] text-[var(--ink-700)]">
                PWA & offline reading comfort
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-[var(--ink-700)] hover:bg-[var(--page-cream)] hover:text-[var(--ink-900)]"
              aria-label="Close text size menu"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {TEXT_SIZE_OPTIONS.map((opt) => {
              const active = textSize === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full rounded-xl border p-2.5 text-left transition flex items-center justify-between gap-3 ${
                    active
                      ? "border-[var(--accent-rust)] bg-[var(--accent-rust)]/8 text-[var(--ink-900)]"
                      : "border-[var(--ink-900)]/8 bg-[var(--page-cream)]/40 hover:border-[var(--ink-900)]/20 hover:bg-white text-[var(--ink-800)]"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{opt.label}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                          active
                            ? "bg-[var(--accent-rust)] text-white"
                            : "bg-[var(--ink-900)]/6 text-[var(--ink-700)]"
                        }`}
                      >
                        {opt.scaleLabel}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-[var(--ink-700)]">
                      {opt.description}
                    </p>
                  </div>
                  {active ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-rust)] text-white">
                      <CheckIcon className="h-3 w-3 stroke-[2.5]" />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>

          {/* Quick live preview */}
          <div className="mt-3 rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-2.5 text-center">
            <p className="text-[11px] font-medium text-[var(--ink-700)]">
              Preview: <span className="font-semibold text-[var(--ink-900)]">Browser tools for everyday work</span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
