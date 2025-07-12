import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InvisionEd',
  description: 'A platform for educational content',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
