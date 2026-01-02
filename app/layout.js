import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'Si-Zero | Platform Riset Teknologi Hijau',
    template: '%s | Si-Zero',
  },
  description:
    'Si-Zero adalah platform riset kolaboratif yang berfokus pada pengembangan teknologi hijau, energi terbarukan, dan solusi berkelanjutan untuk masa depan yang lebih baik.',
  keywords: [
    'Si-Zero',
    'riset',
    'teknologi hijau',
    'energi terbarukan',
    'sustainable technology',
    'green technology',
    'research platform',
    'kolaborasi riset',
  ],
  authors: [{ name: 'Si-Zero Research Team' }],
  creator: 'Si-Zero',
  publisher: 'Si-Zero',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon-black.svg',
    shortcut: '/icon-black.svg',
    apple: '/icon-black.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Si-Zero',
    title: 'Si-Zero | Platform Riset Teknologi Hijau',
    description:
      'Platform riset kolaboratif yang berfokus pada pengembangan teknologi hijau dan solusi berkelanjutan.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Si-Zero Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Si-Zero | Platform Riset Teknologi Hijau',
    description:
      'Platform riset kolaboratif yang berfokus pada pengembangan teknologi hijau dan solusi berkelanjutan.',
    images: ['/logo.png'],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  ),
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
