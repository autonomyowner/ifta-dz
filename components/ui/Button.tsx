import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "white" | "glass";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-primary-bright to-primary text-white shadow-glow hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:-translate-y-0.5",
  ghost: "text-on-surface hover:bg-surface-container hover:text-primary",
  white: "bg-white text-ink shadow-lg hover:bg-white/90 hover:-translate-y-0.5",
  glass:
    "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-primary hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-7 py-3.5 text-xs",
  lg: "px-9 py-4 text-xs",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold uppercase tracking-widest",
    "transition-all duration-200 ease-out cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    className
  );

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant, size, className, ...props }, ref) => (
    <button ref={ref} className={buttonClass(variant, size, className)} {...props} />
  )
);
Button.displayName = "Button";
