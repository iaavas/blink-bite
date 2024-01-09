export const URL =
  process.env.NODE_ENV === "production"
    ? "https://https://vastra-iaavas.vercel.app/api"
    : "http://localhost:8000/api/";
