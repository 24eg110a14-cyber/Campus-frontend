import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/api";

export default function EventList() {
  const [events, setEvents] = useState([]);

  const load = () =>
    getEvents().then((res) => setEvents(res.data)).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteEvent(id);
    load();
  };

  return (
    <div className="container">
      <h1>Upcoming Events</h1>
      {events.length === 0 && <p>No events yet.</p>}
      <div className="grid">
        {events.map((e) => (
          <div className="card" key={e.id}>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p><b>Venue:</b> {e.venue}</p>
            <p><b>Date:</b> {new Date(e.eventDate).toLocaleString()}</p>
            <p><b>Organizer:</b> {e.organizer}</p>
            <p><b>Capacity:</b> {e.capacity}</p>
            <button onClick={() => handleDelete(e.id)}>Delete</button>

          </div>
        ))}
      </div>
    </div>
  );
}