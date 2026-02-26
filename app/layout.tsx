import { Inter } from 'next/font/google';
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://vidyasetu.in'),
  title: {
    default: 'VidyaSetu - Learn in Your Language',
    template: '%s | VidyaSetu',
  },
  description:
    'AI-powered multilingual learning portal for rural India. Learn any subject in your mother tongue.',
  keywords: ['education', 'multilingual', 'rural India', 'NCERT', 'learning', 'AI tutor', 'Hindi', 'Tamil', 'Telugu'],
  authors: [{ name: 'VidyaSetu' }],
  creator: 'VidyaSetu',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vidyasetu.in',
    siteName: 'VidyaSetu',
    title: 'VidyaSetu - Learn in Your Language',
    description: 'AI-powered multilingual learning portal for rural India. Learn any subject in your mother tongue.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VidyaSetu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VidyaSetu - Learn in Your Language',
    description: 'AI-powered multilingual learning portal for rural India. Learn any subject in your mother tongue.',
    images: ['/og-image.png'],
  },
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-(--color-bg-primary) text-(--color-text-primary) antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
