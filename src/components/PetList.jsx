import { useEffect, useState } from "react";
import axios from "axios";

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
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div style={{ padding: "20px" }}>
    <h2>Pet List</h2>
    <input
      type="text"
      placeholder="Search by name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <ul style={{ listStyle: "none", padding: 0 }}>
      {filteredPets.map((pet) => (
        <li key={pet.id} style={{ marginBottom: "20px" }}>
          {pet.image && (
            <img
              src={pet.image}
              alt={pet.name}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}
          <p>
            <strong>{pet.name}</strong> ({pet.species}, {pet.gender}) - {pet.age}{" "}
            years
          </p>
          <button onClick={() => handleDelete(pet.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default PetList;