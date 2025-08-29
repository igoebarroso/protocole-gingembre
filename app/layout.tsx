import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/AuthContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gingembre Pro - Protocole Santé",
  description: "Votre protocole de santé personnalisé avec le gingembre asiatique",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#28C76F",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gingembre Pro",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
        <AuthProvider>
          <Suspense fallback={null}>
            {children}
            <Analytics />
            <Toaster 
              position="top-center"
              richColors
              closeButton
              duration={4000}
              toastOptions={{
                style: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
