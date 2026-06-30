"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SiteBrand } from "@/components/site-brand"

export function SiteHeader() {
  const compact = usePathname() !== "/"

  if (compact) {
    return (
      <header className="border-b border-[var(--ink-900)]/10 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">
            <SiteBrand compact />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-sm font-medium text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
          >
            Home
          </Link>
        </nav>
      </header>
    )
  }

  return (
    <header className="border-b border-[var(--ink-900)]/10 bg-[var(--page-cream)]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <SiteBrand />
        </Link>
      </nav>
    </header>
  )
}
