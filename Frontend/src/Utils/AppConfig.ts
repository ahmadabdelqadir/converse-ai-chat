// Base URL of the backend REST API, read from the Vite environment.
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

// Central place for every URL and constant the frontend needs.
export const appConfig = {
  apiBaseUrl,
  conversationsUrl: "/api/conversations",
};
