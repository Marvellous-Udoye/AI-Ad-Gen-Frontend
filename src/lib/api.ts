import { useAuthStore } from "@/store/auth-store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const postRequest = async (
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  headers?: Record<string, string>
) => {
  const token = useAuthStore.getState().token?.token;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Something went wrong");
  }

  return responseData;
};

export const getRequest = async (
  url: string,
  headers?: Record<string, string>
) => {
  const token = useAuthStore.getState().token?.token;
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  });

  try {
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message || `Request failed with status ${response.status}`
      );
    }

    return responseData;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Invalid JSON response");
    }
    throw error;
  }
};
