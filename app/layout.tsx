import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { SEO } from "@/lib/content"
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
  metadataBase: new URL("https://volt.hr"),
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
      <body className="font-dm antialiased">
        {/* Fixed aurora background — fades out in the bottom half */}
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, black 30%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 60%)",
          }}
        >
          <div
            className="absolute -inset-[10px] opacity-50 will-change-transform filter blur-[10px] [--aurora-white:repeating-linear-gradient(100deg,var(--aurora-bg)_0%,var(--aurora-bg)_7%,transparent_10%,transparent_12%,var(--aurora-bg)_16%)] [--aurora:repeating-linear-gradient(100deg,var(--aurora-violet)_10%,var(--aurora-indigo)_15%,var(--aurora-blue)_20%,var(--aurora-violet-light)_25%,var(--aurora-indigo-dark)_30%)] [background-image:var(--aurora-white),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] after:content-[''] after:absolute after:inset-0 after:[background-image:var(--aurora-white),var(--aurora)] after:[background-size:200%,_100%] after:animate-aurora after:[background-attachment:fixed] after:mix-blend-multiply"
          />
        </div>

        <MotionProvider>
          <div className="relative z-10">
            <Nav />
            {children}
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  )
}
