import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "@/components/layout/layout"
import HomePage from "@/pages/home/home"
import AboutPage from "@/pages/about/about"
import ContactPage from "@/pages/contact/contact"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
])

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}

export default AppRouter