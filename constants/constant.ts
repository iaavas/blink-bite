export const URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3200/api/"
    : "http://localhost:3200/api/";
