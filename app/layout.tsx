import type { Metadata } from 'next';
import { Geist_Mono, Coiny, Playfair_Display, Raleway } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import { Analytics } from '@vercel/analytics/next';
import ConsentWrapper from '@/components/layout/consentWrapper';

const geistSans = Raleway({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
});

const barriecito = Coiny({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-barriecito',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Jam Jar - Music Practice Journal',
  description:
    'Track practice sessions, set daily goals, record audio and visualise your progress. Jam Jar is a simple, powerful practice diary built to help musicians stay consistent and improve faster.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/jar-favicon.png" sizes="any" />

      <body
        className={`${playfairDisplay.variable} ${geistSans.variable} ${geistMono.variable} ${barriecito.variable} antialiased flex flex-col  min-h-screen`}
      >
        <SessionProviderWrapper>
          <Header />
          <main className=" grow font-sans pt-12 bg-gradient-to-b from-zinc-50 to-zinc-100">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
        <Analytics />
        <ConsentWrapper />
      </body>
    </html>
  );
}