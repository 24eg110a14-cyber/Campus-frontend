import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Campus Events</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/add">Add Event</Link>
      </div>
    </nav>
  );
}