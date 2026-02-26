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
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://traderlion.com'),
  title: {
    default: 'TraderLion - Learn Trading',
    template: '%s | TraderLion',
  },
  description:
    'Master stock trading with courses from professional traders. Join TraderLion and learn from the best.',
  keywords: ['trading', 'stocks', 'courses', 'education', 'investment'],
  authors: [{ name: 'TraderLion' }],
  creator: 'TraderLion',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://traderlion.com',
    siteName: 'TraderLion',
    title: 'TraderLion - Learn Trading',
    description: 'Master stock trading with courses from professional traders.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TraderLion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TraderLion - Learn Trading',
    description: 'Master stock trading with courses from professional traders.',
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
