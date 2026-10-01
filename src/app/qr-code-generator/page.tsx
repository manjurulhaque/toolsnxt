"use client"

import { NumberField } from "@/components/form-controls"
import Link from "next/link"
import { useMemo, useState } from "react"
import { PanelHeader, ToolIntro, InfoBox, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, downloadTextFile } from "@/lib/browser-actions"
import { SITE_NAME, SITE_URL } from "@/lib/site"

type QrPreset = "url" | "text" | "email" | "phone" | "wifi"

type QrConfig = {
  version: number
  dataCodewords: number
  ecCodewords: number
  blocks: number
}

const qrConfigs: QrConfig[] = [
  { version: 1, dataCodewords: 19, ecCodewords: 7, blocks: 1 },
  { version: 2, dataCodewords: 34, ecCodewords: 10, blocks: 1 },
  { version: 3, dataCodewords: 55, ecCodewords: 15, blocks: 1 },
  { version: 4, dataCodewords: 80, ecCodewords: 20, blocks: 1 },
  { version: 5, dataCodewords: 108, ecCodewords: 26, blocks: 1 },
  { version: 6, dataCodewords: 136, ecCodewords: 18, blocks: 2 },
  { version: 7, dataCodewords: 156, ecCodewords: 20, blocks: 2 },
  { version: 8, dataCodewords: 194, ecCodewords: 24, blocks: 2 },
  { version: 9, dataCodewords: 232, ecCodewords: 30, blocks: 2 },
]

const alignmentPositions: Record<number, number[]> = {
  1: [],
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
}

const presets: Array<{ key: QrPreset; label: string; value: string }> = [
  { key: "url", label: "URL", value: SITE_URL },
  { key: "text", label: "Text", value: `Hello from ${SITE_NAME}` },
  { key: "email", label: "Email", value: "mailto:hello@example.com?subject=Hello" },
  { key: "phone", label: "Phone", value: "tel:+15551234567" },
  { key: "wifi", label: "Wi-Fi", value: "WIFI:T:WPA;S:NetworkName;P:password123;;" },
]

const encoder = new TextEncoder()

