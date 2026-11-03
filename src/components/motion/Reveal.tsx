import { m, type HTMLMotionProps } from "motion/react";
import { fadeUp, viewport } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; once?: boolean };

/** Fade-up on scroll. Reduced motion is handled globally by MotionConfig. */
export function Reveal({ delay = 0, once = true, children, ...props }: RevealProps) {
  return (
    <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ ...viewport, once }} transition={{ delay }} {...props}>
      {children}
    </m.div>
  );
}
