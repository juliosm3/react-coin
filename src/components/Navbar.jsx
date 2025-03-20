import { Link, Outlet } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <Outlet />
    </>
  );
}