export default function QrCodeGeneratorPage() {
  const [content, setContent] = useState(SITE_URL)
  const [foreground, setForeground] = useState("#212529")
  const [background, setBackground] = useState("#ffffff")
  const [quietZone, setQuietZone] = useState("4")
  const [moduleSize, setModuleSize] = useState("10")
  const [message, setMessage] = useState("Enter content to generate a scannable QR code.")

  const qrResult = useMemo(() => {
    try {
      const qr = createQrCode(content)
      return { qr, error: "" }
    } catch (error) {
      return {
        qr: null,
        error: error instanceof Error ? error.message : "Could not create QR code.",
      }
    }
  }, [content])

  const safeQuietZone = clampInteger(quietZone, 0, 10, 4)
  const safeModuleSize = clampInteger(moduleSize, 4, 24, 10)
  const svgMarkup = qrResult.qr
    ? renderQrSvg(qrResult.qr, foreground, background, safeQuietZone, safeModuleSize)
    : ""

  async function copySvg() {
    if (!svgMarkup) {
      setMessage(qrResult.error || "Add content before copying.")
      return
    }

    try {
      await copyToClipboard(svgMarkup)
      setMessage("SVG markup copied.")
    } catch {
      setMessage("Copy failed. Select the SVG markup and copy it manually.")
    }
  }

  function downloadSvg() {
    if (!svgMarkup) {
      setMessage(qrResult.error || "Add content before downloading.")
      return
    }

    downloadTextFile(svgMarkup, "qr-code.svg", "image/svg+xml;charset=utf-8")
    setMessage("QR SVG downloaded.")
  }

  function loadPreset(value: string) {
    setContent(value)
    setMessage("Preset loaded.")
  }

  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <ToolPanel>
          <ToolIntro eyebrow="Utility tool" title="QR Code Generator">
            Create a free, scannable QR code for links, text, email, phone numbers, or Wi-Fi credentials.
            QR codes make it easy to share information in business, education, retail, marketing, events, and everyday use without manual typing. This online QR code generator creates a static SVG locally in your browser, so you can preview, copy, or download it before sharing.
          </ToolIntro>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {presets.map((preset) => (
              <button
                key={preset.key}
                type="button"
                onClick={() => loadPreset(preset.value)}
                className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-3 py-2 text-xs font-semibold text-[var(--ink-800)] transition hover:bg-white"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <label htmlFor="qr-content" className="mt-6 block text-sm font-medium">
            Content
          </label>
          <textarea
            id="qr-content"
            value={content}
            onChange={(event) => {
              setContent(event.target.value)
              setMessage("Content updated.")
            }}
            rows={7}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder={SITE_URL}
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ColorField id="foreground" label="Foreground" value={foreground} onChange={setForeground} />
            <ColorField id="background" label="Background" value={background} onChange={setBackground} />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <NumberField id="quiet-zone" label="Quiet zone" value={quietZone} onChange={setQuietZone} />
            <NumberField id="module-size" label="Module size" value={moduleSize} onChange={setModuleSize} />
          </div>

          <div role="status" aria-live="polite">
            <InfoBox className="mt-6">
              {qrResult.error || message}
            </InfoBox>
          </div>
        </ToolPanel>

        <div className="space-y-6">
          <ToolPanel>
            <PanelHeader eyebrow="Output" title="QR Preview" badge={qrResult.qr ? `v${qrResult.qr.version} / ${qrResult.qr.size}x${qrResult.qr.size}` : "No code"} />

            <div className="mt-6 flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-6">
              {svgMarkup ? (
                <div
                  className="max-w-full overflow-auto rounded-[1rem] bg-white p-4"
                  dangerouslySetInnerHTML={{ __html: svgMarkup }}
                />
              ) : (
                <p className="text-center text-sm text-[var(--ink-700)]">
                  Add shorter content to generate a QR code.
                </p>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={copySvg}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Copy SVG
              </button>
              <button
                type="button"
                onClick={downloadSvg}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Download SVG
              </button>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Markup" title="SVG Source" />

            <textarea
              value={svgMarkup}
              readOnly
              rows={9}
              className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-xs leading-6 outline-none"
              aria-label="QR code SVG markup"
              placeholder="SVG markup will appear here..."
            />
          </ToolPanel>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
        <FormattedContentGuide />
      </section>
    </main>
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

      <ToolPanel>
        <PanelHeader eyebrow="Disclaimer" title="Usage Disclaimer" />
        <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
          This tool generates QR codes from user-provided data. You are responsible for verifying
          encoded information before sharing or printing. The tool does not validate the safety,
          accuracy, or availability of URLs or other embedded content. Test QR codes before public
          distribution. This tool is intended for informational, educational, and general-purpose use.
        </p>
      </ToolPanel>
    </>
  )
}

function ColorField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-2 flex overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] transition focus-within:border-[var(--accent-rust)]">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-14 border-0 bg-transparent p-2"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-sm outline-none"
        />
      </div>
    </label>
  )
}

function createQrCode(content: string) {
  const bytes = encoder.encode(content)

  if (bytes.length === 0) {
    throw new Error("Add content before generating.")
  }

  const config = qrConfigs.find((candidate) => getBitLength(bytes.length) <= candidate.dataCodewords * 8)
  if (!config) {
    throw new Error("Content is too long for this generator. Try 232 bytes or fewer.")
  }

  const dataCodewords = createDataCodewords(bytes, config)
  const finalCodewords = createFinalCodewords(dataCodewords, config)
  const best = Array.from({ length: 8 }, (_, mask) => buildMatrix(config.version, finalCodewords, mask))
    .sort((a, b) => getPenalty(a.modules) - getPenalty(b.modules))[0]

  return {
    version: config.version,
    size: best.modules.length,
    modules: best.modules,
  }
}

function getBitLength(byteLength: number) {
  return 4 + 8 + byteLength * 8
}

function createDataCodewords(bytes: Uint8Array, config: QrConfig) {
  const bits: number[] = []
  appendBits(bits, 0b0100, 4)
  appendBits(bits, bytes.length, 8)
  bytes.forEach((byte) => appendBits(bits, byte, 8))

  const capacityBits = config.dataCodewords * 8
  appendBits(bits, 0, Math.min(4, capacityBits - bits.length))

  while (bits.length % 8 !== 0) {
    bits.push(0)
  }

  const codewords: number[] = []
  for (let index = 0; index < bits.length; index += 8) {
    codewords.push(bits.slice(index, index + 8).reduce((value, bit) => (value << 1) | bit, 0))
  }

  for (let index = 0; codewords.length < config.dataCodewords; index += 1) {
    codewords.push(index % 2 === 0 ? 0xec : 0x11)
  }

  return codewords
}

function createFinalCodewords(dataCodewords: number[], config: QrConfig) {
  const dataPerBlock = config.dataCodewords / config.blocks
  const blocks = Array.from({ length: config.blocks }, (_, blockIndex) => {
    const data = dataCodewords.slice(blockIndex * dataPerBlock, (blockIndex + 1) * dataPerBlock)
    return { data, ec: createErrorCorrection(data, config.ecCodewords) }
  })

  const finalCodewords: number[] = []

  for (let index = 0; index < dataPerBlock; index += 1) {
    blocks.forEach((block) => finalCodewords.push(block.data[index]))
  }

  for (let index = 0; index < config.ecCodewords; index += 1) {
    blocks.forEach((block) => finalCodewords.push(block.ec[index]))
  }

  return finalCodewords
}

function buildMatrix(version: number, codewords: number[], mask: number) {
  const size = 21 + (version - 1) * 4
  const modules = createMatrix<boolean | null>(size, null)
  const reserved = createMatrix(size, false)

  placeFinder(modules, reserved, 0, 0)
  placeFinder(modules, reserved, size - 7, 0)
  placeFinder(modules, reserved, 0, size - 7)
  placeTiming(modules, reserved)
  placeAlignment(modules, reserved, version)
  placeDarkModule(modules, reserved, version)
  reserveFormatAreas(reserved)
  placeData(modules, reserved, codewords, mask)
  applyFormatInfo(modules, reserved, mask)

  return { modules: modules.map((row) => row.map(Boolean)) }
}

function createMatrix<T>(size: number, value: T) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => value))
}

