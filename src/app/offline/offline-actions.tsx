"use client"

import Link from "next/link"
import { ArrowRightIcon, RotateCcwIcon } from "@/components/icons"

export function OfflineActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--ink-900)]/8 pt-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--ink-900)] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[var(--ink-800)]"
      >
        <span>Go to Home Directory</span>
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>

      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") window.location.reload()
        }}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-2.5 text-xs font-semibold text-[var(--ink-800)] shadow-xs transition hover:bg-[var(--page-cream)]/50"
      >
        <RotateCcwIcon className="h-3.5 w-3.5 text-[var(--ink-700)]" />
        <span>Retry Connection</span>
      </button>
    </div>
  )
}
