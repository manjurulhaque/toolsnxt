"use client"

import { useSyncExternalStore } from "react"

export type TextSize = "normal" | "large" | "xlarge"

const FAVORITES_KEY = "webtools_favorites"
const RECENTS_KEY = "webtools_recents"
const TEXT_SIZE_KEY = "webtools_text_size"
const EVENT_NAME = "webtools_pref_change"

function isClient() {
  return typeof window !== "undefined"
}

function safeGetItem(key: string): string | null {
  if (!isClient()) return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key: string, value: string): void {
  if (!isClient()) return
  try {
    window.localStorage.setItem(key, value)
    window.dispatchEvent(new Event(EVENT_NAME))
  } catch {
    // Ignore storage quota or disabled storage
  }
}

export function getStoredFavorites(): string[] {
  const raw = safeGetItem(FAVORITES_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getStoredRecents(): string[] {
  const raw = safeGetItem(RECENTS_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getStoredTextSize(): TextSize {
  const raw = safeGetItem(TEXT_SIZE_KEY)
  if (raw === "large" || raw === "xlarge") return raw
  return "normal"
}

export function setTextSize(size: TextSize): void {
  safeSetItem(TEXT_SIZE_KEY, size)
  if (isClient()) {
    document.documentElement.setAttribute("data-text-size", size)
  }
}

export function toggleFavorite(href: string): boolean {
  const current = getStoredFavorites()
  const exists = current.includes(href)
  const next = exists ? current.filter((item) => item !== href) : [...current, href]
  safeSetItem(FAVORITES_KEY, JSON.stringify(next))
  return !exists
}

export function recordRecentTool(href: string): void {
  if (!href || href === "/") return
  const current = getStoredRecents()
  const filtered = current.filter((item) => item !== href)
  const next = [href, ...filtered].slice(0, 8)
  safeSetItem(RECENTS_KEY, JSON.stringify(next))
}

export function clearRecentTools(): void {
  safeSetItem(RECENTS_KEY, JSON.stringify([]))
}

let listeners: Array<() => void> = []

function subscribe(callback: () => void) {
  listeners.push(callback)
  if (listeners.length === 1 && isClient()) {
    window.addEventListener(EVENT_NAME, emitChange)
    window.addEventListener("storage", emitChange)
  }
  return () => {
    listeners = listeners.filter((l) => l !== callback)
    if (listeners.length === 0 && isClient()) {
      window.removeEventListener(EVENT_NAME, emitChange)
      window.removeEventListener("storage", emitChange)
    }
  }
}

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

// Memory snapshot cache to prevent infinite render loops with useSyncExternalStore
let cachedSnapshot = {
  favorites: [] as string[],
  recents: [] as string[],
  textSize: "normal" as TextSize,
  rawFavorites: "",
  rawRecents: "",
  rawTextSize: "",
}

function getSnapshot() {
  const rawFav = safeGetItem(FAVORITES_KEY) || "[]"
  const rawRec = safeGetItem(RECENTS_KEY) || "[]"
  const rawTextSize = safeGetItem(TEXT_SIZE_KEY) || "normal"

  if (
    rawFav !== cachedSnapshot.rawFavorites ||
    rawRec !== cachedSnapshot.rawRecents ||
    rawTextSize !== cachedSnapshot.rawTextSize
  ) {
    try {
      const fav = JSON.parse(rawFav)
      const rec = JSON.parse(rawRec)
      const textSize: TextSize =
        rawTextSize === "large" || rawTextSize === "xlarge" ? rawTextSize : "normal"
      cachedSnapshot = {
        favorites: Array.isArray(fav) ? fav : [],
        recents: Array.isArray(rec) ? rec : [],
        textSize,
        rawFavorites: rawFav,
        rawRecents: rawRec,
        rawTextSize,
      }
    } catch {
      // Keep existing snapshot on parse error
    }
  }

  return cachedSnapshot
}

const SERVER_SNAPSHOT = {
  favorites: [] as string[],
  recents: [] as string[],
  textSize: "normal" as TextSize,
  rawFavorites: "",
  rawRecents: "",
  rawTextSize: "",
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT
}

export function useToolPreferences() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return {
    favorites: snapshot.favorites,
    recents: snapshot.recents,
    textSize: snapshot.textSize,
    isFavorite: (href: string) => snapshot.favorites.includes(href),
    toggleFavorite,
    recordRecent: recordRecentTool,
    clearRecents: clearRecentTools,
    setTextSize,
  }
}

