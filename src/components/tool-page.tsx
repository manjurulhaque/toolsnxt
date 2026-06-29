import type { ReactNode } from "react"

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

type ToolIntroProps = {
  eyebrow: string
  title: string
  children: ReactNode
}

export function ToolIntro({ eyebrow, title, children }: ToolIntroProps) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
        {eyebrow}
      </p>
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
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
        {eyebrow}
      </p>
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
  className = "",
}: {
  label: string
  value: ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 ${className}`}>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}

type ActionButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "accent"
  className?: string
  disabled?: boolean
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: ActionButtonProps) {
  const classes = {
    primary: "bg-[var(--ink-900)] text-white hover:bg-[var(--ink-800)]",
    secondary:
      "border border-[var(--ink-900)]/10 bg-white text-[var(--ink-800)] hover:border-[var(--ink-900)]/25",
    accent: "bg-[var(--accent-gold)] text-[var(--ink-900)] hover:bg-[var(--accent-sand)]",
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${classes[variant]} ${className}`}
    >
      {children}
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
