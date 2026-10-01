import Link from "next/link"
import { SiteBrand } from "@/components/site-brand"
import { ShieldCheckIcon } from "@/components/icons"
import { SITE_NAME } from "@/lib/site"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--ink-900)]/10 bg-white/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-900)]">
              <SiteBrand compact />
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--ink-700)]">
              A compact set of practical calculators, converters, and generators.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-800">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-600" />
              <span>100% In-Browser Execution &bull; Zero Server Data Storage</span>
            </div>
          </div>

          <nav aria-label="Transparency & Legal" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--ink-700)]">
            <Link href="/about" className="transition hover:text-[var(--ink-900)]">
              About
            </Link>
            <Link href="/privacy" className="transition hover:text-[var(--ink-900)]">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-[var(--ink-900)]">
              Terms
            </Link>
            <Link href="/disclaimer" className="transition hover:text-[var(--ink-900)]">
              Disclaimer
            </Link>
            <Link href="/cookies" className="transition hover:text-[var(--ink-900)]">
              Cookies
            </Link>
            <Link href="/contact" className="transition hover:text-[var(--ink-900)]">
              Contact
            </Link>
          </nav>
        </div>

        <p className="text-xs leading-6 text-[var(--ink-700)]/75">
          Copyright &copy; {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
