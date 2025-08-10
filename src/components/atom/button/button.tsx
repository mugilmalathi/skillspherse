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
        "bg-white text-black border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500 before:rounded-xl before:-z-10 before:m-[-2px] hover:bg-gray-50 focus:ring-indigo-500",
    secondary:
        "bg-white text-black border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500 before:rounded-xl before:-z-10 before:m-[-2px] hover:bg-gray-50 focus:ring-indigo-500",
    outline:
        "bg-white text-black border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500 before:rounded-xl before:-z-10 before:m-[-2px] hover:bg-gray-50 focus:ring-indigo-500",
  };

  return (
      <button
          className={cn(base, variants[variant], className)}
          {...props}
      />
  );
}
