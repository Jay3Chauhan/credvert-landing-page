import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

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
    { media: '(prefers-color-scheme: dark)', color: '#07090D' },
    { media: '(prefers-color-scheme: light)', color: '#F8F7F4' },
  ],
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
    'credit card rewards India',
    'credit card advisor',
    'best credit card optimization',
    'HDFC Infinia reward multiplier',
    'SBI Cashback optimization',
    'Axis Atlas airline miles transfer',
    'ICICI Emeralde zero forex',
    'DPDP Act 2023 compliance',
    'on-device SMS expense tracker',
    'Claude 3.5 AI fintech copilot',
    'zero-knowledge hardware vault',
    'airport lounge access India',
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
      'Maximize rewards, airline miles, and cashback on every swipe with real-time optimization math and on-device privacy.',
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
        '@type': 'WebSite',
        '@id': 'https://credvert.tech/#website',
        url: 'https://credvert.tech',
        name: 'Credvert',
        description: 'Zero-Knowledge Credit Card Intelligence & Advisor',
        publisher: {
          '@id': 'https://credvert.tech/#organization',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://credvert.tech/#application',
        name: 'Credvert',
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
        '@id': 'https://credvert.tech/#organization',
        name: 'Credvert Technologies',
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
      {
        '@type': 'FAQPage',
        '@id': 'https://credvert.tech/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Credvert pick the best card for my purchase?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Credvert maintains a real-time catalog of reward multiplier rules including SmartBuy portals (5X–10X), category exclusions, monthly spend caps, and point redemption values. It calculates precise net financial return including 18% GST deduction on forex markups.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is granting SMS permission safe?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Credvert runs an isolated regex parser directly inside your phone RAM. Full 16-digit card numbers, OTPs, and raw SMS text bodies are strictly discarded by design under DPDP Act 2023 §6. No SMS content ever reaches any remote server.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does foreign exchange markup calculation work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most Indian banks charge between 2.0% and 3.5% forex markup plus 18% GST (e.g. 3.5% x 1.18 = 4.13% effective). Credvert deducts this exact penalty from your reward rate so you see true net yield.',
            },
          },
          {
            '@type': 'Question',
            name: "What about iOS? Apple doesn't allow SMS reading.",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'On iOS, Credvert provides a one-tap clipboard paste parser. Parsing happens 100% on-device with zero-knowledge hardware guarantees.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I delete my account and all data permanently?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, unconditionally. Under the DPDP Act 2023 and GDPR you have an absolute Right to Erasure in-app or via our online deletion portal within 24 hours.',
            },
          },
        ],
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
      <body className="bg-[#F8F7F4] dark:bg-[#07090D] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-credvert-gold/30 selection:text-neutral-900 dark:selection:text-white transition-colors duration-300 relative min-h-screen">
        <ThemeProvider>
          {/* Ambient dynamic background mesh */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-amber-400/[0.07] dark:bg-credvert-gold/[0.04] rounded-full blur-[160px] animate-ambient" />
            <div
              className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-blue-400/[0.05] dark:bg-indigo-500/[0.03] rounded-full blur-[160px] animate-ambient"
              style={{ animationDelay: '-4s' }}
            />
            <div
              className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-emerald-400/[0.05] dark:bg-emerald-500/[0.03] rounded-full blur-[160px] animate-ambient"
              style={{ animationDelay: '-8s' }}
            />
          </div>

          {/* Page Content */}
          <div className="relative z-10 flex flex-col min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
