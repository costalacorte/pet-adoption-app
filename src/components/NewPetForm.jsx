import { useState } from "react";
import axios from "axios";

function NewPetForm({ onPetAdded }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(""); // ⬅️ novo estado

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPet = {
      name,
      species,
      gender,
      age: Number(age),
      image, // ⬅️ adiciona no objeto enviado
      adopted: false,
    };

    axios
      .post(
        "https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets.json",
        newPet
      )
      .then(() => {
        alert("Pet added successfully!");
        setName("");
        setSpecies("");
        setAge("");
        setGender("");
        setImage(""); // limpa o campo da imagem
        if (onPetAdded) onPetAdded();
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingLeft: "20px" }}>
      <h3>Adicionar Novo Pet</h3>
      <div>
        Nome:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Espécie:
        <input value={species} onChange={(e) => setSpecies(e.target.value)} />
      </div>
      <div>
        Sexo:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Selecionar</option>
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
        </select>
      </div>
      <div>
        Idade:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        Imagem (URL):
        <input value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <button>Adicionar Pet</button>
    </form>
  );
}

export default NewPetForm;
