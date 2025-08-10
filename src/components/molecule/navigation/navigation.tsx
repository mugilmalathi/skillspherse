import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface NavigationProps {
  items: NavigationItem[]
  className?: string
}

const Navigation = React.forwardRef<HTMLNavElement, NavigationProps>(
  ({ items, className }, ref) => {
    const location = useLocation()

    return (
      <nav ref={ref} className={cn("flex space-x-1", className)}>
        {items.map((item) => {
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon && <span className="h-4 w-4">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    )
  }
)
Navigation.displayName = "Navigation"

export { Navigation, type NavigationItem }



export { Navigation }