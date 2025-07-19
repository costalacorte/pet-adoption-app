import { useState } from "react";
import axios from "axios";

function NewPetForm({ onPetAdded }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(""); // ⬅️ novo estado

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPet = {
      name,
      species,
      gender, // ⬅️ adiciona no objeto enviado
      age: Number(age),
      adopted: false,
    };

    axios
      .post("https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets.json", newPet)
      .then(() => {
        alert("Pet added successfully!");
        setName("");
        setSpecies("");
        setAge("");
        setGender(""); // ⬅️ limpa campo após envio

        if (onPetAdded) {
          onPetAdded();
        }
      })
      .catch((err) => {
        console.error("Error adding pet:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Novo Pet</h2>
      <label>
        Nome:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Espécie:
        <input value={species} onChange={(e) => setSpecies(e.target.value)} />
      </label>
      <br />
      <label>
         Sexo:
     <select value={gender} onChange={(e) => setGender(e.target.value)}>
      <option value="">Selecionar</option>
      <option value="Feminino">Feminino</option>
      <option value="Masculino">Masculino</option>
  </select>
</label>
      <br />
      <label>
        Idade:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Adicionar Pet</button>
    </form>
  );
}

export default NewPetForm;
