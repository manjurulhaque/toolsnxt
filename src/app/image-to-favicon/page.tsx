import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ImageToFaviconTool } from "./image-to-favicon-tool"

const pagePath = "/image-to-favicon"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Image to Favicon | Free Online Favicon Generator"
const pageDescription =
  "Convert an image to favicon files online in your browser. Generate favicon.ico plus PNG icons at 16, 32, 48, 180, 192, and 512 px with padding and background controls."

const faqs = [
  {
    question: "What is a favicon?",
    answer:
      "A favicon is a small website icon that browsers may show in tabs, bookmarks, history, and other user-interface locations.",
  },
  {
    question: "How does Image to Favicon conversion work?",
    answer:
      "This tool loads the selected image, draws it to canvas at several square sizes, exports PNG files, and packages 16, 32, and 48 px PNG images into favicon.ico.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "The file picker accepts image/* files that the browser can decode, commonly including PNG, JPG, WebP, SVG, GIF, and BMP depending on browser support.",
  },
  {
    question: "Does the tool generate ICO files?",
    answer:
      "Yes. It generates favicon.ico containing 16, 32, and 48 px icon entries.",
  },
  {
    question: "Does it support PNG favicons?",
    answer:
      "Yes. It generates PNG icon files at 16, 32, 48, 180, 192, and 512 px.",
  },
  {
    question: "Can I use transparent images?",
    answer:
      "Yes. Transparent background is enabled by default. You can also disable it and choose a solid background color.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. It uses standard browser file input, canvas, previews, and download links, so support depends on the mobile browser.",
  },
  {
    question: "Is my image uploaded to a server?",
    answer:
      "The favicon generation runs in your browser. The selected image is not intentionally uploaded by this tool.",
  },
  {
    question: "Can I use the favicon commercially?",
    answer:
      "The tool does not grant rights to the source image or logo. Use generated files only when you have the necessary permissions.",
  },
  {
    question: "Can I replace my website favicon later?",
    answer:
      "Yes. Replace the favicon files and update your HTML links or site assets as needed, then account for browser caching.",
  },
  {
    question: "Is this tool free?",
    answer: "Yes. This is a free browser-based favicon generator.",
  },
  {
    question: "Why does my favicon look blurry?",
    answer:
      "Favicons are very small. Detailed images, thin text, low-resolution sources, or heavy scaling can reduce clarity.",
  },
  {
    question: "Why is my favicon different from another generator?",
    answer:
      "Generators may use different sizes, padding, background handling, scaling filters, cropping rules, and ICO encoding methods.",
  },
  {
    question: "Which favicon size should I use?",
    answer:
      "Use the generated files that match your site setup. This page creates a small favicon.ico plus common PNG icon sizes for browser and app-icon workflows.",
  },
  {
    question: "Can I create a favicon from a logo?",
    answer:
      "Yes. Simple square or square-ish logos with strong contrast usually produce the clearest favicon results.",
  },
  {
    question: "Does this tool support drag-and-drop?",
    answer:
      "No. This implementation uses a file picker upload control.",
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
    about: ["Image to Favicon", "Favicon Generator", "Image to ICO", "Website Favicon Creator"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image to Favicon",
    applicationCategory: "MultimediaApplication",
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
    name: "Image to Favicon",
    applicationCategory: "MultimediaApplication",
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
        name: "Image to Favicon",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create favicon files from an image",
    description: "Generate favicon.ico and PNG icon files from a browser-readable image.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose image",
        text: "Select a browser-readable image file.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust settings",
        text: "Set icon padding and choose transparent or solid background handling.",
      },
      {
        "@type": "HowToStep",
        name: "Generate files",
        text: "Click Generate Favicons to create favicon.ico and PNG icon files.",
      },
      {
        "@type": "HowToStep",
        name: "Preview output",
        text: "Review the source preview and generated icon previews.",
      },
      {
        "@type": "HowToStep",
        name: "Download",
        text: "Download favicon.ico, individual PNG files, or all generated files.",
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

export default function ImageToFaviconPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:py-12">
          <ImageToFaviconTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is Image to Favicon?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Image to Favicon converts a logo or picture into small website icon files. Favicons
                help browsers, bookmarks, tabs, shortcuts, and app-like surfaces identify a site.
                Web developers, designers, business owners, bloggers, agencies, students, and
                creators use favicon generators to prepare recognizable branding assets quickly.
              </p>
              <p>
                This tool draws the selected image onto square canvases, applies the configured
                padding and background choice, exports PNG icons, and creates an ICO file from the
                implemented icon sizes. Small icon dimensions naturally simplify fine image detail.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How Image to Favicon Conversion Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Choose image", "Select one browser-readable image file through the file picker."],
                ["Preview source", "The selected image and small preview sizes appear before generation."],
                ["Apply padding", "Padding is calculated as a percentage of each square output size."],
                ["Handle background", "Transparent background clears the canvas; solid background fills it with the selected color."],
                ["Render PNG icons", "The image is scaled with high smoothing into 16, 32, 48, 180, 192, and 512 px PNG outputs."],
                ["Create ICO", "The ICO file contains PNG image data for 16, 32, and 48 px entries."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Features" title="Supported Features" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Image upload", "Accepts image/* files supported by the browser."],
                ["Browser-based processing", "Uses browser image decoding, canvas rendering, and Blob downloads."],
                ["Automatic resizing", "Generates fixed square icon sizes from the source image."],
                ["Aspect ratio handling", "Scales the image to fit inside each padded square without cropping."],
                ["Transparency control", "Keep transparency or apply a selected solid background color."],
                ["ICO output", "Generates favicon.ico with 16, 32, and 48 px entries."],
                ["PNG output", "Generates 16, 32, 48, 180, 192, and 512 px PNG files."],
                ["Download controls", "Download favicon.ico, individual PNG files, or all generated files."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Conversion Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Implemented algorithm", "Favicons are generated directly from the uploaded image using the current canvas and ICO assembly code."],
                ["Scaling", "The image is fit inside each square canvas after padding; the implementation does not crop to cover."],
                ["Transparency", "Alpha is preserved when transparent background is enabled and the browser exports PNG successfully."],
                ["Small icons", "Very small sizes such as 16 px cannot preserve all details from complex images."],
                ["Browser behavior", "Source format support depends on the browser's image decoder and canvas export behavior."],
                ["Generator differences", "Different tools may use different resizing, filtering, padding, and ICO encoding methods."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Common Examples" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Company logo", "Convert a simple square logo into website favicon files."],
                ["Personal blog", "Create a recognizable tab icon for a blog or portfolio."],
                ["Web application", "Generate icons for a dashboard or browser-based app."],
                ["Documentation site", "Prepare small branding assets for developer docs."],
                ["Landing page", "Make a quick favicon set before launching a campaign page."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use Image to Favicon" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose a logo or image file.</li>
              <li>Adjust icon padding if the artwork needs more or less empty space.</li>
              <li>Keep transparency enabled or select a solid background color.</li>
              <li>Click Generate Favicons.</li>
              <li>Download favicon.ico, individual PNG icons, or all generated files.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Concepts" title="Understanding Favicons" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A favicon is an icon representing a web page or site. In HTML, favicons are commonly
                referenced with link elements using rel=&quot;icon&quot;. Browsers may choose among
                available icons using attributes such as type, sizes, media, and their own support
                rules.
              </p>
              <p>
                ICO files can contain multiple icon images. PNG favicons are common for modern web
                use, while ICO remains familiar for favicon.ico workflows. Simple, high-contrast
                artwork usually works best because tiny browser icons have limited room for detail.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Websites", "Add recognizable icons to tabs and bookmarks."],
                ["Blogs", "Give a personal publication a consistent visual identity."],
                ["Web applications", "Prepare icons for dashboards and app-like browser surfaces."],
                ["Business sites", "Turn brand marks into small browser icons."],
                ["Portfolio sites", "Create a polished detail for personal branding."],
                ["Educational sites", "Generate icons for class projects and learning demos."],
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
                  <li>Create favicon.ico and PNG icon files in the browser.</li>
                  <li>Adjust padding and background handling before generation.</li>
                  <li>Preview source and generated icon outputs before downloading.</li>
                  <li>Download individual files or all generated favicon assets.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Very small favicon sizes cannot preserve every image detail.</li>
                  <li>Complex photos and thin text may lose readability when reduced.</li>
                  <li>Browser favicon selection and format support can vary.</li>
                  <li>Drag-and-drop upload and copy actions are not implemented on this page.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Start with a square or square-ish source image.</li>
                  <li>Use simple logos or icons with strong contrast.</li>
                  <li>Avoid small text and highly detailed photographs.</li>
                  <li>Use transparent backgrounds when the icon should work on varied surfaces.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Uploading a low-resolution or blurry source image.</li>
                  <li>Expecting a tiny icon to preserve every logo detail.</li>
                  <li>Ignoring padding and ending up with artwork that touches the edges.</li>
                  <li>Assuming every browser will choose the same favicon file.</li>
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
                ["Image Resizer", "/image-resizer"],
                ["Image Converter", "/image-converter"],
                ["SVG Optimizer", "/svg-optimizer"],
                ["Color Converter", "/color-converter"],
                ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
                ["QR Code Generator", "/qr-code-generator"],
                ["Gradient Generator", "/gradient-generator"],
              ].map(([label, href]) => (
                <Link
                  key={`${label}-${href}`}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Favicon Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Favicon", "A small icon associated with a website or web page."],
                ["ICO", "An icon container format that can hold multiple icon images."],
                ["PNG", "A raster image format commonly used for web icons and transparency."],
                ["Transparency", "Image areas that let the background show through."],
                ["Alpha Channel", "Pixel data that controls opacity or transparency."],
                ["Resolution", "The pixel dimensions or level of detail in an image."],
                ["Pixel", "A single picture element in a raster image."],
                ["Raster Image", "An image made from a grid of pixels."],
                ["Browser Icon", "A small icon a browser may show for a site, tab, bookmark, or shortcut."],
                ["Image Scaling", "Resizing an image to fit a different pixel size."],
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
                  href="https://html.spec.whatwg.org/multipage/links.html#rel-icon"
                  rel="noreferrer"
                >
                  WHATWG HTML Living Standard. Link type icon.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel"
                  rel="noreferrer"
                >
                  MDN Web Docs. rel attribute and icon keyword.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Glossary/Favicon"
                  rel="noreferrer"
                >
                  MDN Web Docs. Favicon glossary.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob"
                  rel="noreferrer"
                >
                  MDN Web Docs. HTMLCanvasElement toBlob.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://learn.microsoft.com/en-us/windows/win32/menurc/icon-resource"
                  rel="noreferrer"
                >
                  Microsoft Learn. ICON resource.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This Image to Favicon tool converts images into favicon files using the implemented
            browser-based conversion algorithm. Results depend on source image quality, padding,
            background settings, browser image decoding, canvas export behavior, and supported
            output formats. Different favicon generators may produce different results. This tool
            is intended for educational, branding, and web development purposes.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
