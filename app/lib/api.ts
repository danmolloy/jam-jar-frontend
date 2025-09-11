
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

// Utility function to make authenticated API calls with automatic token refresh
export async function authenticatedFetch(
  url: string, 
  options: RequestInit = {}, 
  session: { accessToken: string; refreshToken: string }
) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.accessToken}`,
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  // If token is expired, the backend will return 401
  if (response.status === 401) {
    throw new Error("Token expired - please refresh the page to get a new token");
  }

  return response;
}