import axios from "axios";

const api = axios.create({
  baseURL: "https://campus-backend-production-f3ce.up.railway.app/api",
});

export const getEvents = () => api.get("/events");
export const createEvent = (data) => api.post("/events", data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

export default api;