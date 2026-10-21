"use client"

import { sendGAEvent } from "@next/third-parties/google"
import { GA_MEASUREMENT_ID } from "./site"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export { sendGAEvent }

/**
 * Indicates whether a Google Analytics 4 Measurement ID has been configured.
 */
export const isGAEnabled = Boolean(GA_MEASUREMENT_ID)

/**
 * Safely send a custom GA4 event using the official sendGAEvent helper or dataLayer fallback.
 * Automatically no-ops when running in SSR or when GA is not configured.
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || !isGAEnabled) {
    return
  }

  try {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      sendGAEvent("event", eventName, eventParams ?? {})
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[GA4] Failed to record event:", eventName, error)
    }
  }
}

/**
 * Utility function to track tool interactions (e.g. usage, copy results, downloads, resets).
 */
export function trackToolInteraction(
  toolSlug: string,
  action: "run" | "copy" | "download" | "reset" | "share" | string,
  extraParams?: Record<string, unknown>
): void {
  trackEvent("tool_interaction", {
    tool_slug: toolSlug,
    action,
    ...extraParams,
  })
}
