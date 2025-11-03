'use client';

import CookieBanner from './cookieBanner';
import { useConsent } from '@/lib/useConsent';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function ConsentWrapper() {
  const { analyticsAccepted, consentChecked } = useConsent();

  return (
    <>
      {consentChecked === false && <CookieBanner />}
      {analyticsAccepted && <GoogleAnalytics gaId={'G-1QBV74SESQ'} />}
    </>
  );
}
