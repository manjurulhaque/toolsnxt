import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ImageResizerTool } from "./image-resizer-tool"

const pagePath = "/image-resizer"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Image Resizer | Resize JPG, PNG and WebP Online"
const pageDescription =
  "Resize images online for free in your browser. Batch resize browser-readable images with width, height, aspect-ratio lock, contain, cover, stretch, quality, and download controls."

const faqs = [
  {
    question: "What is an Image Resizer?",
    answer:
      "An Image Resizer changes an image's pixel dimensions, such as resizing a photo from 4000 x 3000 pixels to 1200 x 900 pixels.",
  },
  {
    question: "How does this Image Resizer work?",
    answer:
      "It loads selected images in the browser, draws them to a canvas at the selected size and mode, exports the canvas, and creates download links.",
  },
  {
    question: "Can I resize images without losing quality?",
    answer:
      "Reducing dimensions can preserve a good visual result, but resizing changes pixel data. Enlarging an image cannot recreate detail that was not in the original.",
  },
  {
    question: "What output image formats are supported?",
    answer:
      "The implemented output formats are PNG, JPG, and WebP.",
  },
  {
    question: "What input image formats are supported?",
    answer:
      "The file picker accepts image files, and resizing depends on your browser's ability to decode the selected image.",
  },
  {
    question: "Can I resize JPG images?",
    answer:
      "Yes. Choose JPG or JPEG files, set the dimensions and mode, then resize.",
  },
  {
    question: "Can I resize PNG images?",
    answer:
      "Yes. PNG images can be resized and exported as PNG, JPG, or WebP.",
  },
  {
    question: "What is aspect ratio?",
    answer:
      "Aspect ratio is the proportional relationship between width and height, such as 1:1 for a square or 16:9 for widescreen.",
  },
  {
    question: "Should I maintain aspect ratio?",
    answer:
      "Maintain aspect ratio when you want to avoid distortion while editing dimensions. Stretch mode still draws to the exact target size.",
  },
  {
    question: "Does resizing reduce file size?",
    answer:
      "It often can, especially when reducing pixel dimensions or using JPG/WebP quality settings, but final size depends on the image and output format.",
  },
  {
    question: "Can I resize multiple images?",
    answer:
      "Yes. Select multiple images, apply the same resize settings, then download individual outputs or use Download All.",
  },
  {
    question: "Is the Image Resizer free?",
    answer: "Yes. This is a free browser-based image resizer.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. It uses standard browser file inputs, form controls, previews, and download actions for modern browsers.",
  },
  {
    question: "Is my data uploaded to a server?",
    answer:
      "The resizing runs locally in your browser. Selected images are not intentionally uploaded by this tool.",
  },
  {
    question: "What dimensions should I use for social media?",
    answer:
      "Use the dimensions required by the platform or campaign. This page includes a 1200 x 630 Social preset and a 1080 x 1080 Square preset.",
  },
  {
    question: "Can I enlarge images?",
    answer:
      "Yes, by entering dimensions larger than the source, but upscaled images may look soft or blurry.",
  },
  {
    question: "Why does my enlarged image look blurry?",
    answer:
      "Upscaling spreads existing pixels over a larger area. Smoothing can reduce jagged edges, but it cannot add real source detail.",
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
    about: ["Image Resizer", "Resize Image", "Resize JPG", "Resize PNG"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image Resizer",
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
    name: "Image Resizer",
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
        name: "Image Resizer",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to resize images online",
    description: "Resize browser-readable images to selected pixel dimensions.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose images",
        text: "Select one or more image files from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Set dimensions",
        text: "Enter width and height or choose one of the preset sizes.",
      },
      {
        "@type": "HowToStep",
        name: "Choose resize settings",
        text: "Set aspect-ratio editing, resize mode, output format, quality, and background where available.",
      },
      {
        "@type": "HowToStep",
        name: "Resize",
        text: "Click Resize Images to generate resized files.",
      },
      {
        "@type": "HowToStep",
        name: "Download",
        text: "Download one resized image or use Download All for multiple outputs.",
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

export default function ImageResizerPage() {
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
          <ImageResizerTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is an Image Resizer?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                An Image Resizer changes the pixel width and height of a raster image. Resizing is
                useful when photos, screenshots, product images, banners, or app assets need to fit
                a target platform, upload limit, layout, or sharing workflow.
              </p>
              <p>
                Image dimensions describe pixel width and height, while file size describes how
                many bytes the saved file uses. This online image resizer helps with social media,
                websites, email attachments, printing, photography, graphic design, e-commerce,
                mobile apps, and digital publishing.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Image Resizer Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Upload images", "Choose one or more browser-readable image files."],
                ["Set dimensions", "Enter width and height in pixels or select a preset."],
                ["Aspect-ratio editing", "When locked, changing width or height updates the other field proportionally."],
                ["Resize mode", "Choose contain, cover, or stretch for how the image is drawn into the target canvas."],
                ["Output format", "Export resized images as PNG, JPG, or WebP."],
                ["Preview and download", "Review selected and resized image cards, then download individual files or all outputs."],
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
                and depends on browser decoding through
                <code className="mx-1 rounded bg-[var(--page-cream)] px-1">createImageBitmap</code>.
                The upload copy mentions JPG, PNG, WebP, GIF, BMP, and other browser-readable
                images.
              </p>
              <InfoBox>
                This page does not output AVIF, GIF, BMP, TIFF, ICO, HEIC, or SVG, and it does not
                perform vector conversion or OCR.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Options" title="Resize Options" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Width and height", "Target pixel dimensions are required before resizing."],
                ["Presets", "Avatar 512 x 512, Social 1200 x 630, HD 1280 x 720, and Square 1080 x 1080."],
                ["Lock aspect ratio", "Keeps the width and height fields proportional while editing values."],
                ["Fit inside canvas", "Contain mode fits the full image inside the target canvas and may leave background space."],
                ["Fill and crop", "Cover mode fills the target canvas and crops overflow."],
                ["Stretch to exact size", "Stretch mode draws the image to the exact target dimensions."],
                ["Background color", "Shown for contain mode or JPG output, where a background fill is used."],
                ["Quality", "Applies to JPG and WebP exports; PNG ignores the quality slider."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Image Resizing Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Target dimensions", "Every resized output uses the selected target width and height."],
                ["Resampling", "The canvas context uses image smoothing enabled with high smoothing quality."],
                ["Aspect ratio", "Locking aspect ratio affects dimension field editing; the selected resize mode controls final drawing."],
                ["Contain mode", "Uses the smaller scale so the full source image fits inside the target canvas."],
                ["Cover mode", "Uses the larger scale so the target canvas is filled, cropping edges if needed."],
                ["Stretch mode", "Draws the source image directly into the target width and height."],
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
                ["Product photo", "Resize a product image to 1200 x 1200 pixels by entering custom dimensions."],
                ["Profile picture", "Use the Avatar preset for a 512 x 512 image."],
                ["Email attachment", "Reduce large photos to smaller pixel dimensions before sending."],
                ["Website banner", "Use the HD preset or custom dimensions for a page header image."],
                ["Online submission", "Resize scanned document photos before uploading them to a form."],
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
                ["Batch resizing", "Resize multiple selected images with the same settings."],
                ["Custom dimensions", "Set exact width and height values."],
                ["Preset dimensions", "Quickly apply common avatar, social, HD, and square sizes."],
                ["Resize modes", "Choose contain, cover, or stretch."],
                ["Multiple output formats", "Export PNG, JPG, or WebP."],
                ["Previews and downloads", "View input and output cards, then download one file or all files."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Image Resizer" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose one or more image files.</li>
              <li>Enter the target width and height, or select a preset size.</li>
              <li>Keep aspect ratio locked while editing dimensions if you want proportional values.</li>
              <li>Select contain, cover, or stretch mode.</li>
              <li>Choose PNG, JPG, or WebP output and adjust quality where available.</li>
              <li>Click Resize Images, preview the outputs, and download them.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Understanding the Output" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Resized image", "The output card shows the resized image preview."],
                ["Width and height", "The subtitle shows final pixel dimensions."],
                ["File size", "Input and output badges show total file sizes; each output card shows its size."],
                ["Output format", "The downloaded file extension matches PNG, JPG, or WebP."],
                ["Download option", "Each output card has a Download button."],
                ["Batch download", "Download All appears when more than one resized output exists."],
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
                ["Website optimization", "Prepare images for page layouts, thumbnails, and responsive assets."],
                ["Social media", "Resize photos for profile, square, or link-preview style dimensions."],
                ["Photography", "Create smaller review or sharing copies from large originals."],
                ["E-commerce", "Standardize product image dimensions."],
                ["Printing and publishing", "Prepare image dimensions for documents, flyers, and presentations."],
                ["Email and mobile apps", "Reduce dimensions for easier sharing and app-friendly assets."],
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
                  <li>Resize images locally in the browser.</li>
                  <li>Apply the same settings to multiple images.</li>
                  <li>Choose exact dimensions, presets, output format, mode, quality, and background.</li>
                  <li>Preview and download resized images without installing desktop software.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Input depends on browser-readable image formats.</li>
                  <li>Only PNG, JPG, and WebP output formats are implemented.</li>
                  <li>Enlarging images cannot restore lost detail.</li>
                  <li>Very large images may take more browser memory and processing time.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Start with the highest-quality original available.</li>
                  <li>Use locked aspect-ratio editing when you want proportional dimensions.</li>
                  <li>Choose dimensions appropriate for your target website, platform, or document.</li>
                  <li>Preview the resized output before publishing, printing, or sending it.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Using stretch mode unintentionally and distorting the image.</li>
                  <li>Upscaling a low-resolution image and expecting sharper detail.</li>
                  <li>Choosing dimensions that do not match the final platform.</li>
                  <li>Confusing pixel dimensions with DPI, PPI, or file size.</li>
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
                ["Image Converter", "/image-converter"],
                ["Image to PDF Converter", "/image-to-pdf"],
                ["PDF to Images", "/pdf-to-images"],
                ["Image to Favicon", "/image-to-favicon"],
                ["Image to ASCII Art", "/image-to-ascii-art"],
                ["PDF Compress", "/pdf-compress"],
                ["SVG Optimizer", "/svg-optimizer"],
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
            <PanelHeader eyebrow="Glossary" title="Image Resizing Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Resolution", "The pixel dimensions or detail level of an image."],
                ["Pixel", "The smallest addressable picture element in a raster image."],
                ["Width", "The horizontal pixel count."],
                ["Height", "The vertical pixel count."],
                ["Aspect Ratio", "The proportional relationship between width and height."],
                ["DPI", "Dots per inch, commonly used for print device output."],
                ["PPI", "Pixels per inch, often used when discussing image density."],
                ["Resampling", "Calculating new pixel values when an image changes size."],
                ["Scaling", "Increasing or decreasing image dimensions."],
                ["Interpolation", "Estimating pixel values between known pixels during resizing."],
                ["Compression", "Encoding image data to reduce file size."],
                ["JPEG", "A widely supported lossy format often used for photographs."],
                ["PNG", "A lossless raster format that can support transparency."],
                ["WebP", "A web image format supporting lossy and lossless compression."],
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"
                  rel="noreferrer"
                >
                  MDN Web Docs. CanvasRenderingContext2D.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled"
                  rel="noreferrer"
                >
                  MDN Web Docs. Canvas image smoothing.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Glossary/Aspect_ratio"
                  rel="noreferrer"
                >
                  MDN Web Docs. Aspect ratio glossary.
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
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Educational Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This Image Resizer changes image dimensions using the implemented browser
              canvas-based resizing process. Results are intended for educational, informational,
              and general productivity use. Enlarging images cannot recreate missing visual detail.
              Verify image dimensions, quality, transparency, and format compatibility before
              publishing, printing, submitting, or using resized images in production.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
