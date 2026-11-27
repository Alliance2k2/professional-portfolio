import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/shared';
import { Assistant } from '@/components/assistant';
import { profile } from '@/lib/content';
import './globals.css';
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
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html:
              "try{const saved=localStorage.getItem('ia-theme');document.documentElement.dataset.theme=saved==='dark'?'dark':'light'}catch{}",
          }}
        />
        <script
          nonce={nonce}
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
