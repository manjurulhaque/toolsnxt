"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import {
  CloudOffIcon,
  DownloadIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  XIcon,
} from "@/components/icons"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

function subscribeOnline(callback: () => void) {
  window.addEventListener("online", callback)
  window.addEventListener("offline", callback)
  return () => {
    window.removeEventListener("online", callback)
    window.removeEventListener("offline", callback)
  }
}

function getOnlineSnapshot() {
  return navigator.onLine
}

function getServerOnlineSnapshot() {
  return true
}

function subscribeStandalone(callback: () => void) {
  const mql = window.matchMedia("(display-mode: standalone)")
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getStandaloneSnapshot() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function getServerStandaloneSnapshot() {
  return false
}

export function PwaManager() {
  const isOnline = useSyncExternalStore(subscribeOnline, getOnlineSnapshot, getServerOnlineSnapshot)
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getStandaloneSnapshot,
    getServerStandaloneSnapshot
  )
  const isOffline = !isOnline

  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [dismissedInstall, setDismissedInstall] = useState(false)

  // Service Worker Registration and Install Prompt Listener
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    if (process.env.NODE_ENV !== "production") {
      // In development, unregister any active service workers on localhost to avoid stale caching,
      // dev server compile storms, and hydration mismatch errors
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister()
          }
        })
      }
      if ("caches" in window) {
        caches.keys().then((keys) => {
          for (const key of keys) {
            caches.delete(key)
          }
        })
      }
      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      }
    }

    if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          if (registration.waiting) {
            setWaitingWorker(registration.waiting)
            setUpdateAvailable(true)
          }

          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  setWaitingWorker(newWorker)
                  setUpdateAvailable(true)
                }
              })
            }
          })
        })
        .catch((err) => {
          console.warn("[PWA Manager] Service Worker registration failed:", err)
        })

      let refreshing = false
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
      })
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  // Trigger service worker update reload
  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" })
    }
  }

  // Trigger PWA install prompt
  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setIsInstallable(false)
      setDeferredPrompt(null)
    }
  }

  return (
    <>
      {/* 1. Offline Notification Status Pill */}
      {isOffline ? (
        <aside
          role="status"
          aria-live="polite"
          aria-label="Offline Mode Status"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-600/30 bg-amber-50/95 p-3.5 shadow-[0_12px_32px_rgba(217,119,6,0.18)] backdrop-blur-md text-[var(--ink-900)]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700">
                <CloudOffIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-amber-900">
                  Offline Mode Active
                </p>
                <p className="text-[11px] text-amber-800/80">
                  All 52 tools execute locally in your browser memory.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                <ShieldCheckIcon className="h-3 w-3 text-emerald-600" />
                100% Local
              </span>
            </div>
          </div>
        </aside>
      ) : null}

      {/* 2. PWA Update Notification */}
      {updateAvailable ? (
        <aside
          role="alert"
          aria-live="assertive"
          aria-label="Software Update"
          className="fixed bottom-4 right-4 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--accent-rust)]/30 bg-white p-4 shadow-xl text-[var(--ink-900)]">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-[var(--accent-rust)]">
                <RotateCcwIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-[var(--ink-900)]">
                  Update Ready
                </p>
                <p className="text-[11px] text-[var(--ink-700)]">
                  New tools & offline improvements available.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-full bg-[var(--ink-900)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[var(--ink-800)]"
            >
              Update
            </button>
          </div>
        </aside>
      ) : null}

      {/* 3. Install PWA Banner (Shown on desktop/tablet when installable and not yet installed) */}
      {isInstallable && !isStandalone && !dismissedInstall && !isOffline ? (
        <div className="fixed bottom-4 left-4 z-40 hidden max-w-xs sm:block">
          <div className="flex items-center justify-between gap-2.5 rounded-2xl border border-[var(--ink-900)]/10 bg-white/95 p-3 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-rust)]/10 text-[var(--accent-rust)]">
                <DownloadIcon className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-[var(--ink-900)]">Install Offline App</p>
                <p className="text-[10px] text-[var(--ink-700)]">One-click standalone access</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleInstallClick}
                className="rounded-full bg-[var(--ink-900)] px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Install
              </button>
              <button
                type="button"
                onClick={() => setDismissedInstall(true)}
                className="rounded-full p-1 text-[var(--ink-700)] hover:bg-[var(--page-cream)] hover:text-[var(--ink-900)]"
                aria-label="Dismiss install banner"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
