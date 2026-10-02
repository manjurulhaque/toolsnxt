"use client"

import { useEffect, useState } from "react"
import { KeyboardIcon, ShieldCheckIcon, XIcon, ZapIcon } from "@/components/icons"

const SHORTCUTS_EVENT = "webtools_open_shortcuts"

export function openShortcutsDialog() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(SHORTCUTS_EVENT))
}

export function KeyboardShortcutsDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleOpen() {
      setIsOpen(true)
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "?" && !isOpen) {
        const target = e.target as HTMLElement | null
        const isInput =
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.isContentEditable
        if (!isInput) {
          e.preventDefault()
          setIsOpen(true)
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener(SHORTCUTS_EVENT, handleOpen)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener(SHORTCUTS_EVENT, handleOpen)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-[var(--ink-900)]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-[2rem] border border-[var(--ink-900)]/12 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:p-8">
        <div className="flex items-center justify-between border-b border-[var(--ink-900)]/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-[var(--accent-rust)]">
              <KeyboardIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 id="shortcuts-dialog-title" className="text-lg font-bold text-[var(--ink-900)]">
                Keyboard Shortcuts
              </h2>
              <p className="text-xs text-[var(--ink-700)]">Power-user efficiency shortcuts</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close shortcuts dialog"
            className="rounded-full p-1.5 text-[var(--ink-700)]/60 hover:bg-black/5 hover:text-[var(--ink-900)] transition"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--ink-900)]/6 bg-[var(--page-cream)]/60 p-3 sm:px-4">
            <div className="flex items-center gap-3">
              <ZapIcon className="h-4 w-4 text-[var(--accent-rust)] shrink-0" />
              <span className="text-sm font-medium text-[var(--ink-900)]">Global Tool Search</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="rounded border border-[var(--ink-900)]/10 bg-white px-2 py-1 font-mono text-xs font-semibold shadow-xs">
                Ctrl
              </kbd>
              <span className="text-xs text-[var(--ink-700)]/50">+</span>
              <kbd className="rounded border border-[var(--ink-900)]/10 bg-white px-2 py-1 font-mono text-xs font-semibold shadow-xs">
                K
              </kbd>
              <span className="text-xs text-[var(--ink-700)]/50">or</span>
              <kbd className="rounded border border-[var(--ink-900)]/10 bg-white px-2 py-1 font-mono text-xs font-semibold shadow-xs">
                /
              </kbd>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--ink-900)]/6 bg-[var(--page-cream)]/60 p-3 sm:px-4">
            <div className="flex items-center gap-3">
              <ZapIcon className="h-4 w-4 text-[var(--accent-rust)] shrink-0" />
              <span className="text-sm font-medium text-[var(--ink-900)]">Execute / Minify Code</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="rounded border border-[var(--ink-900)]/10 bg-white px-2 py-1 font-mono text-xs font-semibold shadow-xs">
                Ctrl
              </kbd>
              <span className="text-xs text-[var(--ink-700)]/50">+</span>
              <kbd className="rounded border border-[var(--ink-900)]/10 bg-white px-2 py-1 font-mono text-xs font-semibold shadow-xs">
                Enter
              </kbd>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--ink-900)]/6 bg-[var(--page-cream)]/60 p-3 sm:px-4">
            <div className="flex items-center gap-3">
              <KeyboardIcon className="h-4 w-4 text-[var(--accent-rust)] shrink-0" />
              <span className="text-sm font-medium text-[var(--ink-900)]">Shortcuts Guide</span>
            </div>
            <kbd className="rounded border border-[var(--ink-900)]/10 bg-white px-2 py-1 font-mono text-xs font-semibold shadow-xs">
              ?
            </kbd>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--ink-900)]/6 bg-[var(--page-cream)]/60 p-3 sm:px-4">
            <div className="flex items-center gap-3">
              <XIcon className="h-4 w-4 text-[var(--ink-700)] shrink-0" />
              <span className="text-sm font-medium text-[var(--ink-900)]">Close Dialog / Search</span>
            </div>
            <kbd className="rounded border border-[var(--ink-900)]/10 bg-white px-2 py-1 font-mono text-xs font-semibold shadow-xs">
              Esc
            </kbd>
          </div>
        </div>

        {/* Offline note */}
        <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-emerald-600/20 bg-emerald-50/70 p-3.5 text-xs text-emerald-900">
          <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <p className="leading-5">
            <strong>100% Offline Capability:</strong> All 52 utilities operate inside your device&apos;s physical browser sandbox. No active Wi-Fi or mobile data is required once cached.
          </p>
        </div>
      </div>
    </div>
  )
}
