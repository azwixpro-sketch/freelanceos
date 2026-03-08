import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FreelanceOS — Gestion freelance tout-en-un',
  description: 'Gérez vos clients, devis et factures en un seul endroit. L\'outil gratuit conçu pour les freelances et auto-entrepreneurs français.',
  keywords: 'freelance, devis, facture, auto-entrepreneur, gestion, comptabilité',
  openGraph: {
    title: 'FreelanceOS — Gestion freelance tout-en-un',
    description: 'Clients, devis, factures. Simple, rapide, gratuit.',
    url: 'https://freelanceos-1y1n.vercel.app',
    siteName: 'FreelanceOS',
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