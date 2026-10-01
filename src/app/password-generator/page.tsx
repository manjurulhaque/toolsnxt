import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { PasswordTool } from "./password-tool"

const pagePath = "/password-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Password Generator | Strong Random Passwords and Passphrases"
const pageDescription =
  "Create strong random passwords and memorable passphrases with length, uppercase, lowercase, numbers, symbols, ambiguous-character avoidance, strength feedback, and copy support."

const faqs = [
  {
    question: "What is a password generator?",
    answer:
      "A password generator creates random passwords or passphrases so you do not have to invent predictable credentials yourself.",
  },
  {
    question: "Are generated passwords secure?",
    answer:
      "Generated passwords can be strong when they are long, random, unique, and stored safely. Account security also depends on MFA, phishing resistance, and secure storage.",
  },
  {
    question: "How long should a password be?",
    answer:
      "NIST guidance requires at least 15 characters for single-factor passwords and at least 8 characters when used with MFA. Longer is usually better.",
  },
  {
    question: "What makes a password strong?",
    answer:
      "Length, unpredictability, uniqueness, and resistance to common guessing patterns make a password stronger.",
  },
  {
    question: "Should I use symbols?",
    answer:
      "Symbols can expand the character set when a site allows them, but length and randomness matter more than simply adding a predictable symbol.",
  },
  {
    question: "Are longer passwords better?",
    answer:
      "Usually, yes. More length increases the number of possible combinations, especially when the password is randomly generated.",
  },
  {
    question: "Can hackers guess random passwords?",
    answer:
      "Attackers can try guesses, but long random passwords are much harder to guess than short or human-created passwords.",
  },
  {
    question: "Should I change passwords regularly?",
    answer:
      "Current NIST guidance does not recommend periodic password changes without evidence of compromise. Change passwords after suspected exposure or account risk.",
  },
  {
    question: "What is password entropy?",
    answer:
      "Entropy is a way to describe how unpredictable a password is. More possible random combinations generally means higher entropy.",
  },
  {
    question: "Should I use a password manager?",
    answer:
      "Yes, for most people. A password manager helps store unique random passwords securely and reduces reuse.",
  },
  {
    question: "What is MFA?",
    answer:
      "Multi-factor authentication requires more than one factor, such as a password plus a security key, authenticator app, or other approved second factor.",
  },
  {
    question: "Can I use generated passwords for banking?",
    answer:
      "Yes, if the bank accepts the characters and length. Use a unique password, store it in a trusted password manager, and enable MFA where available.",
  },
  {
    question: "Is this password generator free?",
    answer:
      "Yes. This page is a free browser tool.",
  },
  {
    question: "Are generated passwords stored?",
    answer:
      "The page keeps recent generated values only in the current browser session state. It does not intentionally upload passwords to a server.",
  },
  {
    question: "Does this tool work offline?",
    answer:
      "After the page has loaded, generation uses browser APIs locally. Copy support depends on browser clipboard permissions.",
  },
  {
    question: "What is the strongest password?",
    answer:
      "There is no single strongest password for every account. Use a long, unique, randomly generated password or passphrase that the target service accepts.",
  },
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: ["Password Generator", "Random Password Generator", "Strong Password Generator"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Password Generator",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Password Generator",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Password Generator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate a strong password",
    description: "Create a random password or passphrase and copy it for secure storage.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose a mode",
        text: "Select Password or Passphrase.",
      },
      {
        "@type": "HowToStep",
        name: "Set options",
        text: "Choose length and character types for passwords, or word count and separator for passphrases.",
      },
      {
        "@type": "HowToStep",
        name: "Generate",
        text: "Press Generate or Regenerate to create a new value.",
      },
      {
        "@type": "HowToStep",
        name: "Review strength",
        text: "Check the strength label and meter.",
      },
      {
        "@type": "HowToStep",
        name: "Copy and store",
        text: "Copy the generated value and save it securely in a password manager.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
]

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
}

