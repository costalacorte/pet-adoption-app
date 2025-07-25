import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPetPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets/${id}.json`)
      .then((response) => {
        setPet(response.data);
      })
      .catch((err) => console.log("Error loading pet:", err));
  }, [id]);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets/${id}.json`, pet)
      .then(() => {
        alert("Pet updated successfully!");
        navigate("/");
      })
      .catch((err) => console.log("Error updating pet:", err));
  };

  if (!pet) return <p>Loading...</p>;

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Edit Pet</h3>
      <input type="text" name="name" value={pet.name} onChange={handleChange} />
      <input type="text" name="species" value={pet.species} onChange={handleChange} />
      <input type="text" name="gender" value={pet.gender} onChange={handleChange} />
      <input type="number" name="age" value={pet.age} onChange={handleChange} />
      <button type="submit">Update Pet</button>
    </form>
  );
}

export default EditPetPage;