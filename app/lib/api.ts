
// Utility function to get the correct API URL based on environment
export function getApiUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Check if we're in the browser and on localhost
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:8000/';
  }
  
  // Default to production URL
  return 'https://team-mango-jam-jar-b85c8c9471e3.herokuapp.com/';
}

export async function login(username: string, password: string) {
  try {

    const res = await fetch(`${getApiUrl()}api/token/`, {
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
  const res = await fetch(`${getApiUrl()}api/protected/`, {
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