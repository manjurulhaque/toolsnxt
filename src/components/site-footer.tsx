import Link from "next/link"
import { SiteBrand } from "@/components/site-brand"

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--ink-900)]/10 bg-white/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 sm:px-8 lg:px-12">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-900)]">
          <SiteBrand compact />
        </Link>
        <p className="max-w-md text-sm leading-6 text-[var(--ink-700)]">
          A compact set of practical calculators, converters, and generators.
        </p>
      </div>
    </footer>
  )
}
