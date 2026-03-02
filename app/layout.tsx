import type { Metadata } from "next"
import { Playfair_Display, Outfit } from "next/font/google"
import "./globals.css"
import { SEO, SCHEMA_ORG } from "@/lib/content"
import { MotionProvider } from "@/components/providers/MotionProvider"

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: SEO.home.keywords as unknown as string[],
  openGraph: {
    title: SEO.home.title,
    description: SEO.home.description,
    type: "website",
    locale: "hr_HR",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SCHEMA_ORG.localBusiness),
          }}
        />
      </head>
      <body className="font-outfit antialiased">
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
