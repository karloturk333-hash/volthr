import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { SEO, SCHEMA_ORG } from "@/lib/content"
import { MotionProvider } from "@/components/providers/MotionProvider"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: SEO.home.title,
    template: "%s | Volt Web Studio",
  },
  description: SEO.home.description,
  keywords: [...SEO.home.keywords],
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
    <html lang="hr" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SCHEMA_ORG.localBusiness),
          }}
        />
      </head>
      <body className="font-dm antialiased">
        <MotionProvider>
          <Nav />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
