import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import { leadForm } from "@/content/pages";
import { whatsappHref } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { leadSchema, submitLead, type Lead, type LeadInput, type LeadSource } from "@/lib/leads";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { PathCheck } from "@/components/motion/PathCheck";

type LeadFormProps = {
  source: LeadSource;
  /** compact = name, phone, hostel, city, beds only (landing-page hero) */
  variant?: "full" | "compact" | "contact";
  className?: string;
};

type Status = "idle" | "success" | "mailto" | "error";

export function LeadForm({ source, variant = "full", className }: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);
  const wa = whatsappHref();
  const f = leadForm.fields;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", email: "", hostel: "", city: "", beds: "", hostels: "", collect: "", message: "", company: "" },
    mode: "onTouched",
  });

  const onSubmit = async (data: Lead) => {
    try {
      const result = await submitLead(data, source);
      track("demo_form_submit", { source, delivery: result });
      if (result === "mailto") {
        // Not delivered yet — the visitor still has to press Send in their email app.
        setStatus("mailto");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const onFocus = () => {
    if (started) return;
    setStarted(true);
    track("demo_form_start", { source });
  };

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" || status === "mailto" ? (
          <m.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
          >
            <PathCheck drawn className="size-16 text-success-500" />
            <p className="mt-4 font-display text-h3 font-bold text-brand-900">
              {status === "mailto" ? leadForm.mailtoTitle : leadForm.successTitle}
            </p>
            <p className="mt-2 max-w-sm">{status === "mailto" ? leadForm.mailtoBody : leadForm.successBody}</p>
            {status === "mailto" && wa && (
              <Button
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="mt-6"
                leftIcon={<MessageCircle aria-hidden="true" />}
                onClick={() => track("whatsapp_click", { location: "lead_form_fallback" })}
              >
                {leadForm.whatsappCta}
              </Button>
            )}
          </m.div>
        ) : (
          <m.form
            key="form"
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            onFocus={onFocus}
            noValidate
            className="grid gap-4 sm:grid-cols-2"
          >
            <Input
              label={f.name.label}
              placeholder={f.name.placeholder}
              autoComplete="name"
              required
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label={f.phone.label}
              placeholder={f.phone.placeholder}
              prefix="+91"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              error={errors.phone?.message}
              {...register("phone")}
            />
            {variant !== "compact" && (
              <Input
                label={f.email.label}
                hint={f.email.hint}
                placeholder={f.email.placeholder}
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
                className="sm:col-span-2"
              />
            )}
            <Input
              label={f.hostel.label}
              placeholder={f.hostel.placeholder}
              autoComplete="organization"
              required
              error={errors.hostel?.message}
              {...register("hostel")}
            />
            <Input
              label={f.city.label}
              placeholder={f.city.placeholder}
              autoComplete="address-level2"
              required
              error={errors.city?.message}
              {...register("city")}
            />
            <Select
              label={f.beds.label}
              placeholder={f.beds.placeholder}
              options={leadForm.bedOptions}
              required
              error={errors.beds?.message}
              {...register("beds")}
              className={variant === "full" ? "" : "sm:col-span-2"}
            />
            {variant === "full" && (
              <>
                <Input
                  label={f.hostels.label}
                  placeholder={f.hostels.placeholder}
                  type="number"
                  min={1}
                  inputMode="numeric"
                  {...register("hostels")}
                />
                <Input
                  label={f.collect.label}
                  hint={f.collect.hint}
                  placeholder={f.collect.placeholder}
                  {...register("collect")}
                  className="sm:col-span-2"
                />
              </>
            )}
            {variant === "contact" && (
              <Textarea
                label={f.message.label}
                hint={f.message.hint}
                placeholder={f.message.placeholder}
                {...register("message")}
                className="sm:col-span-2"
              />
            )}
            {/* honeypot */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Company
                <input tabIndex={-1} autoComplete="off" {...register("company")} />
              </label>
            </div>
            <div className="sm:col-span-2">
              {status === "error" && (
                <div className="mb-4 rounded-lg border border-danger-100 bg-danger-100/50 p-3 text-sm text-danger-600" role="alert">
                  <strong>{leadForm.errorTitle}</strong> {leadForm.errorBody}
                </div>
              )}
              <Button type="submit" size="lg" block loading={isSubmitting} arrow={!isSubmitting}>
                {isSubmitting
                  ? leadForm.submitting
                  : status === "error"
                    ? leadForm.retry
                    : variant === "contact"
                      ? leadForm.submitContact
                      : leadForm.submit}
              </Button>
              <p className="mt-3 text-center text-xs text-gray-500">{leadForm.privacy}</p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
