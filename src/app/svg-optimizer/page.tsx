import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { SvgOptimizerTool } from "./svg-optimizer-tool"

const pagePath = "/svg-optimizer"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "SVG Optimizer & Viewer | Minify & Clean SVG Files Online"
const pageDescription =
  "Optimize, clean, and preview SVG markup in your browser. Remove unnecessary metadata, comments, editor artifacts, and reduce SVG file size instantly with SVGO."

const faqs = [
  {
    question: "What is an SVG optimizer?",
    answer:
      "An SVG optimizer cleans vector graphic markup by stripping redundant code, comments, editor metadata (from Illustrator, Figma, or Inkscape), unused IDs, and rounding path coordinates to reduce file size.",
  },
  {
    question: "Which engine powers this optimizer?",
    answer:
      "This tool uses the browser build of SVGO (SVG Optimizer), the industry-standard node/browser tool for SVG minification.",
  },
  {
    question: "What does 'multipass' optimization do?",
    answer:
      "Multipass runs SVGO multiple consecutive times over the vector markup to catch optimization opportunities that only become possible after earlier cleanup passes.",
  },
  {
    question: "Are my SVG graphics uploaded to any server?",
    answer:
      "No. Optimization, cleanup, and rendering run entirely inside your browser memory using client-side JavaScript. No graphics or files are transferred.",
  },
  {
    question: "Can I copy the optimized SVG as a Data URI?",
    answer:
      "Yes. The tool generates a ready-to-use SVG Data URI suitable for CSS background-image or HTML inline embedding.",
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
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SVG Optimizer / Viewer",
    applicationCategory: "DesignApplication",
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
        name: "SVG Optimizer",
        item: pageUrl,
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

export default function SvgOptimizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
          <SvgOptimizerTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="Why Optimize SVG Graphics?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Scalable Vector Graphics (SVG) are XML-based documents. Most vector design tools (such as
                Adobe Illustrator, Figma, Sketch, or Inkscape) include substantial amounts of redundant
                metadata, editor-specific tags, empty groups, and overly verbose floating-point coordinates.
              </p>
              <p>
                Cleaning and minifying SVGs reduces page load weight, improves rendering performance, and
                ensures cleaner markup when inlining SVGs directly into web components.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Features" title="Optimization Controls" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Multipass</strong>
                Repeats optimization algorithms until no further byte reductions can be achieved.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Preserve IDs</strong>
                Keeps element IDs intact for SVGs that rely on internal gradient or clip-path references.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Remove Dimensions</strong>
                Strips hardcoded width/height attributes so the viewBox dictates fluid responsive scaling.
              </InfoBox>
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
            <PanelHeader eyebrow="Related" title="Related Design & Developer Tools" />
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/image-converter">
                Image Converter
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/color-converter">
                Color Converter
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/gradient-generator">
                Gradient Generator
              </Link>
            </div>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
