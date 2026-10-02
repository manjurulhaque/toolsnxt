import type { ReactNode } from "react"
import {
  CalculatorIcon,
  CategoryIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  RotateCcwIcon,
  SearchIcon,
  SparklesIcon,
  TrashIcon,
  UploadCloudIcon,
  WandIcon,
  ZapIcon,
} from "@/components/icons"

type ToolPageProps = {
  children: ReactNode
  columns?: "balanced" | "equal" | "wide-output"
  gridClassName?: string
}

export function ToolPage({ children, columns = "balanced", gridClassName }: ToolPageProps) {
  const gridColumns = {
    balanced: "lg:grid-cols-[0.9fr_1.1fr]",
    equal: "lg:grid-cols-2",
    "wide-output": "lg:grid-cols-[0.85fr_1.15fr]",
  }[columns]
  const columnsClassName = gridClassName ?? gridColumns

  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <section className={`mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 ${columnsClassName} lg:py-12`}>
        {children}
      </section>
    </main>
  )
}

export function ToolPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)] ${className}`}
    >
      {children}
    </div>
  )
}

function getCategoryFromEyebrow(eyebrow: string): string {
  const lower = eyebrow.toLowerCase()
  if (lower.includes("pdf")) return "pdf"
  if (lower.includes("image")) return "image"
  if (lower.includes("developer") || lower.includes("code")) return "developer"
  if (lower.includes("design") || lower.includes("color")) return "design"
  if (lower.includes("text")) return "text"
  if (lower.includes("math")) return "math"
  if (lower.includes("finance") || lower.includes("loan")) return "finance"
  if (lower.includes("health") || lower.includes("sleep") || lower.includes("medical")) return "health"
  if (
    lower.includes("time") ||
    lower.includes("timer") ||
    lower.includes("clock") ||
    lower.includes("stopwatch")
  ) {
    return "time"
  }
  if (lower.includes("date") || lower.includes("calendar")) return "date"
  if (lower.includes("seo") || lower.includes("sitemap") || lower.includes("robots")) return "seo"
  if (
    lower.includes("security") ||
    lower.includes("privacy") ||
    lower.includes("hash") ||
    lower.includes("password")
  ) {
    return "security"
  }
  if (lower.includes("accessibility") || lower.includes("reader")) return "accessibility"
  if (lower.includes("focus") || lower.includes("pomodoro") || lower.includes("speed")) return "focus"
  return "utility"
}

type ToolIntroProps = {
  eyebrow: string
  title: string
  children: ReactNode
}

export function ToolIntro({ eyebrow, title, children }: ToolIntroProps) {
  const category = getCategoryFromEyebrow(eyebrow)

  return (
    <>
      <div className="flex items-center gap-2">
        <CategoryIcon category={category} className="h-3.5 w-3.5 text-[var(--accent-rust)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
          {eyebrow}
        </p>
      </div>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">{children}</p>
    </>
  )
}

type PanelHeaderProps = {
  eyebrow: string
  title: string
  badge?: ReactNode
  badgeClassName?: string
  className?: string
  titleClassName?: string
}

export function PanelHeader({
  eyebrow,
  title,
  badge,
  badgeClassName = "",
  className = "",
  titleClassName = "",
}: PanelHeaderProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-3 ${className}`}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
          {eyebrow}
        </p>
        <h2 className={`mt-2 text-2xl font-semibold ${titleClassName}`}>{title}</h2>
      </div>
      {badge ? <StatusPill className={badgeClassName}>{badge}</StatusPill> : null}
    </div>
  )
}

export function HeroIntro({ eyebrow, title, children }: ToolIntroProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <SparklesIcon className="h-3.5 w-3.5 shrink-0 text-[var(--accent-rust)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
          {eyebrow}
        </p>
      </div>
      <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm leading-7 text-[var(--ink-700)] sm:text-base">{children}</p>
    </>
  )
}

export function PanelHeaderActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-3">{children}</div>
}

