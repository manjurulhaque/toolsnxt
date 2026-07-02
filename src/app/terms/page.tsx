import type { Metadata } from "next"
import { LEGAL_EFFECTIVE_DATE, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Terms of Use | ${SITE_NAME}`,
  description: `Terms of use for ${SITE_NAME}.`,
}

export default function TermsPage() {
  const year = new Date().getFullYear()

  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Terms of Use</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
          These terms apply when you access or use {SITE_NAME} and its browser tools.
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]/75">
          Effective date: {LEGAL_EFFECTIVE_DATE}
        </p>

        <div className="mt-8 space-y-7 rounded-[1.5rem] border border-[var(--ink-900)]/10 bg-white p-6 text-sm leading-7 text-[var(--ink-700)] shadow-[0_18px_50px_rgba(33,37,41,0.08)] sm:p-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Use of the Site</h2>
            <p className="mt-3">
              You may use the tools for lawful personal or business purposes. You are responsible for
              the content you enter, upload, convert, generate, or download while using the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">No Warranty</h2>
            <p className="mt-3">
              The tools are provided as-is for convenience. We try to keep them accurate and available,
              but we do not guarantee that results will be error-free, uninterrupted, or suitable for a
              specific purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent allowed by law, {SITE_NAME} is not liable for losses or damages that
              result from using, relying on, or being unable to use the site or its tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Copyright</h2>
            <p className="mt-3">
              Copyright (c) {year} {SITE_NAME}. All rights reserved. Site content, design, and original
              materials remain the property of {SITE_NAME} unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Changes</h2>
            <p className="mt-3">
              We may revise these terms from time to time. Continued use of the site means you accept
              the current version posted here.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
