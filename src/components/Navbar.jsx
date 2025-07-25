import "../App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <img src="/logo-snugglepaws.png" alt="SnugglePaws Logo" />
      <h2 className="logo-text">SnugglePaws</h2>

      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/new-pet" className="nav-button">Add New Pet</Link>
      </nav>
    </header>
  );
}

export default Navbar;
