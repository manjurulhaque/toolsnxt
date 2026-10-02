"use client"

import { useEffect, useState } from "react"
import { CheckIcon, SparklesIcon, XIcon } from "@/components/icons"

export type ToastType = "success" | "info" | "error"

export interface ToastItem {
  id: string
  message: string
  type: ToastType
}

const TOAST_EVENT = "webtools_show_toast"

export function showToast(message: string, type: ToastType = "success") {
  if (typeof window === "undefined") return
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: {
        id: Math.random().toString(36).slice(2, 9),
        message,
        type,
      },
    }),
  )
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    function handleToast(event: Event) {
      const customEvent = event as CustomEvent<ToastItem>
      const newToast = customEvent.detail
      if (!newToast || !newToast.message) return

      setToasts((prev) => [...prev.slice(-2), newToast])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
      }, 2400)
    }

    window.addEventListener(TOAST_EVENT, handleToast)
    return () => window.removeEventListener(TOAST_EVENT, handleToast)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-white/10 bg-[var(--ink-900)]/95 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === "success" ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
          ) : toast.type === "error" ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
              <XIcon className="h-3.5 w-3.5" />
            </span>
          ) : (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-rust)]/20 text-[var(--accent-sand)]">
              <SparklesIcon className="h-3.5 w-3.5" />
            </span>
          )}
          <span className="max-w-xs truncate">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
