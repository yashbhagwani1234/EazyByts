import axios from "axios";

export const baseURL = "http://localhost:8080"; // ✅ Base URL for API

const httpClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json", // Optional: Set default headers
  },
});

export default httpClient; // ✅ Default export
