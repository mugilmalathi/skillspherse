import * as React from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {children}
      </div>
    )
  }
)
FormField.displayName = "FormField"

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
    )
  }
)
FormLabel.displayName = "FormLabel"

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: "error" | "helper"
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, type = "helper", ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-sm",
          type === "error" ? "text-destructive" : "text-muted-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
FormMessage.displayName = "FormMessage"

export { FormField, FormLabel, FormMessage }