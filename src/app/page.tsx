import Link from "next/link"

const tools = [
  {
    title: "Image to PDF",
    href: "/image-to-pdf",
    category: "Image",
    description: "Combine images into a downloadable PDF in your browser.",
  },
  {
    title: "PDF Merge",
    href: "/pdf-merge",
    category: "PDF",
    description: "Combine multiple PDF files into one downloadable document locally.",
  },
  {
    title: "PDF Split",
    href: "/pdf-split",
    category: "PDF",
    description: "Extract page ranges or split one PDF into separate page files locally.",
  },
  {
    title: "PDF Compress",
    href: "/pdf-compress",
    category: "PDF",
    description: "Optimize PDF structure and download a smaller local copy when possible.",
  },
  {
    title: "PDF to Images",
    href: "/pdf-to-images",
    category: "PDF",
    description: "Render PDF pages as downloadable PNG or JPEG images locally.",
  },
  {
    title: "Image Converter",
    href: "/image-converter",
    category: "Image",
    description: "Convert images to PNG, JPG, or WebP with quality and resize controls.",
  },
  {
    title: "Image Resizer",
    href: "/image-resizer",
    category: "Image",
    description: "Resize images with aspect-ratio, crop, fit, quality, and format controls.",
  },
  {
    title: "Image to Favicon",
    href: "/image-to-favicon",
    category: "Image",
    description: "Generate favicon.ico and app icon PNG sizes from a logo or image.",
  },
  {
    title: "Image to ASCII",
    href: "/image-to-ascii-art",
    category: "Image",
    description: "Turn images into copyable ASCII text art with tone and contrast controls.",
  },
  {
    title: "QR Code Generator",
    href: "/qr-code-generator",
    category: "Utility",
    description: "Create scannable SVG QR codes for links, text, email, phone, or Wi-Fi.",
  },
  {
    title: "Barcode Generator",
    href: "/barcode-generator",
    category: "Utility",
    description: "Create Code 128 SVG barcodes for product IDs, URLs, assets, and tickets.",
  },
  {
    title: "Gradient Generator",
    href: "/gradient-generator",
    category: "Design",
    description: "Build linear, radial, and conic CSS gradients with editable color stops.",
  },
  {
    title: "Color Converter",
    href: "/color-converter",
    category: "Design",
    description: "Convert HEX colors into RGB, HSL, alpha formats, and CSS variables.",
  },
  {
    title: "Password Generator",
    href: "/password-generator",
    category: "Security",
    description: "Generate strong passwords or memorable passphrases locally.",
  },
  {
    title: "Hash Generator",
    href: "/hash-generator",
    category: "Security",
    description: "Generate MD5 and SHA hashes from text or file contents locally.",
  },
  {
    title: "JSON Formatter",
    href: "/json-formatter",
    category: "Developer",
    description: "Validate, pretty-print, minify, and sort JSON locally in your browser.",
  },
  {
    title: "YAML JSON Converter",
    href: "/yaml-json-converter",
    category: "Developer",
    description: "Convert YAML to JSON or JSON to YAML with formatting controls.",
  },
  {
    title: "HTML CSS JS Minifier",
    href: "/html-css-js-minifier",
    category: "Developer",
    description: "Minify HTML, CSS, or JavaScript locally with copy and download actions.",
  },
  {
    title: "CSV to JSON",
    href: "/csv-to-json",
    category: "Developer",
    description: "Convert pasted CSV into JSON objects or row arrays with copy and download.",
  },
  {
    title: "Regex Tester",
    href: "/regex-tester",
    category: "Developer",
    description: "Test JavaScript regular expressions with flags, highlights, and capture groups.",
  },
  {
    title: "URL Encoder / Decoder",
    href: "/url-encoder-decoder",
    category: "Developer",
    description: "Encode and decode URLs, query components, Base64 text, and query parameters.",
  },
  {
    title: "Base64 Encoder / Decoder",
    href: "/base64-encoder-decoder",
    category: "Developer",
    description: "Encode text, decode Base64, or convert files into Base64 data locally.",
  },
  {
    title: "JWT Decoder",
    href: "/jwt-decoder",
    category: "Developer",
    description: "Decode JWT headers and payloads locally with common claim summaries.",
  },
  {
    title: "UUID Generator",
    href: "/uuid-generator",
    category: "Developer",
    description: "Generate single or bulk UUID v4 values with formatting and export options.",
  },
  {
    title: "JSON to TypeScript",
    href: "/json-to-typescript",
    category: "Developer",
    description: "Infer TypeScript interfaces or type aliases from pasted JSON.",
  },
  {
    title: "Cron Expression Builder",
    href: "/cron-expression-builder",
    category: "Developer",
    description: "Build five-field cron expressions with readable summaries and run previews.",
  },
  {
    title: "Markdown Previewer",
    href: "/markdown-previewer",
    category: "Text",
    description: "Write Markdown, preview formatted HTML, and copy the source or rendered markup.",
  },
  {
    title: "Text Diff Checker",
    href: "/text-diff-checker",
    category: "Text",
    description: "Compare two text blocks with added, removed, and changed line highlights.",
  },
  {
    title: "Lorem Ipsum Generator",
    href: "/lorem-ipsum-generator",
    category: "Text",
    description: "Generate placeholder words, sentences, or paragraphs with copy and download.",
  },
  {
    title: "Word / Character Counter",
    href: "/word-character-counter",
    category: "Text",
    description: "Count words, characters, lines, reading time, and keyword density.",
  },
  {
    title: "Typing Speed Test",
    href: "/typing-speed-test",
    category: "Text",
    description: "Measure WPM, accuracy, mistakes, and progress with timed typing passages.",
  },
  {
    title: "Scientific Calculator",
    href: "/scientific-calculator",
    category: "Math",
    description: "Evaluate scientific expressions with trig, logs, powers, memory, and history.",
  },
  {
    title: "Percentage Calculator",
    href: "/percentage-calculator",
    category: "Math",
    description: "Calculate percentages, percent change, ratios, and increase or decrease values.",
  },
  {
    title: "Loan Calculator",
    href: "/loan-calculator",
    category: "Finance",
    description: "Estimate payments, total interest, payoff time, and extra-payment savings.",
  },
  {
    title: "Unit Converter",
    href: "/unit-converter",
    category: "Math",
    description: "Convert common length, weight, temperature, and volume units.",
  },
  {
    title: "Timezone Converter",
    href: "/timezone-converter",
    category: "Time",
    description: "Compare times across major cities and time zones.",
  },
  {
    title: "Age Calculator",
    href: "/age-calculator",
    category: "Date",
    description: "Calculate exact age and next birthday timing from a date of birth.",
  },
  {
    title: "BMI Calculator",
    href: "/bmi-calculator",
    category: "Health",
    description: "Estimate adult BMI from metric or U.S. height and weight inputs.",
  },
  {
    title: "Body Weight Calculator",
    href: "/body-weight-calculator",
    category: "Health",
    description: "Estimate adult ideal body weight from height using common formulas.",
  },
  {
    title: "Case Converter",
    href: "/case-converter",
    category: "Text",
    description: "Convert text into sentence, title, camel, pascal, snake, and kebab case.",
  },
  {
    title: "HTML to Markdown",
    href: "/html-to-markdown",
    category: "Text",
    description: "Convert pasted HTML into clean Markdown with links, lists, code, and tables.",
  },
  {
    title: "XML Sitemap Generator",
    href: "/xml-sitemap-generator",
    category: "SEO",
    description: "Build a sitemap.xml file from URLs or paths with metadata options.",
  },
  {
    title: "Meta Tag Generator",
    href: "/meta-tag-generator",
    category: "SEO",
    description: "Generate SEO, Open Graph, Twitter card, canonical, and robots tags.",
  },
  {
    title: "Robots.txt Generator",
    href: "/robots-txt-generator",
    category: "SEO",
    description: "Build robots.txt rules with allow, disallow, sitemap, host, and crawl delay.",
  },
  {
    title: "Screen Reader Simulator",
    href: "/screen-reader-simulator",
    category: "Accessibility",
    description: "Preview simplified reading order and announcements from pasted HTML.",
  },
  {
    title: "Countdown Timer",
    href: "/countdown-timer",
    category: "Time",
    description: "Create a focused countdown for a date, event, or deadline.",
  },
  {
    title: "Stopwatch",
    href: "/stopwatch",
    category: "Time",
    description: "Track elapsed time with lap splits for practice, workouts, and focused tasks.",
  },
  {
    title: "Interval Timer",
    href: "/interval-timer",
    category: "Time",
    description: "Alternate work and rest rounds for HIIT, drills, routines, and focus blocks.",
  },
  {
    title: "Sleep Calculator",
    href: "/sleep-time-calculator",
    category: "Health",
    description: "Plan bedtimes or wake times around 90-minute sleep cycles.",
  },
  {
    title: "Pomodoro Timer",
    href: "/pomodoro-timer",
    category: "Focus",
    description: "Run work and break sessions with a simple Pomodoro timer.",
  },
]

