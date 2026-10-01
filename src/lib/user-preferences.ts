"use client"

import { useSyncExternalStore } from "react"

const FAVORITES_KEY = "webtools_favorites"
const RECENTS_KEY = "webtools_recents"
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
  rawFavorites: "",
  rawRecents: "",
}

function getSnapshot() {
  const rawFav = safeGetItem(FAVORITES_KEY) || "[]"
  const rawRec = safeGetItem(RECENTS_KEY) || "[]"

  if (rawFav !== cachedSnapshot.rawFavorites || rawRec !== cachedSnapshot.rawRecents) {
    try {
      const fav = JSON.parse(rawFav)
      const rec = JSON.parse(rawRec)
      cachedSnapshot = {
        favorites: Array.isArray(fav) ? fav : [],
        recents: Array.isArray(rec) ? rec : [],
        rawFavorites: rawFav,
        rawRecents: rawRec,
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
  rawFavorites: "",
  rawRecents: "",
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT
}

export function useToolPreferences() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return {
    favorites: snapshot.favorites,
    recents: snapshot.recents,
    isFavorite: (href: string) => snapshot.favorites.includes(href),
    toggleFavorite,
    recordRecent: recordRecentTool,
    clearRecents: clearRecentTools,
  }
}
