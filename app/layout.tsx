import { Alegreya_Sans, Cinzel_Decorative } from 'next/font/google'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import CinematicRoot from '@/components/cinematic/CinematicRoot'

const hero = Cinzel_Decorative({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700', '900'],
})

const sans = Alegreya_Sans({
  subsets: ['latin'],
  variable: '--font-alegreya',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'ASILO · Diablo 4',
  description: 'História de Santuário, classes, mapas e builds. Clã ASILO — Lar Recreativo de Idosos.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${hero.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg-primary text-bone font-body">
        <CinematicRoot>
          <ScrollProgress />
          <Header />
          <main className="flex-grow pt-[5.1rem]">{children}</main>
          <Footer />
        </CinematicRoot>
      </body>
    </html>
  )
}
