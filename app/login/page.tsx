import { Suspense } from 'react';
import Login from '@/components/shared/login';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
