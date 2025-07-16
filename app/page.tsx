import { auth } from '@/auth';
import Dashboard from '@/components/dashboard';
import LandingPage from '@/components/shared/landing';


export default async function Home() {
    const session = await auth()

  if (!session || session.error === "RefreshAccessTokenError" || !session.accessToken) {
    return (
      <LandingPage />
    )
  }
  return (

      <Dashboard session={session} />
    )
}
