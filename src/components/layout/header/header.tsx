import React from "react"
import { Link } from "react-router-dom"
import { Navigation } from "@/components/molecule/navigation/navigation"
import { Button } from "@/components/atom/button/button"
import { Home, Info, Mail, Menu } from "lucide-react"

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const navigationItems = [
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "About", href: "/about", icon: <Info className="h-4 w-4" /> },
    { label: "Contact", href: "/contact", icon: <Mail className="h-4 w-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SS</span>
          </div>
          <span className="font-bold text-xl">SkillSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Navigation items={navigationItems} />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <Navigation items={navigationItems} className="flex-col space-x-0 space-y-2" />
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" size="sm" className="justify-start">
                Sign In
              </Button>
              <Button size="sm" className="justify-start">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header