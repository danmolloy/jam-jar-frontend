import type { Metadata } from 'next';
import { Geist, Geist_Mono, Barriecito } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


const barriecito = Barriecito({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-barriecito'
})

export const metadata: Metadata = {
  title: 'Jam Jar',
  description: 'The music practice studio.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${barriecito.variable} antialiased flex flex-col  min-h-screen`}>
          <SessionProviderWrapper>
        <Header />
        <div className=' grow font-sans pt-12'>
            {children}
        </div>
        <Footer />
            </SessionProviderWrapper>
      </body>
    </html>
  );
}
