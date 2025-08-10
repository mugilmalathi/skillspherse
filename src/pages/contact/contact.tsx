import React from "react"
import { Button } from "@/components/atom/button/button"
import { Input } from "@/components/atom/input/input"
import { Textarea } from "@/components/atom/textarea/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atom/card/card"
import { FormField } from "@/components/molecule/form-field/form-field"

const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log("Form submitted:", formData)
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })
      alert("Message sent successfully!")
    }
  }

  return (
    <div className="container page-padding">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight fade-in">Contact Us</h1>
          <p className="text-xl text-muted-foreground slide-up">
            Get in touch with our team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField>
                      <Input
                        name="name"
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={errors.name}
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
                        error={errors.email}
                      />
                    </FormField>
                  </div>

                  <FormField>
                    <Input
                      name="subject"
                      label="Subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={errors.subject}
                    />
                  </FormField>

                  <FormField>
                    <Textarea
                      name="message"
                      label="Message"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      error={errors.message}
                      rows={6}
                    />
                  </FormField>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">hello@skillsphere.com</p>
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-muted-foreground">
                    123 Innovation Street<br />
                    Tech City, TC 12345
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage