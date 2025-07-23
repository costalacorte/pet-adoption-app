import React, { useState } from "react";
import NewPetForm from "./components/NewPetForm";
import PetList from "./components/PetList";

// Simple Navbar with logo
function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "#fcebe5",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img
        src="/logo-snugglepaws.png"
        alt="SnugglePaws Logo"
        style={{ height: "50px" }}
      />
      <h2 style={{ margin: 0, color: "#7c4a36" }}>SnugglePaws</h2>
    </header>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Navbar />

      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Pet List</h1>

      <NewPetForm onPetAdded={() => window.location.reload()} />

      {/* Search bar */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "200px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Pet list com filtro */}
      <PetList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
