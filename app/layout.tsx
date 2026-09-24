import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FloatingWhatsApp } from '@/components/whatsapp';
import { SchemaScript } from '@/components/ui';
import { siteConfig } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';
import './globals.css';
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });
export const metadata: Metadata = {
  ...pageMetadata('KroozIPTV | Entertainment on Your Terms', siteConfig.description, '/'),
  metadataBase: new URL(siteConfig.url),
  title: { default: 'KroozIPTV | Entertainment on Your Terms', template: '%s' },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/brand/icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/brand/icon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};
export const viewport: Viewport = { themeColor: '#090d13', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <SchemaScript
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${siteConfig.url}/#organization`,
                name: siteConfig.name,
                url: siteConfig.url,
                logo: `${siteConfig.url}/brand/logo.png`,
              },
              {
                '@type': 'WebSite',
                '@id': `${siteConfig.url}/#website`,
                name: siteConfig.name,
                url: siteConfig.url,
                inLanguage: 'en-US',
                publisher: { '@id': `${siteConfig.url}/#organization` },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
