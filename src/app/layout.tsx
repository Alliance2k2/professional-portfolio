import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/shared';
import { Assistant } from '@/components/assistant';
import { profile } from '@/lib/content';
import './globals.css';
import 'katex/dist/katex.min.css';
const origin = process.env.SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(origin || 'http://127.0.0.1:3000'),
  title: {
    default: 'Irigenera Alliance — Data, Research & Engineering',
    template: '%s | Irigenera Alliance',
  },
  description: profile.summary,
  icons: { icon: '/icon.svg' },
  ...(origin ? { alternates: { canonical: '/' } } : {}),
  openGraph: {
    title: 'Irigenera Alliance',
    description: profile.headline,
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.headline,
    sameAs: [profile.github, profile.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kigali',
      addressCountry: 'RW',
    },
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('ia-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        {process.env.NEXT_PUBLIC_ASSISTANT_ENABLED !== 'false' ? (
          <Assistant />
        ) : null}
      </body>
    </html>
  );
}
