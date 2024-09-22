import React, { useState, useEffect } from "react";
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

      <ul>
        {Array.isArray(clothingItems) && clothingItems.length > 0 ? (
          clothingItems.map((item) => (
            <li key={item._id}>
              <p>Category: {item.category}</p>
              <p>Brand: {item.brand}</p>
              <p>Size: {item.size}</p>
              <p>Color: {item.color}</p>
              <img
                src={item.image}
                alt={`${item.category} ${item.brand} ${item.color}`}
                width="100"
              />
            </li>
          ))
        ) : (
          <p>YOU GOT NO CLOTHES</p>
        )}
      </ul>
    </div>
  );
};

export default ClosetPage;
