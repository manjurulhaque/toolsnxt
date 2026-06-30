import type { ChangeEvent, ReactNode } from "react"

type NumberFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  min?: string
  max?: string
  prefix?: ReactNode
  suffix?: ReactNode
}

type TextFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  mono?: boolean
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  mono = false,
}: TextFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        spellCheck={!mono}
        className={`mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)] ${
          mono ? "font-mono" : ""
        }`}
      />
    </label>
  )
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  min = "0",
  max,
  prefix,
  suffix,
}: NumberFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-2 flex overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] transition focus-within:border-[var(--accent-rust)]">
        {prefix ? <FieldAffix side="left">{prefix}</FieldAffix> : null}
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-2xl font-semibold outline-none"
        />
        {suffix ? <FieldAffix side="right">{suffix}</FieldAffix> : null}
      </div>
    </label>
  )
}

type DateFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}

export function DateField({ id, label, value, onChange }: DateFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-lg font-semibold outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

type TextAreaFieldProps = {
  id: string
  label: string
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  rows?: number
  readOnly?: boolean
  mono?: boolean
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 12,
  readOnly = false,
  mono = true,
}: TextAreaFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={readOnly}
        rows={rows}
        spellCheck={false}
        className={`mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none ${
          mono ? "font-mono" : ""
        } ${
          readOnly ? "" : "transition focus:border-[var(--accent-rust)]"
        }`}
        placeholder={placeholder}
      />
    </label>
  )
}

type SegmentedControlProps<T extends string> = {
  label?: string
  value: T
  options: Array<{ key: T; label: string }>
  onChange: (value: T) => void
  columns?: string
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  columns = "grid-cols-2",
}: SegmentedControlProps<T>) {
  return (
    <div>
      {label ? <p className="mb-2 text-sm font-medium">{label}</p> : null}
      <div className={`grid ${columns} gap-2 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-1`}>
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
              value === option.key
                ? "bg-[var(--ink-900)] text-white"
                : "text-[var(--ink-700)] hover:bg-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

type FilePickerProps = {
  label: string
  description: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  accept?: string
}

export function FilePicker({ label, description, onChange, accept }: FilePickerProps) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-4 py-5 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
      <span className="text-sm font-semibold">{label}</span>
      <span className="mt-1 text-xs text-[var(--ink-700)]/75">{description}</span>
      <input type="file" accept={accept} className="sr-only" onChange={onChange} />
    </label>
  )
}

type SelectFieldProps<T extends string> = {
  id: string
  label: string
  value: T
  options: Array<{ value: T; label: string }>
  onChange: (value: T) => void
}

export function SelectField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: SelectFieldProps<T>) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[var(--accent-rust)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function FieldAffix({ children, side }: { children: ReactNode; side: "left" | "right" }) {
  const border = side === "left" ? "border-r" : "border-l"

  return (
    <span className={`flex items-center ${border} border-[var(--ink-900)]/10 px-4 text-sm font-semibold text-[var(--ink-700)]`}>
      {children}
    </span>
  )
}
