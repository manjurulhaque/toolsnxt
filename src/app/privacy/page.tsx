import type { Metadata } from "next"
import { LEGAL_EFFECTIVE_DATE, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Privacy policy for ${SITE_NAME}.`,
}

export default function PrivacyPage() {
  const year = new Date().getFullYear()

  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
          This policy explains how {SITE_NAME} handles information when you use the tools on this site.
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]/75">
          Effective date: {LEGAL_EFFECTIVE_DATE}
        </p>

        <div className="mt-8 space-y-7 rounded-[1.5rem] border border-[var(--ink-900)]/10 bg-white p-6 text-sm leading-7 text-[var(--ink-700)] shadow-[0_18px_50px_rgba(33,37,41,0.08)] sm:p-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Information We Collect</h2>
            <p className="mt-3">
              Most tools are designed to run in your browser. Text, files, and generated results are
              processed locally unless a tool clearly says otherwise. We may receive basic technical
              information such as browser type, device information, pages visited, and approximate
              usage activity through hosting, analytics, or security services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">How We Use Information</h2>
            <p className="mt-3">
              We use limited site information to operate the website, understand which tools are useful,
              improve performance, prevent abuse, and keep the service reliable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Cookies and Analytics</h2>
            <p className="mt-3">
              The site may use cookies or privacy-conscious analytics to measure visits and troubleshoot
              issues. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Copyright</h2>
            <p className="mt-3">
              Copyright (c) {year} {SITE_NAME}. All rights reserved. Site content, design, and original
              materials may not be copied, republished, or redistributed without permission except where
              allowed by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Updates</h2>
            <p className="mt-3">
              We may update this policy from time to time. Changes will be posted on this page.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
