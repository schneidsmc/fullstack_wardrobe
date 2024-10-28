import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./Pages/LoginPage";
import RegistrationForm from "./Pages/RegisterPage";
import ItemPage from "./Pages/ItemPage";
import ClosetPage from "./Pages/ClosetPage";
import CameraPage from "./Pages/add-item";
import "./App.css";
import Header from "./Components/Header";
import HelloWorld from "./Components/HelloWorld";
// import Footer

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/api/data")
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        console.error("somethin didnt work", error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/closet" element={<ClosetPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/item/:id" element={<ItemPage />} /> {/* Route for ItemPage */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
