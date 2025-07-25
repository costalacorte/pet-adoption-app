import "../App.css";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <img src="/logo-snugglepaws.png" alt="SnugglePaws Logo" />
      <h2 className="logo-text">SnugglePaws</h2>

      <nav>
        <li><Link to= "/" >Home</Link></li>
        <li><Link to= "/new-pet">Add New Pet</Link></li>

      </nav>
    </header>

  );
}

export default Navbar;
