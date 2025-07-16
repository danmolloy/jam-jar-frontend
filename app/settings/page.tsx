'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SettingsIndex from "@/components/settings";
import Login from "@/components/shared/login";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/me/`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session || !session.user || session.error === "RefreshAccessTokenError" || !session.accessToken) {
    return <Login />;
  }
  if (!user) return <div>Loading user data...</div>;

  return <SettingsIndex user={user} />;
}