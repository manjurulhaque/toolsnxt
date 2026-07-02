import type { Metadata } from "next"
import { LEGAL_EFFECTIVE_DATE, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE_NAME}`,
  description: `Cookie policy for ${SITE_NAME}.`,
}

export default function CookiePolicyPage() {
  const year = new Date().getFullYear()

  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Cookie Policy</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
          This policy explains how {SITE_NAME} may use cookies, local storage, and similar browser
          technologies.
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]/75">
          Effective date: {LEGAL_EFFECTIVE_DATE}
        </p>

        <div className="mt-8 space-y-7 rounded-[1.5rem] border border-[var(--ink-900)]/10 bg-white p-6 text-sm leading-7 text-[var(--ink-700)] shadow-[0_18px_50px_rgba(33,37,41,0.08)] sm:p-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">What Cookies Are</h2>
            <p className="mt-3">
              Cookies are small files stored by your browser. Similar technologies, such as local
              storage, can remember preferences or support basic site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">How We Use Them</h2>
            <p className="mt-3">
              We may use cookies or local storage to keep the site working, remember tool preferences,
              understand general usage, measure performance, and troubleshoot technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Analytics</h2>
            <p className="mt-3">
              Analytics services may collect limited technical information such as pages visited,
              device type, browser type, and approximate usage activity. This helps us improve the
              tools and keep the site reliable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Your Choices</h2>
            <p className="mt-3">
              You can block, delete, or limit cookies through your browser settings. Some site features
              may not work as expected if browser storage is disabled.
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
