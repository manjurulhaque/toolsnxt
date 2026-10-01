import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ImageConverterTool } from "./image-converter-tool"

const pagePath = "/image-converter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Image Converter | Convert JPG, PNG and WebP Online"
const pageDescription =
  "Convert images online to PNG, JPG, or WebP in your browser. Batch convert browser-readable images with previews, quality control, max-width resizing, and downloads."

const faqs = [
  {
    question: "What is an Image Converter?",
    answer:
      "An Image Converter changes an image from one file format to another, such as PNG, JPG, or WebP.",
  },
  {
    question: "How does this Image Converter work?",
    answer:
      "It loads selected image files in the browser, draws them to a canvas, exports the canvas in the selected output format, and creates download links.",
  },
  {
    question: "Which output image formats are supported?",
    answer:
      "This converter outputs PNG, JPG, and WebP. It does not output AVIF, TIFF, BMP, ICO, HEIC, SVG, or GIF.",
  },
  {
    question: "Which input image formats are supported?",
    answer:
      "The file picker accepts image files, and conversion depends on your browser's ability to decode the selected image through browser image APIs.",
  },
  {
    question: "Can I convert JPG to PNG?",
    answer:
      "Yes. Select JPG or JPEG images, choose PNG as the output format, and convert.",
  },
  {
    question: "Can I convert PNG to JPG?",
    answer:
      "Yes. Choose JPG as the output format. Transparent areas are drawn against a white background before JPEG export.",
  },
  {
    question: "Can I convert PNG to WebP?",
    answer:
      "Yes. Choose WebP as the output format and convert the selected PNG file.",
  },
  {
    question: "Can I convert WebP to PNG or JPG?",
    answer:
      "Yes, if your browser can decode the selected WebP file. Choose PNG or JPG as the output format.",
  },
  {
    question: "What is WebP?",
    answer:
      "WebP is a web image format that supports lossy and lossless compression, transparency, and animation in the format itself.",
  },
  {
    question: "What is AVIF?",
    answer:
      "AVIF is a modern image format, but this page does not provide AVIF as an output option.",
  },
  {
    question: "Which format should I choose?",
    answer:
      "Use JPG for photos and broad compatibility, PNG for lossless graphics or transparency, and WebP for web-friendly compression where supported.",
  },
  {
    question: "Does image quality change?",
    answer:
      "Quality can change when exporting to JPG or WebP and when using the max-width resizing option. PNG output ignores the quality slider.",
  },
  {
    question: "Can I preserve transparency?",
    answer:
      "PNG and WebP outputs can preserve transparency through canvas export, but JPG does not support transparency and uses a white background in this implementation.",
  },
  {
    question: "Can I convert multiple images?",
    answer:
      "Yes. You can select multiple images, convert them as a batch, then download each image or use Download All.",
  },
  {
    question: "Is the converter free?",
    answer: "Yes. This is a free browser-based image converter.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. It uses standard browser file input, previews, buttons, and download behavior that work in modern browsers.",
  },
  {
    question: "Is my data uploaded to a server?",
    answer:
      "The conversion runs locally in your browser. The selected images are not intentionally uploaded by this tool.",
  },
  {
    question: "Does it preserve metadata?",
    answer:
      "No metadata-preservation feature is implemented. Canvas export commonly creates a new image file from pixel data.",
  },
  {
    question: "Which image format is best for websites?",
    answer:
      "WebP is often useful for web delivery where supported; JPG is widely compatible for photos, and PNG is useful for sharp graphics or transparency.",
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
    about: ["Image Converter", "JPG Converter", "PNG Converter", "WebP Converter"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image Converter",
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
    name: "Image Converter",
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
        name: "Image Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert images online",
    description: "Convert browser-readable images to PNG, JPG, or WebP.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose images",
        text: "Select one or more image files from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Select output format",
        text: "Choose PNG, JPG, or WebP.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust settings",
        text: "Set quality for JPG or WebP and optionally enter a maximum width.",
      },
      {
        "@type": "HowToStep",
        name: "Convert",
        text: "Click Convert Images to create converted files.",
      },
      {
        "@type": "HowToStep",
        name: "Download",
        text: "Download individual images or use Download All after batch conversion.",
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

export default function ImageConverterPage() {
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
          <ImageConverterTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is an Image Converter?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                An Image Converter changes image files into another supported format. Different
                formats exist because photos, screenshots, graphics, web assets, and print files
                have different needs for compression, transparency, compatibility, and file size.
              </p>
              <p>
                This online image converter is useful for web development, graphic design,
                photography, printing, social media, e-commerce, mobile apps, email attachments,
                and digital publishing. It converts selected files locally in your browser to PNG,
                JPG, or WebP.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Image Converter Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Upload images", "Choose one or more browser-readable image files."],
                ["Select output format", "Convert to PNG, JPG, or WebP."],
                ["Adjust quality", "Use the quality slider for JPG and WebP output."],
                ["Resize by max width", "Optionally limit width while preserving the original aspect ratio."],
                ["Preview files", "Input and converted images appear as preview cards."],
                ["Download output", "Download each converted image or use Download All for a batch."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formats" title="Supported Image Formats" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Output formats are PNG, JPG, and WebP. Input accepts files whose MIME type starts
                with
                <code className="mx-1 rounded bg-[var(--page-cream)] px-1">image/</code>
                and then depends on browser decoding through
                <code className="mx-1 rounded bg-[var(--page-cream)] px-1">createImageBitmap</code>.
                The interface mentions JPG, PNG, WebP, GIF, BMP, and other browser-readable images.
              </p>
              <InfoBox>
                This page does not output AVIF, GIF, BMP, TIFF, ICO, HEIC, or SVG, and it does not
                provide vector conversion.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Conversions" title="Supported Conversions" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["JPG to PNG", "Useful when you need PNG output from a photo or uploaded JPEG file."],
                ["JPG to WebP", "Useful for web delivery when WebP is accepted by your workflow."],
                ["PNG to JPG", "Useful for broad photo-style compatibility; transparent pixels use a white background."],
                ["PNG to WebP", "Useful for web graphics when WebP is supported."],
                ["WebP to PNG", "Useful when a PNG file is required and your browser decodes the WebP input."],
                ["WebP to JPG", "Useful for broader compatibility when transparency is not required."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Image Conversion Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Canvas conversion", "The browser draws the source bitmap to a canvas and exports a new image file."],
                ["Visual appearance", "The converter preserves appearance as closely as the destination format and browser encoder allow."],
                ["Transparency", "PNG and WebP can support transparency; JPG output is composited onto white first."],
                ["Quality setting", "The quality value applies to lossy-capable exports such as JPG and WebP."],
                ["PNG quality", "PNG output ignores the quality slider because this implementation passes no quality value for PNG."],
                ["Metadata", "No metadata-retention option is implemented; output is generated from rendered pixel data."],
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
                ["JPG photo to PNG", "Create a PNG copy for editing workflows that prefer PNG."],
                ["PNG to WebP", "Prepare web graphics for smaller, modern website assets."],
                ["WebP to JPG", "Create a broadly compatible image when WebP is not accepted."],
                ["PNG to JPG", "Convert screenshots or graphics for systems that require JPEG."],
                ["Batch to WebP", "Convert several browser-readable images into WebP output files."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Features" title="Implemented Features" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Batch conversion", "Select and convert multiple images at once."],
                ["Output format selector", "Choose PNG, JPG, or WebP."],
                ["Quality control", "Set quality from 45% to 100% for JPG and WebP."],
                ["Max-width resizing", "Resize only when an image is wider than the entered max width."],
                ["Input and output previews", "See selected files and converted files as image cards."],
                ["Downloads", "Download individual files or all converted files."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Image Converter" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose one or more image files.</li>
              <li>Select PNG, JPG, or WebP as the output format.</li>
              <li>Adjust quality for JPG or WebP if needed.</li>
              <li>Enter a max width if you want to resize wider images.</li>
              <li>Click Convert Images.</li>
              <li>Preview the converted files and download them individually or together.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Understanding the Output" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Converted image", "The output card shows the converted file preview."],
                ["Output format", "The file extension matches PNG, JPG, or WebP."],
                ["File size", "Each card shows the converted file size."],
                ["Resolution", "Resolution remains original unless max width resizes the image."],
                ["Download option", "Each converted image has a Download button."],
                ["Batch download", "Download All appears when more than one converted image exists."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Website optimization", "Convert images to WebP for supported web workflows."],
                ["Photography", "Create JPG copies for sharing or compatibility."],
                ["Graphic design", "Use PNG when sharp edges or transparency matter."],
                ["Digital publishing", "Prepare consistent image formats for articles and documents."],
                ["Social media and email", "Convert files into accepted formats before uploading or attaching."],
                ["E-commerce and mobile apps", "Create product and app images in practical delivery formats."],
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
                  <li>Converts images locally in the browser.</li>
                  <li>Supports PNG, JPG, and WebP output.</li>
                  <li>Handles multiple files in one conversion run.</li>
                  <li>Includes previews, file sizes, quality control, and optional max-width resizing.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Only PNG, JPG, and WebP output formats are implemented.</li>
                  <li>Lossy output may reduce visual quality.</li>
                  <li>JPG output does not preserve transparency.</li>
                  <li>Animation, metadata, and vector data are not preserved as separate features.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Use JPG for photos and broad compatibility.</li>
                  <li>Use PNG for graphics that need transparency or sharp detail.</li>
                  <li>Use WebP for web optimization where your target browsers support it.</li>
                  <li>Preview converted images before publishing or sending them.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Choosing JPG when transparency is required.</li>
                  <li>Using too much compression for text-heavy images.</li>
                  <li>Uploading a format the browser cannot decode.</li>
                  <li>Expecting raster images to become editable vector graphics.</li>
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
                ["Image to PDF Converter", "/image-to-pdf"],
                ["PDF to Images", "/pdf-to-images"],
                ["Image to Favicon", "/image-to-favicon"],
                ["Image to ASCII Art", "/image-to-ascii-art"],
                ["PDF Compress", "/pdf-compress"],
                ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
                ["QR Code Generator", "/qr-code-generator"],
                ["Color Converter", "/color-converter"],
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
            <PanelHeader eyebrow="Glossary" title="Image Format Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Raster Image", "An image made from pixels, such as a photo or screenshot."],
                ["JPEG", "A widely supported lossy image format often used for photographs."],
                ["PNG", "A lossless raster format that can support transparency."],
                ["WebP", "A modern web image format supporting lossy and lossless compression."],
                ["AVIF", "A modern compressed image format not provided as an output here."],
                ["GIF", "A palette-based image format often associated with simple animation."],
                ["TIFF", "A flexible image format often used in scanning, publishing, and archives."],
                ["BMP", "A bitmap image format commonly associated with Windows."],
                ["Transparency", "Pixels that are fully or partly see-through."],
                ["Compression", "Encoding image data to reduce file size."],
                ["Lossy Compression", "Compression that can discard visual information to reduce file size."],
                ["Lossless Compression", "Compression that preserves the original decoded data."],
                ["Resolution", "The pixel width and height of an image."],
                ["Metadata", "Information stored with a file, such as camera or color details."],
                ["Color Depth", "How much color information is stored per pixel or channel."],
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
                  href="https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types"
                  rel="noreferrer"
                >
                  MDN Web Docs. Image file type and format guide.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob"
                  rel="noreferrer"
                >
                  MDN Web Docs. HTMLCanvasElement: toBlob() method.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.w3.org/TR/png-3/"
                  rel="noreferrer"
                >
                  W3C. Portable Network Graphics (PNG) Specification.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.w3.org/TR/FileAPI/"
                  rel="noreferrer"
                >
                  W3C. File API.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Educational Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This Image Converter converts supported browser-readable images using the implemented
              canvas-based conversion process. Results are intended for educational, informational,
              and general productivity use. Some output formats may introduce compression,
              transparency, metadata, or compatibility limitations. Verify converted images before
              using them in production, printing, publishing, e-commerce, or archival workflows.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
