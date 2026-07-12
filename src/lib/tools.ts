export type Tool = {
  title: string
  href: string
  category: string
  description: string
}

export const tools: Tool[] = [
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
    title: "SVG Optimizer / Viewer",
    href: "/svg-optimizer",
    category: "Design",
    description: "Optimize SVG markup, preview it, and copy compact SVG or data URI output.",
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
    title: "Creatinine Clearance Calculator",
    href: "/creatinine-clearance-calculator",
    category: "Health",
    description: "Estimate adult creatinine clearance with the Cockcroft-Gault equation.",
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

export const toolCategories = Array.from(new Set(tools.map((tool) => tool.category)))

export const toolsByCategory = toolCategories.map((category) => ({
  category,
  tools: tools.filter((tool) => tool.category === category),
}))
