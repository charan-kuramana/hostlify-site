import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-all duration-200 ease-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "sheen bg-gradient-primary text-white shadow-card hover:-translate-y-px hover:shadow-lift hover:brightness-105 focus-visible:outline-brand-500",
        secondary: "bg-brand-100 text-brand-700 hover:bg-brand-200",
        outline: "border border-gray-300 bg-white text-brand-900 hover:border-brand-400 hover:bg-brand-50",
        ghost: "text-brand-900 hover:bg-gray-100",
        accent: "sheen bg-accent-600 text-white shadow-card hover:-translate-y-px hover:bg-accent-500 hover:shadow-lift",
        white: "bg-white text-brand-700 shadow-glow hover:-translate-y-px focus-visible:outline-white",
        "outline-white": "border border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10 focus-visible:outline-white",
      },
      size: { sm: "h-9 px-3.5 text-sm", md: "h-11 px-5 text-[15px]", lg: "h-13 px-7 text-base" },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

type CommonProps = Variants & {
  leftIcon?: React.ReactNode;
  /** Shows a right arrow that slides on hover */
  arrow?: boolean;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps & Omit<React.ComponentProps<"button">, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps & Omit<React.ComponentProps<"a">, keyof CommonProps> & { href: string };

function Inner({
  leftIcon,
  rightIcon,
  arrow,
  loading,
  children,
}: Pick<CommonProps, "leftIcon" | "rightIcon" | "arrow" | "loading" | "children">) {
  return (
    <>
      {loading ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : leftIcon}
      <span>{children}</span>
      {rightIcon}
      {arrow && <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />}
    </>
  );
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant, size, block, leftIcon, rightIcon, arrow, loading, className, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size, block }), className);
  const inner = <Inner {...{ leftIcon, rightIcon, arrow, loading, children }} />;

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...anchor}>
          {inner}
        </a>
      );
    }
    return (
      <Link to={href} className={classes} {...anchor}>
        {inner}
      </Link>
    );
  }
  const { type = "button", disabled, ...button } = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...button}>
      {inner}
    </button>
  );
}
