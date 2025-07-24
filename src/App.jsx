import React, { useState } from "react";
import NewPetForm from "./components/NewPetForm";
import PetList from "./components/PetList";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Navbar />
      <h1 className="main-title">Pet List</h1>
      <NewPetForm onPetAdded={() => window.location.reload()} />
      <PetList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
