import React from "react";
import { cn } from "../../../lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export default function Button({
                                 className = "",
                                 variant = "primary",
                                 ...props
                               }: Props) {
  const base =
      "rounded-xl px-4 py-2 transition focus:outline-none focus:ring-2";

  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary:
        "border border-black bg-white text-black hover:bg-gray-100 hover:border-gray-800 focus:ring-black",
    secondary:
        "border border-white/20 bg-slate-900 text-white hover:bg-slate-800 focus:ring-white/40",
    outline:
        "border border-black bg-transparent text-black hover:bg-gray-100 focus:ring-black",
  };

  return (
      <button
          className={cn(base, variants[variant], className)}
          {...props}
      />
  );
}
