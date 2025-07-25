import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DetailsPage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Fetch pet details from Firebase
    axios
      .get(`https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets/${id}.json`)
      .then((res) => setPet(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!pet) {
    return <p>Loading pet details...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update pet's adoption status in Firebase
    axios
      .patch(`https://pet-adoption-db-default-rtdb.europe-west1.firebasedatabase.app/pets/${id}.json`, {
        adopted: true,
      })
      .then(() => {
        alert("Thank you! You’ll receive an email shortly with the next steps for adoption.");

        // Clear form fields
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");

        // Update local pet status
        setPet((prev) => ({ ...prev, adopted: true }));
      })
      .catch((err) => console.log("Error updating adoption status:", err));
  };

  return (
    <div className="details-container">
      <h1>{pet.name}</h1>
      <p>Species: {pet.species}</p>
      <p>Age: {pet.age}</p>
      <p>Gender: {pet.gender}</p>
      <p>Status: {pet.adopted ? "Adopted" : "Available"}</p>
      <img src={pet.image} alt={pet.name} className="pet-image" />

      <h2 style={{ marginTop: "30px" }}>Adoption Request</h2>
      <form onSubmit={handleSubmit} className="adoption-form">
        <div>
          <label>Full Name:</label><br />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Phone Number:</label><br />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label>Address:</label><br />
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button type="submit">
          I want to adopt!
        </button>
      </form>
    </div>
  );
}

export default DetailsPage;