export function StatusPill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)] ${className}`}
    >
      {children}
    </p>
  )
}

export function InfoBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm leading-6 text-[var(--ink-700)] ${className}`}
    >
      {children}
    </div>
  )
}

export function SummaryTile({
  label,
  value,
  icon,
  className = "",
}: {
  label: string
  value: ReactNode
  icon?: ReactNode
  className?: string
}) {
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-3.5 sm:p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-1.5 min-w-0">
        <p
          className="min-w-0 truncate text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ink-700)]/75"
          title={typeof label === "string" ? label : undefined}
        >
          {label}
        </p>
        {icon ? (
          <span className="flex shrink-0 items-center justify-center text-[var(--accent-rust)]">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-2 truncate text-xl font-semibold tabular-nums sm:text-2xl">{value}</p>
    </div>
  )
}

type ActionButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "accent"
  className?: string
  disabled?: boolean
  icon?: ReactNode
}

function getAutoIcon(text: string) {
  const lower = text.toLowerCase()
  if (lower.includes("copy")) return <CopyIcon className="h-4 w-4 shrink-0" />
  if (lower.includes("download") || lower.includes("save") || lower.includes("export")) {
    return <DownloadIcon className="h-4 w-4 shrink-0" />
  }
  if (
    lower.includes("clear") ||
    lower.includes("delete") ||
    lower.includes("remove") ||
    lower.includes("erase")
  ) {
    return <TrashIcon className="h-4 w-4 shrink-0" />
  }
  if (lower.includes("sample") || lower.includes("example")) {
    return <SparklesIcon className="h-4 w-4 shrink-0" />
  }
  if (lower.includes("reset") || lower.includes("restart")) {
    return <RotateCcwIcon className="h-4 w-4 shrink-0" />
  }
  if (lower.includes("calculate") || lower.includes("compute")) {
    return <CalculatorIcon className="h-4 w-4 shrink-0" />
  }
  if (lower.includes("upload") || lower.includes("choose file")) {
    return <UploadCloudIcon className="h-4 w-4 shrink-0" />
  }
  if (lower.includes("search") || lower.includes("lookup")) {
    return <SearchIcon className="h-4 w-4 shrink-0" />
  }
  if (lower.includes("test") || lower.includes("verify") || lower.includes("check")) {
    return <CheckIcon className="h-4 w-4 shrink-0" />
  }
  if (lower.includes("run") || lower.includes("start") || lower.includes("play")) {
    return <ZapIcon className="h-4 w-4 shrink-0" />
  }
  if (
    lower.includes("generate") ||
    lower.includes("optimize") ||
    lower.includes("minify") ||
    lower.includes("convert") ||
    lower.includes("format") ||
    lower.includes("transform") ||
    lower.includes("process") ||
    lower.includes("compress") ||
    lower.includes("split") ||
    lower.includes("merge")
  ) {
    return <WandIcon className="h-4 w-4 shrink-0" />
  }
  return null
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  icon,
}: ActionButtonProps) {
  const classes = {
    primary: "bg-[var(--ink-900)] text-white hover:bg-[var(--ink-800)] shadow-xs",
    secondary:
      "border border-[var(--ink-900)]/10 bg-white text-[var(--ink-800)] hover:border-[var(--ink-900)]/25 hover:bg-[var(--page-cream)]/50 shadow-xs",
    accent: "bg-[var(--accent-gold)] text-[var(--ink-900)] hover:bg-[var(--accent-sand)] shadow-xs",
  }

  let renderIcon: ReactNode = icon
  if (renderIcon === undefined && typeof children === "string") {
    renderIcon = getAutoIcon(children)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${classes[variant]} ${className}`}
    >
      {renderIcon ? <span className="shrink-0">{renderIcon}</span> : null}
      <span>{children}</span>
    </button>
  )
}

export function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[var(--accent-rust)]"
      />
      {label}
    </label>
  )
}

export { EducationalDisclaimerCard } from "@/components/educational-disclaimer"
export { CategoryIcon } from "@/components/icons"
