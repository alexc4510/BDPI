import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Plants from "./components/Plants";
import Characteristics from "./components/Characteristics";
import Associations from "./components/Associations";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/characteristics" element={<Characteristics />} />
        <Route path="/associations" element={<Associations />} />
      </Routes>
    </Router>
  );
}

export default App;
