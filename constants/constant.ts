export const URL =
  process.env.NODE_ENV === "production"
    ? "https://vastra-iaavas.vercel.app/api/"
    : "http://localhost:5000/api/";