function placeFinder(modules: Array<Array<boolean | null>>, reserved: boolean[][], x: number, y: number) {
  const size = modules.length

  for (let row = -1; row <= 7; row += 1) {
    for (let col = -1; col <= 7; col += 1) {
      const xx = x + col
      const yy = y + row

      if (xx < 0 || yy < 0 || xx >= size || yy >= size) {
        continue
      }

      const inPattern = row >= 0 && row <= 6 && col >= 0 && col <= 6
      const dark = inPattern && (row === 0 || row === 6 || col === 0 || col === 6 || (row >= 2 && row <= 4 && col >= 2 && col <= 4))
      modules[yy][xx] = dark
      reserved[yy][xx] = true
    }
  }
}

function placeTiming(modules: Array<Array<boolean | null>>, reserved: boolean[][]) {
  const size = modules.length

  for (let index = 8; index < size - 8; index += 1) {
    const dark = index % 2 === 0
    modules[6][index] = dark
    modules[index][6] = dark
    reserved[6][index] = true
    reserved[index][6] = true
  }
}

function placeAlignment(modules: Array<Array<boolean | null>>, reserved: boolean[][], version: number) {
  const positions = alignmentPositions[version] ?? []

  positions.forEach((centerY) => {
    positions.forEach((centerX) => {
      if (reserved[centerY][centerX]) {
        return
      }

      for (let row = -2; row <= 2; row += 1) {
        for (let col = -2; col <= 2; col += 1) {
          const distance = Math.max(Math.abs(row), Math.abs(col))
          modules[centerY + row][centerX + col] = distance !== 1
          reserved[centerY + row][centerX + col] = true
        }
      }
    })
  })
}

