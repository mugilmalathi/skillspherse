import React from "react"
import { Button } from "@/components/atom/button/button"
import { Input } from "@/components/atom/input/input"
import { Textarea } from "@/components/atom/textarea/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atom/card/card"
import { FormField, FormLabel, FormMessage } from "@/components/molecule/form-field/form-field"

const HomePage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="container page-padding">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 section-spacing">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl fade-in">
            Welcome to SkillSphere
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto slide-up">
            A professional React application with modern design patterns and best practices.
          </p>
          <div className="flex justify-center space-x-4 scale-in">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>
                Example form using our custom atomic components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField>
                  <Input
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    helperText="This will be displayed publicly"
                  />
                </FormField>

                <FormField>
                  <Input
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormField>

                <FormField>
                  <Textarea
                    name="message"
                    label="Message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </FormField>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
              <CardDescription>
                What makes this project structure special
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Atomic Design Pattern</h4>
                    <p className="text-sm text-muted-foreground">
                      Components organized in atoms, molecules, and organisms
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Consistent Theming</h4>
                    <p className="text-sm text-muted-foreground">
                      Global theme system with brand colors and design tokens
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Type Safety</h4>
                    <p className="text-sm text-muted-foreground">
                      Full TypeScript support with proper type definitions
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Modern Routing</h4>
                    <p className="text-sm text-muted-foreground">
                      React Router with proper page organization
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Button Variants Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>
              Different button styles available in the design system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🚀</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomePage