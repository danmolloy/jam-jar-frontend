'use client'
import { useEffect, useState } from "react";
import SettingsIndex from "@/components/settings";
import { useRequireAuth } from "@/lib/use-auth";

export default function SettingsPage() {
  const { session, isLoading } = useRequireAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/me/`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((error) => {
          console.error('Failed to fetch user data:', error);
        });
    }
  }, [session]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Loading user data...</div>;

  return <SettingsIndex user={user} />;
}