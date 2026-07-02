import type { Metadata } from "next"
import { LEGAL_EFFECTIVE_DATE, SITE_CONTACT_EMAIL, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: `Contact ${SITE_NAME} for questions, corrections, privacy requests, and copyright concerns.`,
}

export default function ContactPage() {
  const year = new Date().getFullYear()

  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
          Contact
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Contact {SITE_NAME}</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
          Reach out for questions, corrections, privacy requests, accessibility feedback, copyright
          concerns, or general site support.
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]/75">
          Effective date: {LEGAL_EFFECTIVE_DATE}
        </p>

        <div className="mt-8 space-y-7 rounded-[1.5rem] border border-[var(--ink-900)]/10 bg-white p-6 text-sm leading-7 text-[var(--ink-700)] shadow-[0_18px_50px_rgba(33,37,41,0.08)] sm:p-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Email</h2>
            <p className="mt-3">
              Send messages to{" "}
              <a className="font-semibold text-[var(--accent-rust)] hover:text-[var(--ink-900)]" href={`mailto:${SITE_CONTACT_EMAIL}`}>
                {SITE_CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">What to Include</h2>
            <p className="mt-3">
              Please include the page or tool URL, a short description of the issue or request, and any
              relevant details that can help us review it. Avoid sending sensitive personal information
              unless it is necessary for your request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-900)]">Copyright and Legal Requests</h2>
            <p className="mt-3">
              For copyright, privacy, or legal requests, include enough information to identify the
              affected content and explain the action you are requesting.
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
