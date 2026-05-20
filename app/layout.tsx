import type { Metadata } from 'next'
import { Inter, Playfair_Display, Creepster, Righteous, Orbitron, Cinzel, Rock_Salt, Nosifer, Pacifico, Cormorant_Garamond, Quicksand, Bebas_Neue, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-display'
});

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-creepster'
});

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-righteous'
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: '--font-orbitron'
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: '--font-cinzel'
});

const rockSalt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-rock-salt'
});

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-nosifer'
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-pacifico'
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: '--font-cormorant',
  weight: ["400", "600", "700"]
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: '--font-quicksand'
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-bebas'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'ENHYPEN Photobooth',
  description: 'Create beautiful photos with ENHYPEN era-themed frames',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} ${creepster.variable} ${righteous.variable} ${orbitron.variable} ${cinzel.variable} ${rockSalt.variable} ${nosifer.variable} ${pacifico.variable} ${cormorant.variable} ${quicksand.variable} ${bebas.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
