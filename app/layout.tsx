import { Cinzel, Source_Sans_3 } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CinematicRoot from '@/components/cinematic/CinematicRoot'

const display = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
})

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'ASILO · Diablo 4 BR',
  description: 'Clã ASILO — montador, lore de Santuário, rank de Pit e mapas. Lar Recreativo de Idosos.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg-primary text-bone font-body">
        <CinematicRoot>
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </CinematicRoot>
      </body>
    </html>
  )
}
