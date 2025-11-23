import { Suspense } from 'react';
import Login from '@/components/shared/login';
import Loading from '../loading';

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
}
