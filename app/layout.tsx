import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import './globals.css'

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mplus-rounded'
})

export const metadata: Metadata = {
  title: 'FIND to DO Instagram投稿作成システム',
  description: '学習したInstagramコース戦略に基づいた投稿作成ツール',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`min-h-screen bg-gray-50 ${mPlusRounded.variable}`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}