function placeDarkModule(modules: Array<Array<boolean | null>>, reserved: boolean[][], version: number) {
  const row = 4 * version + 9
  modules[row][8] = true
  reserved[row][8] = true
}

function reserveFormatAreas(reserved: boolean[][]) {
  const size = reserved.length

  for (let index = 0; index <= 8; index += 1) {
    reserved[8][index] = true
    reserved[index][8] = true
    reserved[8][size - 1 - index] = true
    reserved[size - 1 - index][8] = true
  }
}

function placeData(
  modules: Array<Array<boolean | null>>,
  reserved: boolean[][],
  codewords: number[],
  mask: number,
) {
  const bits = codewords.flatMap((codeword) =>
    Array.from({ length: 8 }, (_, index) => (codeword >> (7 - index)) & 1),
  )
  const size = modules.length
  let bitIndex = 0
  let direction = -1

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) {
      right -= 1
    }

    for (let vertical = 0; vertical < size; vertical += 1) {
      const row = direction === -1 ? size - 1 - vertical : vertical

      for (let colOffset = 0; colOffset < 2; colOffset += 1) {
        const col = right - colOffset

        if (reserved[row][col]) {
          continue
        }

        const bit = bitIndex < bits.length ? bits[bitIndex] === 1 : false
        modules[row][col] = bit !== getMask(mask, row, col)
        bitIndex += 1
      }
    }

    direction *= -1
  }
}

function applyFormatInfo(modules: Array<Array<boolean | null>>, reserved: boolean[][], mask: number) {
  const size = modules.length
  const bits = getFormatBits(mask)
  const first = [
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 7],
    [8, 8],
    [7, 8],
    [5, 8],
    [4, 8],
    [3, 8],
    [2, 8],
    [1, 8],
    [0, 8],
  ]
  const second = [
    [size - 1, 8],
    [size - 2, 8],
    [size - 3, 8],
    [size - 4, 8],
    [size - 5, 8],
    [size - 6, 8],
    [size - 7, 8],
    [8, size - 8],
    [8, size - 7],
    [8, size - 6],
    [8, size - 5],
    [8, size - 4],
    [8, size - 3],
    [8, size - 2],
    [8, size - 1],
  ]

  first.forEach(([row, col], index) => {
    modules[row][col] = ((bits >> index) & 1) === 1
    reserved[row][col] = true
  })
  second.forEach(([row, col], index) => {
    modules[row][col] = ((bits >> index) & 1) === 1
    reserved[row][col] = true
  })
}

function getFormatBits(mask: number) {
  const data = (0b01 << 3) | mask
  let bits = data << 10

  for (let index = 14; index >= 10; index -= 1) {
    if (((bits >> index) & 1) === 1) {
      bits ^= 0x537 << (index - 10)
    }
  }

  return ((data << 10) | bits) ^ 0x5412
}

function getMask(mask: number, row: number, col: number) {
  switch (mask) {
    case 0:
      return (row + col) % 2 === 0
    case 1:
      return row % 2 === 0
    case 2:
      return col % 3 === 0
    case 3:
      return (row + col) % 3 === 0
    case 4:
      return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0
    case 5:
      return ((row * col) % 2) + ((row * col) % 3) === 0
    case 6:
      return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0
    default:
      return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0
  }
}

