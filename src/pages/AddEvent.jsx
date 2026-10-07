import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/api";

const empty = {
  title: "",
  description: "",
  venue: "",
  eventDate: "",
  organizer: "",
  capacity: "",
};

export default function AddEvent() {
  const [form, setForm] = useState(empty);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent({ ...form, capacity: Number(form.capacity) });
    navigate("/events");
  };

  return (
    <div className="container">
      <h1>Add New Event</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} required />
        <input type="datetime-local" name="eventDate" value={form.eventDate} onChange={handleChange} required />
        <input name="organizer" placeholder="Organizer" value={form.organizer} onChange={handleChange} />
        <input type="number" name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} required />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}