import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
  themeColor: '#07090D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://credvert.tech'),
  title: 'Credvert — Zero-Knowledge Credit Card Intelligence & Advisor',
  description:
    'Maximize credit card rewards, airline miles, and cashbacks with real-time optimization. 100% on-device SMS parsing compliant with DPDP Act 2023. Zero cloud leakage.',
  keywords: [
    'credit card rewards',
    'credit card advisor',
    'smart card optimizer',
    'HDFC Infinia',
    'SBI Cashback',
    'Axis Atlas',
    'ICICI Emeralde',
    'zero forex markup',
    'DPDP Act 2023',
    'on-device SMS parser',
    'Claude 3.5 AI Copilot',
    'India fintech',
  ],
  authors: [{ name: 'Jay Chauhan', url: 'https://credvert.tech' }],
  creator: 'Jay Chauhan',
  publisher: 'Credvert Technologies',
  applicationName: 'Credvert',
  alternates: {
    canonical: 'https://credvert.tech',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/assets/brand/credvert-mark.svg',
    shortcut: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    url: 'https://credvert.tech',
    title: 'Credvert — Zero-Knowledge Credit Card Intelligence & Advisor',
    description:
      'Maximize rewards, miles, and cashback on every swipe with real-time optimization math and on-device privacy.',
    siteName: 'Credvert',
    images: [
      {
        url: 'https://credvert.tech/assets/brand/credvert-gold.svg',
        width: 1200,
        height: 630,
        alt: 'Credvert - Credit Card Intelligence',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credvert — Zero-Knowledge Credit Card Intelligence & Advisor',
    description:
      'Real-time reward optimization engine and DPDP Act 2023 on-device intelligence for Indian credit cards.',
    creator: '@jay3chauhan',
    images: ['https://credvert.tech/assets/brand/credvert-gold.svg'],
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
        '@type': 'SoftwareApplication',
        name: 'Credvert',
        operatingSystem: 'Android, iOS, Web',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Credvert is a zero-knowledge credit card optimization engine providing real-time recommendations, on-device SMS spend intelligence, and fee waiver tracking.',
        author: {
          '@type': 'Person',
          name: 'Jay Chauhan',
          url: 'https://credvert.tech',
        },
        url: 'https://credvert.tech',
      },
      {
        '@type': 'Organization',
        name: 'Credvert',
        url: 'https://credvert.tech',
        logo: 'https://credvert.tech/assets/brand/credvert-gold.svg',
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
    ],
  };

  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-neutral-950 text-neutral-100 font-sans selection:bg-credvert-gold/30 selection:text-white relative">
        {/* Ambient background mesh */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-credvert-gold/[0.04] rounded-full blur-[160px] animate-ambient" />
          <div
            className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[160px] animate-ambient"
            style={{ animationDelay: '-4s' }}
          />
          <div
            className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-emerald-500/[0.03] rounded-full blur-[160px] animate-ambient"
            style={{ animationDelay: '-8s' }}
          />
        </div>

        {/* Page Content */}
        <div className="relative z-10 flex flex-col min-h-screen">{children}</div>
      </body>
    </html>
  );
}
