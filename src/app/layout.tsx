import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { FAQ_ITEMS } from '@/lib/faq-data';

const TITLE = 'credVert. — The right card for every swipe';
const DESCRIPTION =
  'credVert. tells you which credit card to tap for every purchase, tracks fee waivers and milestones, and parses bank SMS on your phone. Built for India and the DPDP Act 2023.';
const OG_IMAGE = '/assets/mockups/wallet-mockup.png';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const displayFont = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#09090C' },
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://credvert.tech'),
  title: { default: TITLE, template: '%s · credVert.' },
  description: DESCRIPTION,
  keywords: [
    'credit card rewards India',
    'best credit card for purchase',
    'credit card advisor',
    'HDFC Infinia reward multiplier',
    'SBI Cashback',
    'Axis Atlas miles',
    'zero forex credit card',
    'credit card fee waiver tracker',
    'on-device SMS expense tracker',
    'DPDP Act 2023',
    'airport lounge access India',
  ],
  authors: [{ name: 'Jay Chauhan', url: 'https://credvert.tech' }],
  creator: 'Jay Chauhan',
  publisher: 'credVert. Technologies',
  applicationName: 'credVert.',
  alternates: { canonical: 'https://credvert.tech' },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '64x64' },
      { url: '/assets/Icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: { url: '/assets/Icon-512.png', sizes: '512x512' },
    shortcut: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    url: 'https://credvert.tech',
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'credVert.',
    images: [{ url: OG_IMAGE, width: 1536, height: 1024, alt: 'credVert. app on iPhone' }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@jay3chauhan',
    images: [OG_IMAGE],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://credvert.tech/#website',
        url: 'https://credvert.tech',
        name: 'credVert.',
        description: TITLE,
        publisher: {
          '@id': 'https://credvert.tech/#organization',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://credvert.tech/#application',
        name: 'credVert.',
        operatingSystem: 'Android, iOS, Web',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '4850',
          bestRating: '5',
          worstRating: '1',
        },
        description:
          DESCRIPTION,
        author: {
          '@type': 'Person',
          name: 'Jay Chauhan',
          url: 'https://credvert.tech',
        },
        url: 'https://credvert.tech',
      },
      {
        '@type': 'Organization',
        '@id': 'https://credvert.tech/#organization',
        name: 'credVert. Technologies',
        url: 'https://credvert.tech',
        logo: 'https://credvert.tech/assets/Icon-512.png',
        founder: {
          '@type': 'Person',
          name: 'Jay Chauhan',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: 'support@credvert.tech',
            contactType: 'customer support',
          },
          {
            '@type': 'ContactPoint',
            email: 'grievance@credvert.tech',
            contactType: 'grievance officer',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://credvert.tech/#faq',
        mainEntity: FAQ_ITEMS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Instant Theme Initialization Script to Prevent Flash of Unstyled Theme (FOUT) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('credvert_theme');
                  var isDark = stored ? stored === 'dark' : (!window.matchMedia || window.matchMedia('(prefers-color-scheme: dark)').matches);
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.setAttribute('data-theme', 'dark');
                  } else {
                    root.classList.add('light');
                    root.classList.remove('dark');
                    root.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#FAFAF7] dark:bg-[#09090C] text-neutral-900 dark:text-neutral-100 font-sans antialiased selection:bg-credvert-gold/30 selection:text-neutral-900 dark:selection:text-white relative min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-credvert-gold focus:text-neutral-950 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <div id="main" className="relative flex flex-col min-h-screen">{children}</div>
          <div className="grain" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
