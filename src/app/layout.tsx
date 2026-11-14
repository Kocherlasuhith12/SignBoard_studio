import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@/context/SoundContext";
import { AtmosphereCanvas } from "@/components/canvas/AtmosphereCanvas";

const siteUrl = "https://kocherlasuhith12.github.io/SignBoard_studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SIGNBOARD STUDIO — We Make Businesses Impossible To Ignore",
  description:
    "Founder-led creative digital studio crafting world-class digital experiences, cinematic visual storytelling, and intelligent software architectures.",
  keywords: [
    "Signboard Studio",
    "Creative Digital Studio",
    "Web Design and Development",
    "Motion Content",
    "Founder-Led Studio",
    "Next.js Development",
    "KKS Suhith",
    "Hyderabad Digital Studio",
  ],
  authors: [{ name: "KKS Suhith - Signboard Studio" }],
  openGraph: {
    title: "SIGNBOARD STUDIO — We Make Businesses Impossible To Ignore",
    description:
      "Creative digital experiences. Powerful visual storytelling. Intelligent software architectures.",
    type: "website",
    locale: "en_US",
    siteName: "SIGNBOARD STUDIO",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "Signboard Studio — Creative Digital Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIGNBOARD STUDIO — We Make Businesses Impossible To Ignore",
    description: "Creative digital experiences. Powerful visual storytelling. Intelligent solutions.",
    creator: "@KksSuhith",
    images: [`${siteUrl}/images/og-preview.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Consistent 3-Font System: Cormorant Garamond (Editorial Headings), Plus Jakarta Sans (Body), JetBrains Mono (Technical) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070707] text-[#EDEDED] font-sans antialiased selection:bg-[#B5121B] selection:text-white">
        <SoundProvider>
          {/* Film Grain Texture Overlay */}
          <div className="grain-overlay" aria-hidden="true" />
          
          {/* Atmospheric Particle & Glow Canvas */}
          <AtmosphereCanvas />

          <main className="relative z-10">{children}</main>
        </SoundProvider>
      </body>
    </html>
  );
}
