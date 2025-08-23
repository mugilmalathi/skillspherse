import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atom/card/card"
import Button from "@/components/atom/button/button"

const AboutPage: React.FC = () => {
  return (
    <div className="container page-padding">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight fade-in">About Us</h1>
          <p className="text-xl text-muted-foreground slide-up">
            Learn more about our mission and values
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>What drives us forward</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in creating exceptional user experiences through thoughtful design 
                and robust engineering. Our mission is to build products that not only meet 
                user needs but exceed their expectations.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
              <CardDescription>The principles that guide us</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Quality over quantity</li>
                <li>• User-centered design</li>
                <li>• Continuous learning</li>
                <li>• Collaborative spirit</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>The tools and technologies we use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-medium">React</h4>
                <p className="text-sm text-muted-foreground">UI Library</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-medium">TypeScript</h4>
                <p className="text-sm text-muted-foreground">Type Safety</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-medium">Tailwind CSS</h4>
                <p className="text-sm text-muted-foreground">Styling</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-medium">Vite</h4>
                <p className="text-sm text-muted-foreground">Build Tool</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg">Get in Touch</Button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage