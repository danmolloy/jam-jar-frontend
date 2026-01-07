import Link from 'next/link';
import CookiesReset from './cookiesReset';

export default function Footer() {
  return (
    <footer className="text-sm flex flex-col items-start justify-start w-full bg-dark border-t border-neutral-500 font-mono text-white p-4 py-8 min-h-[140px]">
      <div className="flex flex-col justify-between items-start w-full text-xs py-2">
        <Link href="/privacy" className="hover:underline p-1 min-h-[24px] flex items-center">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:underline p-1 min-h-[24px] flex items-center">
          Terms of Service
        </Link>
        <div className="min-h-[24px] flex items-center">
          <CookiesReset />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full text-xs p-1 mt-4 min-h-[20px]">
        <p>Operated by Daniel Molloy, Sole Trader, Australia</p>
        <p>© 2026 Jam Jar. All rights reserved.</p>
      </div>
    </footer>
  );
}
