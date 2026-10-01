import type { ReactNode } from "react"
import Link from "next/link"

export interface EducationalDisclaimerCardProps {
  type?: "educational" | "medical" | "financial" | "security" | "technical"
  eyebrow?: string
  title?: string
  badge?: string
  children: ReactNode
  className?: string
}

export function EducationalDisclaimerCard({
  type = "educational",
  eyebrow,
  title,
  badge,
  children,
  className = "",
}: EducationalDisclaimerCardProps) {
  const config = {
    educational: {
      defaultEyebrow: "Transparency & Verification",
      defaultTitle: "Educational Disclaimer",
      defaultBadge: "100% In-Browser Execution",
      icon: "🛡️",
    },
    medical: {
      defaultEyebrow: "Health & Medical Notice",
      defaultTitle: "Medical & Educational Disclaimer",
      defaultBadge: "Non-Clinical Estimate",
      icon: "🩺",
    },
    financial: {
      defaultEyebrow: "Financial Calculation Notice",
      defaultTitle: "Financial & Educational Disclaimer",
      defaultBadge: "Mathematical Estimate",
      icon: "📊",
    },
    security: {
      defaultEyebrow: "Security & Cryptography Notice",
      defaultTitle: "Security & Educational Disclaimer",
      defaultBadge: "Client-Side Cryptography",
      icon: "🔐",
    },
    technical: {
      defaultEyebrow: "Technical Verification Notice",
      defaultTitle: "Technical & Educational Disclaimer",
      defaultBadge: "Specification Standard",
      icon: "⚙️",
    },
  }[type]

  const displayEyebrow = eyebrow ?? config.defaultEyebrow
  const displayTitle = title ?? config.defaultTitle
  const displayBadge = badge ?? config.defaultBadge

  return (
    <div
      className={`rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.06)] sm:p-8 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ink-900)]/8 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-lg text-[var(--accent-rust)]">
            {config.icon}
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-rust)]">
              {displayEyebrow}
            </p>
            <h3 className="text-lg font-bold text-[var(--ink-900)] sm:text-xl">
              {displayTitle}
            </h3>
          </div>
        </div>

        <span className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-3 py-1 text-xs font-medium text-[var(--ink-700)]">
          {displayBadge}
        </span>
      </div>

      <div className="mt-5 text-sm leading-7 text-[var(--ink-700)]">
        {children}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--ink-900)]/8 pt-4 text-xs text-[var(--ink-700)]/80">
        <p>
          Calculations and transformations execute locally on your machine. Always verify critical results.
        </p>
        <Link
          href="/disclaimer"
          className="font-semibold text-[var(--accent-rust)] underline transition hover:text-[var(--ink-900)]"
        >
          View full legal disclaimer &rarr;
        </Link>
      </div>
    </div>
  )
}
