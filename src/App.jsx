import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets.json")
      .then((response) => {
        const data = response.data;
        const petsArray = Object.entries(data).map(([id, pet]) => ({
          id,
          ...pet
        }));
        setPets(petsArray);
      })
      .catch((error) => console.log("Erro ao buscar pets:", error));
  }, []);

  return (
    <div className="App">
      <h1>Lista de Pets</h1>
      {pets.length === 0 ? (
        <p>Carregando pets...</p>
      ) : (
        <ul>
          {pets.map((pet) => (
            <li key={pet.id}>
              <strong>{pet.name}</strong> ({pet.species}) - {pet.age} anos
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

