
export async function login(username: string, password: string) {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!res.ok) throw new Error("Login failed");
  
    return res.json(); // returns { access, refresh }
  } catch(e) {
    console.log(e)
  }
}

export async function getProtectedData(accessToken: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/protected/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}