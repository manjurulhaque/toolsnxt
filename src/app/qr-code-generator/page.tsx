import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/site"

const pagePath = "/qr-code-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Free QR Code Generator | Create Custom QR Codes Online"
const pageDescription =
  "Create a free QR code online for a URL, text, email, phone number, or Wi-Fi details. Customize colors, quiet zone, and size, then copy or download an SVG."

const faqs = [
  ["What is a QR code?", "A QR code is a two-dimensional barcode that a camera or scanner can decode into stored information, such as a web address or short text."],
  ["How does this QR code generator work?", "Enter content or choose a preset. The page encodes the value locally in your browser, shows an SVG preview, and lets you copy or download that SVG."],
  ["Is this QR code generator free?", "Yes. This is a free online QR code generator that creates the SVG in your browser."],
  ["Which QR code types can I create here?", "This tool provides presets for URLs, text, email links, phone links, and Wi-Fi credentials. You can also enter another compatible text payload."],
  ["Can I create a Wi-Fi QR code?", "Yes. Use the Wi-Fi preset and replace the sample network name and password with your own correctly formatted Wi-Fi payload."],
  ["Can I create a QR code for a website?", "Yes. Select the URL preset or enter a complete website address, then test the resulting code before publishing it."],
  ["Do QR codes expire?", "A static QR code itself does not expire. However, a QR code pointing to a changed, unavailable, or incorrect destination will no longer be useful."],
  ["How much data can this tool store?", "This implementation accepts up to 232 UTF-8 bytes and automatically chooses a supported QR version for the entered content."],
  ["What are QR code error-correction levels?", "QR Code specifications include error-correction options that help a symbol tolerate some damage. This generator uses its built-in fixed configuration and does not offer an error-correction control."],
  ["Can I customize the QR code?", "You can set the foreground and background colors, quiet zone, and module size. Keep strong contrast and test the final code after customizing it."],
  ["Which file format can I download?", "This page downloads an SVG, a scalable vector format that remains sharp for print and digital use."],
  ["Why will my QR code not scan?", "Check the encoded content, contrast, quiet zone, final size, and print quality. Dense symbols, low contrast, cropped margins, and tiny prints can reduce reliability."],
  ["Can I use QR codes for business?", "Yes, for example on product packaging, menus, event material, websites, and contact points. Verify the information and destination before distribution."],
  ["Are QR codes secure?", "A QR code only carries data; it does not establish whether a destination is trustworthy. Use trusted destinations and scan codes from sources you trust."],
  ["Can I print a QR code?", "Yes. Download the SVG, preserve the surrounding quiet zone, use adequate physical size and contrast, and scan-test the printed result."],
  ["Does this tool work on mobile?", "The generator runs in a modern browser and its controls are designed to be usable on mobile screens."],
]

const jsonLd = [
  { "@context": "https://schema.org", "@type": "WebPage", name: pageTitle, description: pageDescription, url: pageUrl, isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL } },
  { "@context": "https://schema.org", "@type": "WebApplication", name: "QR Code Generator", applicationCategory: "UtilitiesApplication", operatingSystem: "Any", url: pageUrl, description: pageDescription, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "QR Code Generator", applicationCategory: "UtilitiesApplication", operatingSystem: "Any", url: pageUrl, description: pageDescription, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "QR Code Generator", item: pageUrl }] },
  { "@context": "https://schema.org", "@type": "HowTo", name: "How to create a QR code", step: ["Choose a preset or enter content.", "Set colors, quiet zone, and module size if needed.", "Review the QR preview.", "Copy the SVG or download it, then scan-test it."].map((text, position) => ({ "@type": "HowToStep", position: position + 1, text })) },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
]

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pagePath },
  openGraph: { title: pageTitle, description: pageDescription, url: pageUrl, siteName: SITE_NAME, type: "website" },
  twitter: { card: "summary", title: pageTitle, description: pageDescription },
}

import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import Link from "next/link"
import { QrCodeGeneratorTool } from "./qr-code-generator-tool"

export default function QrCodeGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <QrCodeGeneratorTool />
        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <FormattedContentGuide />
        </section>
      </main>
    </>
  )
}

