import { useEffect, useState } from "react";
import axios from "axios";
// ❌ Removido: import { Link } from "react-router-dom";
import "../App.css";
import PetCard from "./PetCard";

function PetList() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets.json")
      .then((res) => {
        const data = res.data;
        const petsArray = Object.entries(data).map(([id, pet]) => ({
          id,
          ...pet,
        }));
        setPets(petsArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this pet?");
    if (!confirmDelete) return;

    axios
      .delete(`https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets/${id}.json`)
      .then(() => {
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const filteredPets = pets.filter((pet) =>
    !pet.adopted &&
    (
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.species.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="main-title">Pet List</h1>
      <h2 style={{ textAlign: "center", color: "#7c4a36" }}>Available Pets</h2>

      <div style={{ textAlign: "center" }}>
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or species"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default PetList;
