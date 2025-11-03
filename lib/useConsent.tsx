'use client';
import { useEffect, useState } from 'react';

export function useConsent() {
  const [analyticsAccepted, setAnalyticsAccepted] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  useEffect(() => {
    const readFromStorage = () => {
      const stored = localStorage.getItem('jamjar-consent');
      if (stored === 'accepted') {
        setAnalyticsAccepted(true);
        setConsentChecked(true);
      } else if (stored === 'declined') {
        setAnalyticsAccepted(false);
        setConsentChecked(true);
      } else {
        setAnalyticsAccepted(false);
        setConsentChecked(false);
      }
    };

    // Initial read on mount
    readFromStorage();

    // React to updates from other hook instances or tabs
    const handleConsentUpdated = () => readFromStorage();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'jamjar-consent') readFromStorage();
    };

    window.addEventListener('consent-updated', handleConsentUpdated as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('consent-updated', handleConsentUpdated as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const accept = () => {
    localStorage.setItem('jamjar-consent', 'accepted');
    setAnalyticsAccepted(true);
    setConsentChecked(true);
    // Notify other components using the hook
    window.dispatchEvent(new Event('consent-updated'));
  };

  const decline = () => {
    localStorage.setItem('jamjar-consent', 'declined');
    setAnalyticsAccepted(false);
    setConsentChecked(true);
    window.dispatchEvent(new Event('consent-updated'));
  };

  const resetConsent = () => {
    localStorage.removeItem('jamjar-consent');
    setAnalyticsAccepted(false);
    setConsentChecked(false);
    window.dispatchEvent(new Event('consent-updated'));
  };

  return { analyticsAccepted, consentChecked, accept, decline, resetConsent };
}