function FormattedContentGuide() {
  const faqs = [
    {
      question: "What is a QR code?",
      answer:
        "A QR code is a two-dimensional barcode that a camera or scanner can decode into stored information, such as a web address or short text.",
    },
    {
      question: "How does this QR code generator work?",
      answer:
        "Enter content or choose a preset. The page encodes the value locally in your browser, shows an SVG preview, and lets you copy or download that SVG.",
    },
    {
      question: "Is this QR code generator free?",
      answer: "Yes. This is a free online QR code generator that creates the SVG in your browser.",
    },
    {
      question: "Which QR code types can I create here?",
      answer:
        "This tool provides presets for URLs, text, email links, phone links, and Wi-Fi credentials. You can also enter another compatible text payload.",
    },
    {
      question: "Can I create a Wi-Fi QR code?",
      answer:
        "Yes. Use the Wi-Fi preset and replace the sample network name and password with your own correctly formatted Wi-Fi payload.",
    },
    {
      question: "Can I create a QR code for a website?",
      answer:
        "Yes. Select the URL preset or enter a complete website address, then test the resulting code before publishing it.",
    },
    {
      question: "Do QR codes expire?",
      answer:
        "A static QR code itself does not expire. However, a QR code pointing to a changed, unavailable, or incorrect destination will no longer be useful.",
    },
    {
      question: "How much data can this tool store?",
      answer:
        "This implementation accepts up to 232 UTF-8 bytes and automatically chooses a supported QR version for the entered content.",
    },
    {
      question: "What are QR code error-correction levels?",
      answer:
        "QR Code specifications include error-correction options that help a symbol tolerate some damage. This generator uses its built-in fixed configuration and does not offer an error-correction control.",
    },
    {
      question: "Can I customize the QR code?",
      answer:
        "You can set the foreground and background colors, quiet zone, and module size. Keep strong contrast and test the final code after customizing it.",
    },
    {
      question: "Which file format can I download?",
      answer: "This page downloads an SVG, a scalable vector format that remains sharp for print and digital use.",
    },
    {
      question: "Why will my QR code not scan?",
      answer:
        "Check the encoded content, contrast, quiet zone, final size, and print quality. Dense symbols, low contrast, cropped margins, and tiny prints can reduce reliability.",
    },
    {
      question: "Can I use QR codes for business?",
      answer:
        "Yes, for example on product packaging, menus, event material, websites, and contact points. Verify the information and destination before distribution.",
    },
    {
      question: "Are QR codes secure?",
      answer:
        "A QR code only carries data; it does not establish whether a destination is trustworthy. Use trusted destinations and scan codes from sources you trust.",
    },
    {
      question: "Can I print a QR code?",
      answer:
        "Yes. Download the SVG, preserve the surrounding quiet zone, use adequate physical size and contrast, and scan-test the printed result.",
    },
    {
      question: "Does this tool work on mobile?",
      answer: "The generator runs in a modern browser and its controls are designed to be usable on mobile screens.",
    },
  ]

  return (
    <>
      <ToolPanel>
        <PanelHeader eyebrow="Guide" title="What Is a QR Code Generator?" />
        <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
          <p>
            A QR Code Generator turns information into a scannable two-dimensional barcode. QR
            codes make it quick to open a website, share a short message, start an email or call,
            or join a Wi-Fi network without typing. They are useful for business, education,
            retail, marketing, events, and everyday personal sharing.
          </p>
          <p>
            This free QR Code Generator creates a static SVG QR code locally in your browser. A
            static code stores the information directly; a dynamic QR code usually redirects
            through a separately managed service, which this page does not provide.
          </p>
        </div>
      </ToolPanel>

      <ToolPanel>
        <PanelHeader eyebrow="Method" title="How the QR Code Generator Works" />
        <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
          <li>Select a preset or enter the content to encode.</li>
          <li>Optionally set foreground and background colors, quiet zone, and module size.</li>
          <li>Review the generated QR code and its automatic version indicator.</li>
          <li>Copy the SVG markup or download the SVG, then test it with a scanner.</li>
        </ol>
      </ToolPanel>

      <ToolPanel>
        <PanelHeader eyebrow="Types" title="Supported QR Code Types" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["URL", "Open a website, such as https://example.com."],
            ["Text", "Share a short message or reference."],
            ["Email", "Encode a mailto: link for a new email draft."],
            ["Phone", "Encode a tel: link for a phone number."],
            ["Wi-Fi", "Encode a compatible Wi-Fi payload with network details."],
          ].map(([label, text]) => (
            <InfoBox key={label}>
              <strong className="block text-[var(--ink-900)]">{label}</strong>
              <span>{text}</span>
            </InfoBox>
          ))}
        </div>
      </ToolPanel>

      <ToolPanel>
        <PanelHeader eyebrow="Quality" title="QR Code Best Practices" />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Tips for Better QR Codes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Keep URLs and other payloads as short as practical.</li>
              <li>Use a dark foreground on a light background with strong contrast.</li>
              <li>Keep the quiet zone clear; four modules is the standard minimum.</li>
              <li>Use a sufficiently large, sharp image for the viewing distance.</li>
              <li>Avoid excessive visual customization and test the final result.</li>
              <li>Verify URLs and embedded details before printing or sharing.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Common Mistakes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Cropping or removing the quiet zone.</li>
              <li>Using low-contrast colors.</li>
              <li>Printing too small for the scanning distance.</li>
              <li>Encoding an incorrect or outdated URL.</li>
              <li>Using a low-resolution image in print workflows.</li>
              <li>Publishing without testing the final code.</li>
            </ul>
          </div>
        </div>
      </ToolPanel>

      <ToolPanel>
        <PanelHeader eyebrow="Examples" title="Example QR Codes" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["Website", "https://example.com"],
            ["Wi-Fi", "A test network name and password, entered in the Wi-Fi preset format."],
            ["Phone", "tel:+15551234567"],
            ["Text", "Welcome to our event."],
          ].map(([label, text]) => (
            <InfoBox key={label}>
              <strong className="block text-[var(--ink-900)]">{label}</strong>
              <span>{text}</span>
            </InfoBox>
          ))}
        </div>
      </ToolPanel>

      <ToolPanel>
        <PanelHeader eyebrow="Results" title="Understanding the QR Code" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["Preview", "The output panel shows the generated QR code as an SVG image."],
            ["Version and size", "The badge shows the automatic QR version and module dimensions."],
            ["Module", "A module is one small square in the QR symbol."],
            ["Encoding", "This generator uses byte-mode text encoding for the entered payload."],
            ["Quiet zone", "The quiet-zone control sets the clear margin around the symbol."],
            ["SVG output", "Copy or download the scalable SVG for digital or print use."],
          ].map(([label, text]) => (
            <InfoBox key={label}>
              <strong className="block text-[var(--ink-900)]">{label}</strong>
              <span>{text}</span>
            </InfoBox>
          ))}
        </div>
      </ToolPanel>

      <ToolPanel>
        <PanelHeader eyebrow="Applications" title="Common Uses, Benefits, and Limitations" />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Common Uses</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Websites, menus, and marketing material.</li>
              <li>Product packaging and event registration.</li>
              <li>Wi-Fi sharing, education, and inventory labels.</li>
              <li>Email, phone, and short text contact points.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Benefits and Limits</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>QR codes reduce typing and support contactless sharing.</li>
              <li>The code is only as useful as the information it stores.</li>
              <li>Outdated links, physical damage, and low contrast can reduce reliability.</li>
              <li>Very dense or tiny printed codes can be harder to scan.</li>
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
            ["Barcode Generator", "/barcode-generator"],
            ["URL Encoder / Decoder", "/url-encoder-decoder"],
            ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
            ["Image Converter", "/image-converter"],
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
        <PanelHeader eyebrow="Glossary" title="QR Code Terms" />
        <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
          {[
            ["QR Code", "A two-dimensional barcode."],
            ["Static QR Code", "A code whose encoded data is fixed."],
            ["Dynamic QR Code", "A redirect-based code managed by a separate service."],
            ["Error Correction", "Extra codewords that help a scanner recover some damaged data."],
            ["Quiet Zone", "Clear margin around the symbol."],
            ["Module", "One square cell in a QR code."],
            ["QR Version", "A standardized symbol-size family."],
            ["Encoding", "The way information is converted into QR code data."],
            ["Payload", "The information stored in the code."],
            ["Scanner", "A camera or reader that decodes the symbol."],
            ["Wi-Fi QR Code", "A QR code containing compatible network details."],
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
              href="https://www.iso.org/standard/83389.html"
              rel="noreferrer"
            >
              ISO/IEC 18004:2024. QR code bar code symbology specification.
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
              href="https://ref.gs1.org/guidelines/2d-in-retail/1.0.0/"
              rel="noreferrer"
            >
              GS1. 2D barcode implementation guidance.
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
              href="https://ref.gs1.org/sme-guidance/2d-barcode-creation-and-printing-playbook/1.0.0/"
              rel="noreferrer"
            >
              GS1. 2D barcode creation and printing playbook.
            </a>
          </li>
        </ul>
      </ToolPanel>

              <EducationalDisclaimerCard type="educational">
          <p>
            This tool generates QR codes from user-provided data. You are responsible for verifying
            encoded information before sharing or printing. The tool does not validate the safety,
            accuracy, or availability of URLs or other embedded content. Test QR codes before public
            distribution. This tool is intended for informational, educational, and general-purpose use.
          </p>
        </EducationalDisclaimerCard>
    </>
  )
}

