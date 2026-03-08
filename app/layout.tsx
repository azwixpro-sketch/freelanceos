import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Facturo — Devis et factures pour freelances français',
  description: 'Gérez vos clients, devis et factures en quelques clics. L\'outil gratuit conçu pour les freelances et auto-entrepreneurs français.',
  keywords: 'facturo, devis, facture, auto-entrepreneur, freelance, gestion, comptabilité france',
  openGraph: {
    title: 'Facturo — Devis et factures pour freelances français',
    description: 'Clients, devis, factures. Simple, rapide, 100% français.',
    url: 'https://facturo.fr',
    siteName: 'Facturo',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}