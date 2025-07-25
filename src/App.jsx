import React, { useState } from "react";
import NewPetForm from "./components/NewPetForm";
import PetList from "./components/PetList";
import Navbar from "./components/Navbar";
import "./App.css";
import DetailsPage from "./components/DetailsPage";
import { Route, Routes } from "react-router-dom";
import EditPetPage from "./components/EditPetPage";

function App() {
  const [searchTerm] = useState("");

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PetList searchTerm={searchTerm} />} />
        <Route path="/details/:id" element={<DetailsPage/>} />
        <Route path="/new-pet" element={<NewPetForm />} />
        <Route path="/edit/:id" element={<EditPetPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
