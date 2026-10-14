import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/api";

export default function EventList({ mode = "upcoming" }) {
  const [events, setEvents] = useState([]);
  const isHistory = mode === "history";

  const load = () =>
    getEvents().then((res) => setEvents(res.data)).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteEvent(id);
    load();
  };

  const now = new Date();

  const shown = events
    .filter((e) =>
      isHistory ? new Date(e.eventDate) < now : new Date(e.eventDate) >= now
    )
    .sort((a, b) =>
      isHistory
        ? new Date(b.eventDate) - new Date(a.eventDate) // newest finished first
        : new Date(a.eventDate) - new Date(b.eventDate) // soonest first
    );

  return (
    <div className="container">
      <h1>{isHistory ? "Event History" : "Upcoming Events"}</h1>
      {shown.length === 0 && (
        <p>{isHistory ? "No past events yet." : "No upcoming events."}</p>
      )}
      <div className="grid">
        {shown.map((e) => (
          <div className={isHistory ? "card past" : "card"} key={e.id}>
            {e.posterImage && (
              <img
                src={e.posterImage}
                alt={`${e.title} poster`}
                className="poster"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (e.posterImage) {
                    const img = new Image();
                    img.onload = () => {
                      const win = window.open("", "_blank");
                      if (win) {
                        win.document.write(
                          `<img src="${e.posterImage}" style="max-width:100%;height:auto;display:block;margin:auto" />`
                        );
                        win.document.close();
                      }
                    };
                    img.onerror = () => alert("Poster image could not be loaded.");
                    img.src = e.posterImage;
                  }
                }}
              />
            )}
            {isHistory && <span className="badge">Completed</span>}
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