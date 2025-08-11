import React from "react";
import { cn } from "../../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className = "",
  variant = "primary",
  size = "default",
  ...props
}, ref) => {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-white text-black hover:bg-gray-100 focus:ring-indigo-500",
    secondary:
      "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:from-indigo-600 hover:to-fuchsia-600 focus:ring-indigo-500",
    outline:
      "border border-white bg-transparent text-white hover:bg-white hover:text-black focus:ring-white",
    ghost:
      "bg-transparent text-white hover:bg-white/10 focus:ring-white",
  };

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

Button.displayName = "Button";

export default Button;