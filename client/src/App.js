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
// import Header
// import Footer

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/api/data")
      .then((response) => {
        console.log(response.data);
        setData(response.data.message);
      })
      .catch((error) => {
        console.error("somethin didnt work", error);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/closet">Closet</Link>
            </li>
            <li>
              <Link to="/camera">Add Item</Link>
            </li>
            <li>
              <Link to="/item">Item</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/closet" element={<ClosetPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/item" element={<ItemPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
