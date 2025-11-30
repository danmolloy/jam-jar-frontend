import Link from 'next/link';
import CookiesReset from './cookiesReset';

export default function Footer() {


  return (
    <footer className=" text-sm flex flex-col items-start justify-start w-full  bg-dark font-mono text-white p-4 py-8">
      <div className="flex flex-col justify-between items-start w-full text-xs py-2">
        <Link href="/privacy" className="hover:underline p-1">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:underline p-1">
          Terms of Service
        </Link>
        <CookiesReset />
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full text-xs p-1 mt-4">
        <p>Operated by Daniel Molloy, Sole Trader, UK</p>
        <p>© 2025 Jam Jar. All rights reserved.</p>
      </div>
    </footer>
  );
}
