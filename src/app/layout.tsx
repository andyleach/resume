import type { Metadata } from 'next';
import { fontClassNames } from '@/lib/fonts';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ThemeScript } from '@/components/layout/ThemeScript';
import './globals.css';

const SITE_URL = 'https://leachcreative.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Andrew Leach — Lead Software Engineer',
    template: '%s · Andrew Leach',
  },
  description:
    'Andrew Leach builds inventory, workflow, and contact-center systems with React, Laravel, and AWS. Based in Charlotte, NC.',
  openGraph: {
    title: 'Andrew Leach — Lead Software Engineer',
    description: 'Inventory, workflow, and contact-center systems with React, Laravel, and AWS.',
    url: SITE_URL,
    siteName: 'Andrew Leach',
    type: 'profile',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: SITE_URL },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Andrew Leach',
  jobTitle: 'Lead Software Engineer',
  email: 'mailto:midge-rockery9c@icloud.com',
  url: SITE_URL,
  sameAs: ['https://www.linkedin.com/in/andrew-b-leach/', 'https://github.com/andyleach'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
