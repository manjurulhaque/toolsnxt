"use client"

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent, type ReactNode } from "react"
import { CheckIcon, MaximizeIcon, MinimizeIcon, UploadCloudIcon, XIcon } from "@/components/icons"

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
  onSubmit?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  readOnly?: boolean
  mono?: boolean
  hint?: string
  expandable?: boolean
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  onSubmit,
  onKeyDown,
  placeholder,
  rows = 12,
  readOnly = false,
  mono = true,
  hint,
  expandable,
}: TextAreaFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const canExpand = expandable ?? rows >= 8

  useEffect(() => {
    if (!isExpanded) return
    function handleGlobalKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setIsExpanded(false)
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [isExpanded])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (onSubmit && (event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault()
      onSubmit()
      return
    }
    onKeyDown?.(event)
  }

  return (
    <div className="block">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium cursor-pointer">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {onSubmit ? (
            <span className="rounded bg-[var(--ink-900)]/5 px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--ink-700)]/70">
              Ctrl + Enter to run
            </span>
          ) : hint ? (
            <span className="text-[11px] text-[var(--ink-700)]/60">{hint}</span>
          ) : null}
          {canExpand ? (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              title="Expand to Focus Mode"
              aria-label="Expand textarea to focus mode"
              className="rounded p-1 text-[var(--ink-700)]/60 hover:bg-[var(--ink-900)]/5 hover:text-[var(--ink-900)] transition"
            >
              <MaximizeIcon className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        onKeyDown={handleKeyDown}
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

      {isExpanded ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} Focus Mode`}
          className="fixed inset-0 z-50 flex flex-col bg-[var(--page-cream)]/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-[var(--ink-900)]/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-[var(--ink-900)]">{label}</span>
              <span className="text-xs text-[var(--ink-700)]/60 font-mono">
                {value.length.toLocaleString()} chars · {value.split("\n").length.toLocaleString()} lines
              </span>
            </div>
            <div className="flex items-center gap-2">
              {onSubmit ? (
                <button
                  type="button"
                  onClick={() => onSubmit()}
                  className="rounded-full bg-[var(--accent-rust)] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[var(--accent-rust)]/90 transition"
                >
                  Run (Ctrl+Enter)
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                title="Exit Focus Mode (Esc)"
                aria-label="Exit focus mode"
                className="flex items-center gap-1.5 rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink-800)] hover:bg-[var(--page-cream)] transition"
              >
                <MinimizeIcon className="h-3.5 w-3.5" />
                <span>Exit</span>
                <kbd className="font-mono text-[10px] text-[var(--ink-700)]/50">Esc</kbd>
              </button>
            </div>
          </div>
          <div className="mx-auto mt-4 flex flex-1 w-full max-w-6xl flex-col">
            <textarea
              autoFocus
              value={value}
              onChange={(event) => onChange?.(event.target.value)}
              onKeyDown={handleKeyDown}
              readOnly={readOnly}
              spellCheck={false}
              className={`w-full flex-1 resize-none rounded-2xl border border-[var(--ink-900)]/15 bg-white p-5 text-sm sm:text-base leading-relaxed outline-none shadow-xl focus:border-[var(--accent-rust)] ${
                mono ? "font-mono" : ""
              }`}
              placeholder={placeholder}
            />
          </div>
        </div>
      ) : null}
    </div>
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
  description?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  accept?: string
  multiple?: boolean
  selectedFileName?: string
  selectedFileSize?: string | number
  onClear?: () => void
  className?: string
  compact?: boolean
}

export function FilePicker({
  label,
  description = "Drag & drop file here or click to browse",
  onChange,
  accept,
  multiple = false,
  selectedFileName,
  selectedFileSize,
  onClear,
  className = "",
  compact = false,
}: FilePickerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDragOver(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  function handleDragLeave(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragging(false)
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && inputRef.current) {
      inputRef.current.files = e.dataTransfer.files
      const event = new Event("change", { bubbles: true })
      inputRef.current.dispatchEvent(event)
    }
  }

  const formattedSize =
    typeof selectedFileSize === "number"
      ? selectedFileSize < 1024
        ? `${selectedFileSize} B`
        : selectedFileSize < 1024 * 1024
        ? `${(selectedFileSize / 1024).toFixed(1)} KB`
        : `${(selectedFileSize / (1024 * 1024)).toFixed(1)} MB`
      : selectedFileSize

  return (
    <div className={`relative ${className}`}>
      <label
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border-2 border-dashed transition-all duration-200 select-none ${
          compact ? "px-4 py-4" : "px-5 py-7"
        } ${
          isDragging
            ? "border-[var(--accent-rust)] bg-[var(--accent-rust)]/10 scale-[1.01] shadow-lg shadow-[var(--accent-rust)]/10"
            : selectedFileName
            ? "border-emerald-600/30 bg-emerald-50/40 hover:border-emerald-600/50"
            : "border-[var(--ink-900)]/15 bg-[var(--page-cream)] hover:border-[var(--accent-rust)]/60 hover:bg-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={onChange}
        />

        {selectedFileName ? (
          <div className="flex w-full items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700">
                <CheckIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--ink-900)]">
                  {selectedFileName}
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--ink-700)]">
                  {formattedSize ? <span>{formattedSize}</span> : null}
                  <span className="text-[var(--accent-rust)] font-medium underline underline-offset-2">
                    Click or drop to replace
                  </span>
                </div>
              </div>
            </div>
            {onClear ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (inputRef.current) inputRef.current.value = ""
                  onClear()
                }}
                title="Remove file"
                aria-label="Remove selected file"
                className="shrink-0 rounded-full p-1.5 text-[var(--ink-700)]/60 hover:bg-[var(--ink-900)]/10 hover:text-[var(--ink-900)] transition"
              >
                <XIcon className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : (
          <>
            <div
              className={`mb-2.5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${
                isDragging
                  ? "bg-[var(--accent-rust)] text-white scale-110 animate-bounce"
                  : "bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] group-hover:scale-105 group-hover:bg-[var(--accent-rust)]/15"
              }`}
            >
              <UploadCloudIcon className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-[var(--ink-900)]">
              {isDragging ? "Drop file to upload" : label}
            </span>
            <span className="mt-1 text-xs text-[var(--ink-700)]/75">
              {isDragging ? "Release mouse button" : description}
            </span>
          </>
        )}
      </label>
    </div>
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
