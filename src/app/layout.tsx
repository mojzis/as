import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Artist Name | Glass Artist',
    template: '%s | Artist Name',
  },
  description:
    'Contemporary glass artist specializing in blown glass and kiln-formed sculpture. Recent BFA graduate showcasing vessels, installations, and sculptural works.',
  keywords: [
    'glass artist',
    'blown glass',
    'contemporary glass',
    'glass sculpture',
    'kiln-formed glass',
    'glass art',
  ],
  authors: [{ name: 'Artist Name' }],
  creator: 'Artist Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://artistname.com',
    title: 'Artist Name | Glass Artist',
    description: 'Contemporary glass artist portfolio',
    siteName: 'Artist Name',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artist Name Glass Art',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artist Name | Glass Artist',
    description: 'Contemporary glass artist portfolio',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-black min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
