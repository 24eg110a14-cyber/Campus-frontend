import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api" });

export const getEvents = () => api.get("/events");
export const createEvent = (data) => api.post("/events", data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

export default api;