function getPenalty(modules: boolean[][]) {
  const size = modules.length
  let penalty = 0

  for (let row = 0; row < size; row += 1) {
    penalty += getRunPenalty(modules[row])
  }

  for (let col = 0; col < size; col += 1) {
    penalty += getRunPenalty(modules.map((row) => row[col]))
  }

  for (let row = 0; row < size - 1; row += 1) {
    for (let col = 0; col < size - 1; col += 1) {
      const color = modules[row][col]
      if (modules[row][col + 1] === color && modules[row + 1][col] === color && modules[row + 1][col + 1] === color) {
        penalty += 3
      }
    }
  }

  const darkCount = modules.flat().filter(Boolean).length
  const percent = (darkCount * 100) / (size * size)
  penalty += Math.floor(Math.abs(percent - 50) / 5) * 10

  return penalty
}

function getRunPenalty(values: boolean[]) {
  let penalty = 0
  let runColor = values[0]
  let runLength = 1

  for (let index = 1; index <= values.length; index += 1) {
    if (values[index] === runColor) {
      runLength += 1
    } else {
      if (runLength >= 5) {
        penalty += 3 + (runLength - 5)
      }
      runColor = values[index]
      runLength = 1
    }
  }

  return penalty
}

function createErrorCorrection(data: number[], degree: number) {
  const generator = createGenerator(degree)
  const result = [...data, ...Array.from({ length: degree }, () => 0)]

  data.forEach((_, index) => {
    const factor = result[index]
    if (factor === 0) {
      return
    }

    generator.forEach((coefficient, generatorIndex) => {
      result[index + generatorIndex] ^= gfMultiply(coefficient, factor)
    })
  })

  return result.slice(result.length - degree)
}

function createGenerator(degree: number) {
  let result = [1]

  for (let index = 0; index < degree; index += 1) {
    result = multiplyPolynomials(result, [1, gfPow(index)])
  }

  return result
}

function multiplyPolynomials(left: number[], right: number[]) {
  const result = Array.from({ length: left.length + right.length - 1 }, () => 0)

  left.forEach((leftValue, leftIndex) => {
    right.forEach((rightValue, rightIndex) => {
      result[leftIndex + rightIndex] ^= gfMultiply(leftValue, rightValue)
    })
  })

  return result
}

function gfPow(power: number) {
  let value = 1

  for (let index = 0; index < power; index += 1) {
    value = gfMultiply(value, 2)
  }

  return value
}

function gfMultiply(left: number, right: number) {
  let result = 0
  let a = left
  let b = right

  while (b > 0) {
    if ((b & 1) !== 0) {
      result ^= a
    }
    a <<= 1
    if ((a & 0x100) !== 0) {
      a ^= 0x11d
    }
    b >>= 1
  }

  return result
}

function appendBits(bits: number[], value: number, length: number) {
  for (let index = length - 1; index >= 0; index -= 1) {
    bits.push((value >> index) & 1)
  }
}

function renderQrSvg(qr: { modules: boolean[][]; size: number }, foreground: string, background: string, quietZone: number, moduleSize: number) {
  const totalModules = qr.size + quietZone * 2
  const pixelSize = totalModules * moduleSize
  const rects = qr.modules
    .flatMap((row, y) =>
      row.map((dark, x) =>
        dark
          ? `<rect x="${(x + quietZone) * moduleSize}" y="${(y + quietZone) * moduleSize}" width="${moduleSize}" height="${moduleSize}" />`
          : "",
      ),
    )
    .filter(Boolean)
    .join("")

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${pixelSize}" height="${pixelSize}" viewBox="0 0 ${pixelSize} ${pixelSize}" role="img" aria-label="QR code"><rect width="100%" height="100%" fill="${escapeAttribute(background)}" /><g fill="${escapeAttribute(foreground)}">${rects}</g></svg>`
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
}

function clampInteger(value: string, min: number, max: number, fallback: number) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return fallback
  }

  return Math.min(Math.max(Math.floor(numericValue), min), max)
}
