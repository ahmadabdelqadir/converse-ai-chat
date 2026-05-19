// Base URL of the backend REST API, read from the Vite environment.
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

// API URLs the frontend uses, kept in one place.
export const appConfig = {
  apiBaseUrl,
  conversationsUrl: "/api/conversations",
};
