import { useId } from "react";
import { cn } from "@/lib/cn";

const control =
  "block w-full rounded-md border bg-white px-3.5 text-base text-brand-900 shadow-[inset_0_1px_2px_rgb(15_45_74/0.04)] transition-colors placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-3 focus:ring-brand-200/60 aria-invalid:border-danger-500 aria-invalid:ring-danger-100";

type FieldShellProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (ids: { id: string; describedBy?: string }) => React.ReactNode;
  className?: string;
};

function FieldShell({ label, hint, error, required, children, className }: FieldShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-brand-900">
          {label}
          {required && <span className="text-danger-600"> *</span>}
        </label>
        {hint && (
          <span id={hintId} className="text-xs text-gray-500">
            {hint}
          </span>
        )}
      </div>
      {children({ id, describedBy })}
      {error && (
        <p id={errId} className="mt-1.5 text-sm text-danger-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = React.ComponentProps<"input"> & { label: string; hint?: string; error?: string; prefix?: string };

export function Input({ label, hint, error, required, prefix, className, ...props }: InputProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy }) =>
        prefix ? (
          <div className="flex">
            <span className="inline-flex h-12 items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-base text-gray-600">
              {prefix}
            </span>
            <input
              id={id}
              aria-describedby={describedBy}
              aria-invalid={!!error || undefined}
              aria-required={required || undefined}
              className={cn(control, "h-12 rounded-l-none border-gray-300")}
              {...props}
            />
          </div>
        ) : (
          <input
            id={id}
            aria-describedby={describedBy}
            aria-invalid={!!error || undefined}
            aria-required={required || undefined}
            className={cn(control, "h-12 border-gray-300")}
            {...props}
          />
        )
      }
    </FieldShell>
  );
}

type SelectProps = React.ComponentProps<"select"> & {
  label: string;
  hint?: string;
  error?: string;
  options: readonly string[];
  placeholder?: string;
};

export function Select({ label, hint, error, required, options, placeholder, className, ...props }: SelectProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy }) => (
        <select
          id={id}
          aria-describedby={describedBy}
          aria-invalid={!!error || undefined}
          aria-required={required || undefined}
          className={cn(
            control,
            "h-12 appearance-none border-gray-300 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20fill=%22none%22%20stroke=%22%236b7280%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m4%206%204%204%204-4%22/%3E%3C/svg%3E')] bg-[position:right_0.9rem_center] bg-no-repeat pr-10",
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

type TextareaProps = React.ComponentProps<"textarea"> & { label: string; hint?: string; error?: string };

export function Textarea({ label, hint, error, required, className, ...props }: TextareaProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy }) => (
        <textarea
          id={id}
          rows={3}
          aria-describedby={describedBy}
          aria-invalid={!!error || undefined}
          className={cn(control, "border-gray-300 py-3")}
          {...props}
        />
      )}
    </FieldShell>
  );
}
