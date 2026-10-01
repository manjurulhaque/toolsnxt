import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { BarcodeTool } from "./barcode-tool"

const pagePath = "/barcode-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Barcode Generator | Free Online Code 128 Barcode Creator"
const pageDescription =
  "Create free Code 128 barcodes online as SVG images for product IDs, asset tags, tickets, URLs, inventory labels, and shipping references."

const faqs = [
  {
    question: "What is a barcode generator?",
    answer:
      "A barcode generator turns entered data into a machine-readable barcode image that scanners can decode.",
  },
  {
    question: "How does this barcode generator work?",
    answer:
      "Enter printable ASCII text, adjust the display options, then the page generates a Code 128 SVG preview locally in your browser.",
  },
  {
    question: "Which barcode format is supported?",
    answer:
      "This page supports Code 128-B. It does not generate EAN-13, EAN-8, UPC-A, UPC-E, ITF, Codabar, MSI, Pharmacode, or GS1-128.",
  },
  {
    question: "What is Code 128?",
    answer:
      "Code 128 is a high-density linear barcode symbology used for alphanumeric identifiers in logistics, inventory, labels, and general tracking.",
  },
  {
    question: "What is Code 128-B?",
    answer:
      "Code 128-B is a character set within Code 128 that supports printable ASCII characters in this implementation.",
  },
  {
    question: "What characters can I enter?",
    answer:
      "This implementation accepts printable ASCII characters only. Control characters and unsupported Unicode characters are rejected.",
  },
  {
    question: "Does the generator calculate a check digit?",
    answer:
      "Yes. The Code 128 checksum is calculated internally as part of the generated symbol.",
  },
  {
    question: "Can I download the barcode?",
    answer:
      "Yes. Use Download SVG to save the generated barcode as a scalable SVG file.",
  },
  {
    question: "Can I copy the barcode?",
    answer:
      "Yes. Use Copy SVG to copy the SVG markup to the clipboard.",
  },
  {
    question: "Can I print generated barcodes?",
    answer:
      "You can print the downloaded SVG, but you should preserve the quiet zone, use strong contrast, avoid distortion, and test the printed result.",
  },
  {
    question: "Why won't my barcode scan?",
    answer:
      "Common causes include unsupported characters, low contrast, insufficient quiet zone, printing too small, distortion, or scanner incompatibility.",
  },
  {
    question: "Can I use these barcodes commercially?",
    answer:
      "You may use the generated image for general business workflows, but product identifiers and regulated uses may require GS1 registration or industry-specific rules.",
  },
  {
    question: "Is this a GS1 barcode generator?",
    answer:
      "No. It creates a Code 128-B SVG from your text. It does not issue GS1 company prefixes, GTINs, or GS1-128 application identifier data structures.",
  },
  {
    question: "Are the generated barcodes standards compliant?",
    answer:
      "The output follows this page's implemented Code 128-B encoding behavior, but final scan quality depends on sizing, contrast, printing, and scanner support.",
  },
  {
    question: "Is the barcode generator free?",
    answer: "Yes. This is a free online barcode creator.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. The controls are browser-based and designed to work on modern desktop and mobile screens.",
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
    about: ["Barcode Generator", "Code 128", "Barcode Creator", "SVG Barcode"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Barcode Generator",
    applicationCategory: "UtilitiesApplication",
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
    name: "Barcode Generator",
    applicationCategory: "UtilitiesApplication",
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
        name: "Barcode Generator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate a Code 128 barcode",
    description: "Create a printable Code 128 SVG barcode from supported text.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter barcode data",
        text: "Type printable ASCII text into the barcode value field.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust output options",
        text: "Set colors, bar width, bar height, quiet zone, and the readable label option.",
      },
      {
        "@type": "HowToStep",
        name: "Review the preview",
        text: "Check the generated Code 128 barcode preview.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or download",
        text: "Copy the SVG markup or download the barcode SVG.",
      },
      {
        "@type": "HowToStep",
        name: "Test the barcode",
        text: "Scan-test the barcode before using it in production.",
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

export default function BarcodeGeneratorPage() {
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
          <BarcodeTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Barcode Generator?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A barcode generator creates a scannable image from text or numbers. Barcodes help
                organizations identify products, shipments, assets, tickets, documents, and
                inventory without manual typing. They are common in retail, logistics,
                warehousing, manufacturing, healthcare, libraries, shipping, and asset tracking.
              </p>
              <p>
                This free online barcode generator creates a Code 128-B SVG locally in your
                browser. Standardized barcode symbologies matter because scanners need predictable
                bar and space patterns, quiet zones, and readable data rules.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Barcode Generator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Data entry", "Enter the printable ASCII text to encode."],
                ["Live preview", "The preview updates from the current value and output settings."],
                ["SVG rendering", "The output is generated as scalable SVG markup."],
                ["Color controls", "Choose foreground and background colors."],
                ["Sizing controls", "Set bar width, bar height, and quiet-zone padding."],
                ["Readable label", "Optionally show the encoded text under the bars."],
                ["Copy SVG", "Copy the generated SVG markup to the clipboard."],
                ["Download SVG", "Save the barcode image as barcode.svg."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Format" title="Supported Barcode Format" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                The implemented format is Code 128-B. It supports printable ASCII input in this
                page and calculates the required Code 128 checksum internally. The page does not
                include a format selector and does not generate EAN-13, EAN-8, UPC-A, UPC-E, ITF,
                Codabar, MSI, Pharmacode, or GS1-128 symbols.
              </p>
              <InfoBox>
                Code 128 is useful for product SKUs, asset tags, ticket numbers, short URLs,
                internal labels, and tracking identifiers when your scanner and workflow support
                Code 128.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Quality" title="Barcode Accuracy and Scan Reliability" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Encoding", "The barcode represents the entered printable ASCII data according to the implemented Code 128-B behavior."],
                ["Checksum", "A Code 128 checksum is added during generation."],
                ["Quiet zone", "Clear space before and after the barcode helps scanners detect the symbol."],
                ["Contrast", "Dark bars on a light, solid background usually scan more reliably."],
                ["Size", "Bar width and height should be large enough for the scanner and print method."],
                ["Testing", "Always scan-test the final printed or embedded barcode before production use."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Common Code 128 Barcode Examples" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Product SKU", "M-2026-001 for an internal product or inventory label."],
                ["Asset tag", "ASSET-LAPTOP-0482 for equipment tracking."],
                ["Ticket number", "TICKET-9F7A-2026 for event or support workflows."],
                ["Order URL", `${SITE_URL}/order/12345 for a short internal order link.`],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Barcode Generator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Enter printable ASCII text in the barcode value field.</li>
              <li>Optionally load a product, URL, asset, or ticket preset.</li>
              <li>Adjust foreground color, background color, bar width, bar height, and quiet zone.</li>
              <li>Choose whether to show the human-readable label.</li>
              <li>Review the generated Code 128 barcode preview.</li>
              <li>Copy or download the SVG, then scan-test the final barcode.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Barcode preview", "The visible SVG image generated from the current settings."],
                ["Encoded text", "The barcode value and optional readable label."],
                ["Format", "The preview badge identifies the output as Code 128."],
                ["SVG source", "The markup textarea contains the generated SVG source."],
                ["Copy option", "Copies SVG markup for use in another system."],
                ["Download option", "Downloads the SVG file for design, print, or label workflows."],
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
                ["Retail and inventory", "Create internal SKU or shelf labels."],
                ["Warehousing and logistics", "Label bins, shipments, work orders, and pick lists."],
                ["Manufacturing", "Track parts, batches, equipment, and process steps."],
                ["Healthcare and labs", "Support compatible internal sample, asset, or document labels."],
                ["Libraries and offices", "Label books, files, hardware, badges, and documents."],
                ["Events and support", "Encode ticket, order, or case identifiers."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits, Limitations, Tips and Mistakes" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Fast Code 128 barcode creation in the browser.</li>
                  <li>Scalable SVG output for digital and print workflows.</li>
                  <li>Useful for internal labels, assets, tickets, and inventory.</li>
                  <li>Adjustable color, size, quiet zone, and readable label settings.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Only Code 128-B is implemented.</li>
                  <li>Only printable ASCII input is accepted.</li>
                  <li>Scan reliability depends on final size, contrast, print quality, and scanner support.</li>
                  <li>The tool does not provide GS1 registration or product number licensing.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Use the right symbology for your workflow before generating labels.</li>
                  <li>Keep dark bars on a light background with strong contrast.</li>
                  <li>Preserve quiet zones and avoid cropping the SVG.</li>
                  <li>Do not stretch the barcode unevenly.</li>
                  <li>Scan-test the final printed label before production.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Entering unsupported characters.</li>
                  <li>Choosing Code 128 for a workflow that requires EAN/UPC or GS1-128.</li>
                  <li>Printing too small or with poor contrast.</li>
                  <li>Removing the quiet zone.</li>
                  <li>Using an unregistered product identifier where registration is required.</li>
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
            <nav aria-label="Related tools" className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              {[
                ["QR Code Generator", "/qr-code-generator"],
                ["UUID Generator", "/uuid-generator"],
                ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
                ["Case Converter", "/case-converter"],
                ["Hash Generator", "/hash-generator"],
                ["URL Encoder / Decoder", "/url-encoder-decoder"],
                ["Password Generator", "/password-generator"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Barcode Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Barcode", "A machine-readable pattern of bars and spaces."],
                ["Barcode Symbology", "The rules used to encode data in a barcode format."],
                ["Check Digit", "A calculated value used by scanners to help detect errors."],
                ["Code 128", "A high-density linear barcode symbology for alphanumeric data."],
                ["Code 39", "An older alphanumeric barcode symbology not generated by this page."],
                ["EAN", "A GS1 retail barcode family used globally for product identification."],
                ["UPC", "A GS1 retail barcode family commonly used for products in North America."],
                ["GS1", "A standards organization for identifiers, barcodes, and supply chain data."],
                ["Scanner", "A device or app that reads and decodes barcode data."],
                ["Encoding", "The process of turning data into barcode patterns."],
                ["Inventory", "Goods, materials, assets, or stock tracked by an organization."],
                ["SKU", "A stock keeping unit used internally to identify an item."],
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
                  href="https://www.iso.org/standard/43896.html"
                  rel="noreferrer"
                >
                  ISO/IEC 15417:2007. Code 128 bar code symbology specification.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.gs1.org/standards/barcodes"
                  rel="noreferrer"
                >
                  GS1. Barcode standards overview.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.gs1.org/standards/barcodes/10-steps-to-barcode-your-product/english"
                  rel="noreferrer"
                >
                  GS1. 10 steps to barcode your product.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.gs1uk.org/knowledge-hub/barcodes/what-is-a-quiet-zone"
                  rel="noreferrer"
                >
                  GS1 UK. What is a quiet zone in barcodes?
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.aimglobal.org/technical-symbology/"
                  rel="noreferrer"
                >
                  AIM Global. Technical Symbology Committee.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This Barcode Generator produces Code 128-B SVG barcodes using the implemented
            encoding rules. Results are intended for educational, informational, testing, and
            general business use. Verify compatibility with your scanners, printers, label
            software, and industry requirements. This tool does not replace official GS1
            registration, regulatory requirements, barcode verification, or commercial barcode
            licensing where applicable.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
