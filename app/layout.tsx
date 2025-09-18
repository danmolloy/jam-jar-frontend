import type { Metadata } from 'next';
import { Geist, Geist_Mono, Barriecito, Barrio, Coiny, Nunito, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

const geistSans = Nunito({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


const barriecito = Coiny({
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
      <link rel="icon" href="/jar.png" sizes="any" />

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
