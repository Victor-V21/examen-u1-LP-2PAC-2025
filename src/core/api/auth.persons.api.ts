import axios from "axios";


export const authPersonsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