const categories = Array.from(new Set(tools.map((tool) => tool.category)))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      <header className="border-b border-[var(--ink-900)]/10 bg-[var(--page-cream)]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ink-900)] text-sm font-semibold text-[var(--page-cream)]">
              WT
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold uppercase tracking-[0.18em]">
                Web Tools
              </span>
              <span className="block truncate text-xs text-[var(--ink-700)]">
                Fast browser utilities
              </span>
            </span>
          </Link>

        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Tool directory
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
                Browser tools for everyday work.
              </h1>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-700)] sm:text-base">
                Pick a utility below. Most tools process files and text locally in your browser, so
                quick jobs stay quick.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-80">
              <Stat label="Tools" value={tools.length} />
              <Stat label="Groups" value={categories.length} />
              <Stat label="Local" value="Most" />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                All tools
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Choose a Tool</h2>
            </div>
            <p className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-sm text-[var(--ink-700)]">
              {tools.length} available
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-white p-5 shadow-[0_14px_36px_rgba(33,37,41,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-rust)]/30 hover:shadow-[0_24px_48px_rgba(33,37,41,0.12)]"
              >
                <div className="flex min-h-full flex-col">
                  <span className="w-fit rounded-full bg-[var(--page-cream)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-rust)]">
                    {tool.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--ink-900)]">{tool.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[var(--ink-700)]/78">
                    {tool.description}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-[var(--ink-900)] transition group-hover:text-[var(--accent-rust)]">
                    Open tool
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--ink-900)]/10 bg-white/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 sm:px-8 lg:px-12">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-900)]">
            Web Tools
          </Link>
          <p className="max-w-md text-sm leading-6 text-[var(--ink-700)]">
            A compact set of practical calculators, converters, and generators.
          </p>
        </div>
      </footer>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}
