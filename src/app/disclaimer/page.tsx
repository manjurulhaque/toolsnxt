import type { Metadata } from "next"
import { LEGAL_EFFECTIVE_DATE, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Disclaimer | ${SITE_NAME}`,
  description: `Disclaimer for ${SITE_NAME}.`,
}

export default function DisclaimerPage() {
  const year = new Date().getFullYear()

  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Disclaimer</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
          This disclaimer explains the limits of the calculators, converters, generators, and other
          browser tools provided by {SITE_NAME}.
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]/75">
          Effective date: {LEGAL_EFFECTIVE_DATE}
        </p>

        <div className="mt-8 space-y-7 rounded-[1.5rem] border border-[var(--ink-900)]/10 bg-white p-6 text-sm leading-7 text-[var(--ink-700)] shadow-[0_18px_50px_rgba(33,37,41,0.08)] sm:p-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Informational Use Only</h2>
            <p className="mt-3">
              The tools and results on this site are provided for general informational and convenience
              purposes only. They are not professional, financial, legal, medical, tax, engineering, or
              other specialized advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Verify Important Results</h2>
            <p className="mt-3">
              We aim for useful and accurate tools, but results may contain errors, rounding differences,
              formatting issues, or limitations based on the information you provide. You should verify
              important outputs before relying on them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Files and Generated Content</h2>
            <p className="mt-3">
              You are responsible for reviewing any files, text, code, images, calculations, or generated
              content before using, sharing, publishing, or downloading them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">External Decisions</h2>
            <p className="mt-3">
              Do not make significant decisions based only on this site. Consult an appropriate qualified
              professional when a decision has legal, financial, health, safety, or business consequences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Copyright</h2>
            <p className="mt-3">
              Copyright (c) {year} {SITE_NAME}. All rights reserved. Site content, design, and original
              materials remain the property of {SITE_NAME} unless otherwise stated.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
