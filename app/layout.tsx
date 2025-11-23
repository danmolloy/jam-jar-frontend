import type { Metadata } from 'next';
import { Geist_Mono, Coiny, Nunito, Playfair_Display, Geist, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import { Analytics } from '@vercel/analytics/next';
import ConsentWrapper from '@/components/layout/consentWrapper';

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const barriecito = Coiny({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-barriecito',
});

export const metadata: Metadata = {
  title: 'Jam Jar - Music Practice Journal',
  description:
    'Jam Jar brings structure and motivation to music practice. Keep track of your music practice analytics with our digital journal.',
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
          <div className=" grow font-sans pt-12">{children}</div>
          <Footer />
        </SessionProviderWrapper>
        <Analytics />
        <ConsentWrapper />
      </body>
    </html>
  );
}
