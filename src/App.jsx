import React, { useState } from "react";
import NewPetForm from "./components/NewPetForm";
import PetList from "./components/PetList";
import Navbar from "./components/Navbar";
import "./App.css";
import DetailsPage from "./components/DetailsPage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [searchTerm] = useState("");

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PetList searchTerm={searchTerm} />} />
        <Route path="/details" element={<DetailsPage/>} />
        <Route path="/new-pet" element={<NewPetForm />} />
      </Routes>
      
    </div>
  );
}

export default App;
