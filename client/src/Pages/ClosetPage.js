import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const ClosetPage = () => {
  // holding items and user name in state
  const [clothingItems, setClothingItems] = useState([]);
  // const [userName, setUserName] = useState("");

  // FETCH
  const getItems = async () => {
    try {
      const response = await axios.get("/api/upload/clothing", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("token", `${localStorage.getItem("token")}`);
      console.log("API Response:", response.data);
      setClothingItems(response.data);
    } catch (error) {
      console.error("Cannot get itmes", error);
    }
  };

  //   const getUserDetails = async () => {
  //     try {
  //     const response = await axios.get('/api/users', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       }
  //     });
  //       setUserName(response.data.name);
  //     } catch (error) {
  //     console.error('Cannot get user details', error)
  //   }
  // }

  useEffect(() => {
    getItems();
    // getUserDetails();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        {/* {userName}'s Closet */}
        CLOSET
      </h1>
      <div className="text-center">
        <Link to="/camera">
          <Button variant="primary" className="mb-3">Add Item</Button>
        </Link>
      </div>
      <ul>
        {Array.isArray(clothingItems) && clothingItems.length > 0 ? (
          clothingItems.map((item) => (
            <li key={item._id}>
              <p>Category: {item.category}</p>
              <p>Brand: {item.brand}</p>
              <p>Size: {item.size}</p>
              <p>Color: {item.color}</p>
              <div className="card"></div>
                <img
                  src={item.image}
                  alt={`${item.category} ${item.brand} ${item.color}`}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body"></div>
              <p className="card-text">
                    <strong>Category:</strong> {item.category}<br />
                    <strong>Size:</strong> {item.size}<br />
                    <strong>Color:</strong> {item.color}
                    <strong>Brand:</strong> {item.color}
              </p>
            </li>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">YOU GOT NO CLOTHES</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ClosetPage;
