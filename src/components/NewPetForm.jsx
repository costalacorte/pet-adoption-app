import { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

function NewPetForm() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    const newPet = {
      name,
      species,
      gender,
      age: Number(age),
      image,
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
        setImage(null);

        // redirect to the list of pets
        navigate("/")
      })
      .catch((err) => {
        console.error("Error creating pet:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3 className="form-title">Add a New Pet</h3>

      <div>
        <label>Name:</label><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Species:</label><br />
        <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
      </div>

      <div>
        <label>Gender:</label><br />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>

      <div>
        <label>Age:</label><br />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>

      <div>
        <label>Image:</label><br />
        <label className="file-upload-label">
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden-file-input"
            onChange={handleImageChange}
          />
        </label>
        {image && (
          <img
            src={image}
            alt="preview"
            style={{ maxWidth: "100px", marginTop: "10px", borderRadius: "10px" }}
          />
        )}
      </div>

      <button className="add-button" type="submit">Add Pet</button>
    </form>
  );
}

export default NewPetForm;
