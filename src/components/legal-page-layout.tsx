import type { ReactNode } from "react"
import Link from "next/link"
import { LEGAL_EFFECTIVE_DATE, SITE_CONTACT_EMAIL, SITE_NAME } from "@/lib/site"
import {
  AlertTriangleIcon,
  CookieIcon,
  MailIcon,
  ScalesIcon,
  ShieldLockIcon,
  UserCheckIcon,
} from "@/components/icons"

export interface TableOfContentsItem {
  id: string
  title: string
}

export interface LegalStat {
  label: string
  value: string
  description: string
  icon?: ReactNode
}

interface LegalPageLayoutProps {
  title: string
  subtitle: string
  currentPath: "/about" | "/privacy" | "/terms" | "/cookies" | "/disclaimer" | "/contact"
  effectiveDate?: string
  lastReviewedDate?: string
  stats?: LegalStat[]
  tocItems?: TableOfContentsItem[]
  children: ReactNode
}

const LEGAL_NAV_ITEMS = [
  { href: "/about", label: "About Us", description: "Our mission, architecture & team", icon: UserCheckIcon },
  { href: "/privacy", label: "Privacy Policy", description: "Zero-server data processing & local execution", icon: ShieldLockIcon },
  { href: "/terms", label: "Terms of Use", description: "Acceptable use, ownership & service limits", icon: ScalesIcon },
  { href: "/cookies", label: "Cookie & Storage Policy", description: "Local storage keys & cookieless analytics", icon: CookieIcon },
  { href: "/disclaimer", label: "Disclaimer", description: "Medical, financial, cryptographic & code disclosures", icon: AlertTriangleIcon },
  { href: "/contact", label: "Contact & Support", description: "Bug reports, legal notices & inquiries", icon: MailIcon },
] as const

export function LegalPageLayout({
  title,
  subtitle,
  currentPath,
  effectiveDate = LEGAL_EFFECTIVE_DATE,
  lastReviewedDate = "October 2026",
  stats,
  tocItems,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      {/* Top Header & Breadcrumb Hero */}
      <section className="border-b border-[var(--ink-900)]/10 bg-white/40">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-[var(--ink-700)]">
            <Link href="/" className="transition hover:text-[var(--accent-rust)]">
              Home
            </Link>
            <span className="text-[var(--ink-700)]/40">/</span>
            <span className="text-[var(--ink-700)]/70">Legal & Transparency</span>
            <span className="text-[var(--ink-700)]/40">/</span>
            <span aria-current="page" className="font-semibold text-[var(--accent-rust)]">
              {title}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[var(--accent-rust)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-rust)]">
              Official Transparency Notice
            </span>
            <span className="rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-1 text-xs font-medium text-[var(--ink-700)]">
              Effective: {effectiveDate}
            </span>
            <span className="rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-1 text-xs font-medium text-[var(--ink-700)]">
              Last Reviewed: {lastReviewedDate}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--ink-900)] sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--ink-700)] sm:text-lg">
            {subtitle}
          </p>

          {/* Quick Highlight Stats / Guarantees Grid */}
          {stats && stats.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-[var(--ink-900)]/8 bg-white p-4 shadow-xs transition hover:border-[var(--accent-rust)]/30 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-rust)]">
                      {stat.label}
                    </p>
                    {stat.icon ? (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] transition group-hover:scale-110 group-hover:bg-[var(--accent-rust)] group-hover:text-white">
                        {stat.icon}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-lg font-bold text-[var(--ink-900)] sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]/80">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {tocItems && tocItems.length > 0 ? (
                <div className="rounded-2xl border border-[var(--ink-900)]/10 bg-white p-5 shadow-xs">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-rust)]">
                    On This Page
                  </p>
                  <ul className="mt-3 space-y-2 text-xs">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="group flex items-start gap-2 text-[var(--ink-700)] transition hover:text-[var(--accent-rust)]"
                        >
                          <span className="mt-0.5 text-[10px] text-[var(--ink-700)]/40 transition group-hover:text-[var(--accent-rust)]">
                            #
                          </span>
                          <span className="leading-snug">{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Related Legal Links */}
              <div className="rounded-2xl border border-[var(--ink-900)]/10 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-700)]/80">
                  Legal Documents
                </p>
                <nav className="mt-3 space-y-1 text-xs font-medium">
                  {LEGAL_NAV_ITEMS.map((item) => {
                    const isActive = item.href === currentPath
                    const IconComponent = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition ${
                          isActive
                            ? "bg-[var(--accent-rust)]/10 font-semibold text-[var(--accent-rust)]"
                            : "text-[var(--ink-700)] hover:bg-[var(--page-cream)] hover:text-[var(--ink-900)]"
                        }`}
                      >
                        <span className={`shrink-0 ${isActive ? "text-[var(--accent-rust)]" : "text-[var(--ink-700)]/60"}`}>
                          <IconComponent className="h-3.5 w-3.5" />
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Document Content Body */}
          <article className="min-w-0 space-y-8 rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.06)] sm:p-10">
            {children}

            {/* Document Footer & Inquiries */}
            <div className="mt-12 border-t border-[var(--ink-900)]/10 pt-8">
              <div className="rounded-2xl border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 p-5 sm:p-6">
                <h4 className="text-base font-semibold text-[var(--ink-900)]">
                  Questions or Clarifications?
                </h4>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                  If you have any questions regarding this policy or our privacy-first in-browser architecture,
                  please reach out to us at{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
                  >
                    our Contact page
                  </Link>{" "}
                  or email{" "}
                  <a
                    href={`mailto:${SITE_CONTACT_EMAIL}`}
                    className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
                  >
                    {SITE_CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>

              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[var(--ink-900)]/10 pt-6 text-xs text-[var(--ink-700)] sm:flex-row sm:items-center">
                <p>
                  &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
                </p>
                <div className="flex flex-wrap gap-4 font-medium">
                  {LEGAL_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={
                        item.href === currentPath
                          ? "font-semibold text-[var(--accent-rust)]"
                          : "hover:text-[var(--ink-900)]"
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
