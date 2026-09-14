import { Cinzel, Outfit } from 'next/font/google'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CinematicRoot from '@/components/cinematic/CinematicRoot'

const display = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
})

const body = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'ASILO · Diablo 4',
  description: 'História de Santuário, classes, mapas e builds. Clã ASILO — Lar Recreativo de Idosos.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg-primary text-bone font-body">
        <CinematicRoot>
          <Header />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </CinematicRoot>
      </body>
    </html>
  )
}
