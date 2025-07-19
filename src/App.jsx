import React, { useState, useEffect } from "react";
import axios from "axios";
import NewPetForm from "./components/NewPetForm";

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
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch pet list from Firebase
  const fetchPets = () => {
    axios
      .get(
        "https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets.json"
      )
      .then((response) => {
        const data = response.data;
        const petsArray = Object.entries(data).map(([id, pet]) => ({
          id,
          ...pet,
        }));
        setPets(petsArray);
      })
      .catch((error) => console.error("Error fetching pets:", error));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      {/* Top navbar with logo */}
      <Navbar />

      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Pet List</h1>

      {/* Form to add a new pet */}
      <NewPetForm onPetAdded={fetchPets} />

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

      {/* Pet list */}
      <ul style={{ marginTop: "20px", paddingLeft: "40px" }}>
        {pets
          .filter((pet) =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((pet) => (
            <li key={pet.id}>
              <strong>{pet.name}</strong> ({pet.species}, {pet.gender}) - {pet.age}{" "}
              years
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
