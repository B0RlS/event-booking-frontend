// src/utils/api.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchEvents = async () => {
  const response = await api.get("/api/v1/events");
  return response.data;
};

export const fetchEventById = async (id: string) => {
  const response = await api.get(`/api/v1/events/${id}`);
  return response.data;
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  const response = await api.post("/api/v1/users", userData);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post("/api/v1/users/sign_in", credentials);
  return response.data;
};

export const logoutUser = async () => {
  await api.delete("/api/v1/users/sign_out");
  localStorage.removeItem("auth_token");
};

export const bookTicket = async (eventId: string, quantity: number) => {
  const response = await api.post(`/api/v1/events/${eventId}/tickets`, { quantity });
  return response.data;
};

export const fetchUserTickets = async () => {
  const response = await api.get("/api/v1/tickets");
  return response.data;
};

export const fetchTicketById = async (ticketId: string) => {
  const response = await api.get(`/api/v1/tickets/${ticketId}`);
  return response.data;
};

export const cancelTicket = async (ticketId: string) => {
  const response = await api.delete(`/api/v1/tickets/${ticketId}`);
  return response.data;
};

export default api;
