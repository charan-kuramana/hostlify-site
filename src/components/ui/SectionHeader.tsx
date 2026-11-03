import { m } from "motion/react";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  theme?: "light" | "dark";
  as?: "h1" | "h2";
  /** false = render statically (use for headers visible on first paint, so they don't wait for JS) */
  reveal?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  theme = "light",
  as: Heading = "h2",
  reveal = true,
  className,
}: SectionHeaderProps) {
  const dark = theme === "dark";
  return (
    <m.div
      variants={stagger(0.08)}
      initial={reveal ? "hidden" : false}
      whileInView="show"
      viewport={viewport}
      className={cn("mb-14 max-w-[720px] md:mb-16", align === "center" ? "mx-auto text-center" : "text-left", className)}
    >
      {eyebrow && (
        <m.div variants={fadeUp}>
          <Eyebrow theme={theme}>{eyebrow}</Eyebrow>
        </m.div>
      )}
      <m.div variants={fadeUp}>
        <Heading className={cn("mt-3 font-bold", Heading === "h1" ? "text-h1" : "text-h2", dark && "text-white")}>{title}</Heading>
      </m.div>
      {lead && (
        <m.p
          variants={fadeUp}
          className={cn("mt-4 text-lead", align === "center" && "mx-auto", "max-w-[65ch]", dark ? "text-brand-100/75" : "text-gray-600")}
        >
          {lead}
        </m.p>
      )}
    </m.div>
  );
}
