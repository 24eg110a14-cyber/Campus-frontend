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
  posterImage: "",
};

// Shrinks the picture so it saves quickly and stays small in the database
const resizeImage = (file, maxSize = 800) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function AddEvent() {
  const [form, setForm] = useState(empty);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePoster = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = await resizeImage(file);
    setForm((prev) => ({ ...prev, posterImage: data }));
  };

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

        <label className="file-label">Event Poster</label>
        <input type="file" accept="image/*" onChange={handlePoster} />
        {form.posterImage && <img src={form.posterImage} alt="Poster preview" className="preview" />}

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}