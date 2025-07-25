import { Link } from "react-router-dom";

function PetCard({ pet, onDelete }) {
  console.log("Pet ID:", pet.id);

  return (
    <div className="pet-card">
      <img
        src={pet.image || "https://via.placeholder.com/150"}
        alt={pet.name}
        className="pet-image"
      />

      <h3>{pet.name}</h3>

      <p>
        {pet.gender} | {pet.species}
      </p>
      <p>{pet.age} years old</p>

      <div className="button-group">
        <Link to={`/details/${pet.id}`}>
          <button className="view-button">View Details</button>
        </Link>

        <Link to={`/edit/${pet.id}`}>
          <button className="edit-button">Edit</button>
        </Link>

        <button className="delete-button" onClick={() => onDelete(pet.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default PetCard;
