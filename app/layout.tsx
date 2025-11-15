import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CareFlow Desk',
  description: 'CareFlow Desk Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