export default function PasswordGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
          <PasswordTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Password Generator?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A password generator creates random credentials that are harder to predict than
                human-made passwords. Strong, unique passwords help protect personal accounts,
                business systems, developer tools, cloud dashboards, banking logins, and enterprise
                services from guessing and reuse attacks.
              </p>
              <p>
                This secure password generator runs in the browser and supports both random
                passwords and passphrases. Length and randomness matter because attackers often try
                automated guessing, leaked passwords, dictionary words, and personal information.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Generator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Password mode", "Generates a random character string using the selected character sets."],
                ["Passphrase mode", "Generates a sequence of random words, joins them with a separator, and adds a two-digit suffix."],
                ["Length", "Password length is adjustable from 8 to 128 characters."],
                ["Character sets", "Lowercase, uppercase, numbers, and symbols can be included or excluded."],
                ["Avoid ambiguous", "When enabled, the generator removes I, l, 1, O, and 0 from selected character sets."],
                ["Copy and history", "Copy the current value or recent generated values from the session history."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Options" title="Password Options Explained" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Lowercase", "Adds letters a-z to the password pool."],
                ["Uppercase", "Adds letters A-Z to the password pool."],
                ["Numbers", "Adds digits 0-9 unless ambiguous characters are removed."],
                ["Symbols", "Adds punctuation symbols such as !, @, #, brackets, and operators."],
                ["Length", "Longer random passwords generally increase guessing resistance."],
                ["Passphrase words", "Passphrase mode uses 3 to 10 words from the page's built-in word list."],
                ["Separator", "Passphrase mode joins words with the separator you enter, defaulting to a hyphen when blank."],
                ["Strength label", "Weak, Moderate, Strong, and Very strong are estimated from length, unique characters, and variety."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Security" title="Password Security Best Practices" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Use long passwords", "Current NIST guidance sets 15 characters as the minimum for single-factor passwords and 8 when used with MFA."],
                ["Use unique passwords", "Never reuse the same password across accounts."],
                ["Prefer randomness", "Randomly generated passwords avoid common human patterns and personal details."],
                ["Use a password manager", "Store generated passwords in a trusted password manager instead of insecure notes or screenshots."],
                ["Enable MFA", "Use multi-factor authentication for important accounts whenever available."],
                ["Change when needed", "Update passwords after suspected compromise rather than on arbitrary schedules."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Example Password Configurations" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Online banking</strong>
                Length 16 with uppercase, lowercase, numbers, and symbols. Save the generated value
                in a password manager and enable MFA.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Email accounts</strong>
                Length 20 with uppercase, lowercase, and numbers. Add symbols if the email provider
                accepts them.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Administrator accounts</strong>
                Length 24 or more with all character types, or a long passphrase if the system
                accepts it. Do not reuse examples as real passwords.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Password Generator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Select Password or Passphrase mode.</li>
              <li>For passwords, choose length and character types.</li>
              <li>For passphrases, choose the word count and separator.</li>
              <li>Press Generate or Regenerate.</li>
              <li>Review the generated value and strength label.</li>
              <li>Copy the value and store it securely in a password manager.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Strength" title="Understanding Password Strength" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Weak", "The generated value has low estimated score; increase length or variety."],
                ["Moderate", "Usable in some contexts, but longer is better for important accounts."],
                ["Strong", "Good for many everyday accounts when stored securely and not reused."],
                ["Very strong", "High estimated length and character variety."],
                ["Strength meter", "The bar reflects the page's local score calculation, not a full security audit."],
                ["Character types", "The estimate considers lowercase, uppercase, numbers, and non-alphanumeric characters."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Uses" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Online accounts", "Create unique credentials for shopping, media, and productivity accounts."],
                ["Banking and email", "Use long unique passwords with MFA for high-value accounts."],
                ["Enterprise systems", "Generate credentials for business apps, admin portals, and shared workflows only when policy allows."],
                ["Wi-Fi passwords", "Create long random passwords for network access."],
                ["Developer accounts", "Protect code hosting, package registries, dashboards, and cloud consoles."],
                ["API-like secrets", "Use dedicated secret-management tools when a system requires tokens, keys, rotation, or audit logs."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Safety" title="Benefits, Limits, Tips and Common Mistakes" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Generates unpredictable passwords quickly.</li>
                  <li>Reduces password reuse when combined with a password manager.</li>
                  <li>Supports modern guidance that favors length and uniqueness.</li>
                  <li>Helps defend against brute-force and dictionary guessing.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Password security also depends on the account provider and storage habits.</li>
                  <li>No password alone prevents phishing or malware.</li>
                  <li>Weak storage can expose even strong passwords.</li>
                  <li>MFA and secure recovery methods remain important.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Better Security</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Use a different password for every account.</li>
                  <li>Choose longer passwords whenever a service allows them.</li>
                  <li>Enable MFA and keep account recovery methods secure.</li>
                  <li>Beware of phishing and never share passwords.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Reusing passwords across accounts.</li>
                  <li>Using short passwords or personal information.</li>
                  <li>Relying on predictable substitutions like @ for a.</li>
                  <li>Saving passwords in plain text or ignoring MFA.</li>
                </ul>
              </div>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="FAQ" title="Frequently Asked Questions" />
            <div className="mt-6 grid gap-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--ink-900)]">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="More Tools" title="Related Tools" />
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/hash-generator"
              >
                Hash Generator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/uuid-generator"
              >
                UUID Generator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/base64-encoder-decoder"
              >
                Base64 Encoder / Decoder
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Password Security Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Password", "A secret string used to authenticate access to an account."],
                ["Password Manager", "Software that stores, fills, and often generates passwords."],
                ["Entropy", "A measure of unpredictability in a generated secret."],
                ["Brute Force Attack", "Trying many possible passwords until one works."],
                ["Dictionary Attack", "Trying common words, phrases, and leaked password patterns."],
                ["MFA", "Multi-factor authentication, which combines more than one authentication factor."],
                ["Authentication", "The process of proving control of an account or identity."],
                ["Encryption", "Protecting data by transforming it so it cannot be read without the right key."],
                ["Randomness", "Unpredictability used to make generated passwords harder to guess."],
                ["Character Set", "The pool of characters a password can use."],
                ["Passphrase", "A password made from multiple words, often easier to type or remember."],
                ["Symbol", "A non-letter, non-number character such as ! or #."],
              ].map(([term, definition]) => (
                <div key={term}>
                  <dt className="font-semibold text-[var(--ink-900)]">{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Sources" title="References" />
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--ink-700)]">
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://pages.nist.gov/800-63-4/sp800-63b.html"
                >
                  NIST SP 800-63B. Digital Identity Guidelines: Authentication and Authenticator Management.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
                >
                  OWASP Authentication Cheat Sheet.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.ncsc.gov.uk/collection/passwords/updating-your-approach"
                >
                  UK National Cyber Security Centre. Password policy: updating your approach.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="security">
          <p>
            Passwords are generated based on this page&apos;s implemented random generation
            method and are intended to improve account security. You remain responsible for
            securely storing generated passwords, using unique credentials, enabling MFA for
            critical accounts, and following the security requirements of each service. No
            password generator can guarantee protection against all cybersecurity threats.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
