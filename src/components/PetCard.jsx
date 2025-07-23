function PetCard({ pet, onDelete }) {
  return (
    <div
      style={{
        width: "200px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={pet.imageUrl || "https://via.placeholder.com/150"}
        alt={pet.name}
        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
      />
      <h3>{pet.name}</h3>
      <p>
        {pet.gender} | {pet.species}
      </p>
      <p>{pet.age} years old</p>
      <button onClick={() => onDelete(pet.id)} style={{ backgroundColor: "#e74c3c", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
        Delete
      </button>
    </div>
  );
}

export default PetCard;
