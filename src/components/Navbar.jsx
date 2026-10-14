import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <img
        src="https://www.anurag.edu.in/assets/images/358a0b743e7fbbd8be475f4dca39d275afe10fa5-352x76.png?q=85&auto=format&w=640"
        alt="Anurag University"
        className="brand-logo"
      />
      <h1 className="brand-title">Campus Event Management Portal</h1>

      <nav className="menu">
        <NavLink to="/" end>Add Event</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/history">History</NavLink>
      </nav>
    </header>
  );
}