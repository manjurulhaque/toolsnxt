import type { Metadata } from "next"
import type { ReactNode } from "react"
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

export default function QrCodeGeneratorLayout({ children }: { children: ReactNode }) {
  return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></>
}
