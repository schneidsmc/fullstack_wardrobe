import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Col, Row, Card } from "react-bootstrap";
import axios from "axios";
import SearchBar from "../Components/search-bar";

const ClosetPage = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Fetch clothing items
  const getItems = async () => {
    try {
      const response = await axios.get("/api/upload/clothing", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setClothingItems(response.data);
    } catch (error) {
      console.error("Cannot get items", error);
    }
  };

  // Fetch user details
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/info", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserName(response.data.name);
    } catch (error) {
      console.error("Cannot get user details", error);
    }
  };

  useEffect(() => {
    getItems();
    getUserDetails();
  }, []);

  const handleCardClick = (item) => {
    navigate(`/item/${item._id}`);
  };

  // Handle search query
  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/api/upload/clothing`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { query }, // Send the search query to the backend
      });
      setClothingItems(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div className="container mt-5">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/closet")}>
          Closet
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-center mb-4">
        {userName}'s Closet
        <SearchBar onSearch={handleSearch} />
      </h1>
      <div className="text-center">
        <Link to="/camera">
          <Button variant="primary" className="mb-3">
            Add Item
          </Button>
        </Link>
      </div>
      <Row>
        {Array.isArray(clothingItems) && clothingItems.length > 0 ? (
          clothingItems.map((item) => (
            <Col key={item._id} xs={3} sm={4} md={3} className="mb-4">
              <Card
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleCardClick(item)}
              >
                <Card.Img
                  src={item.image}
                  alt={`${item.category} ${item.brand} ${item.color}`}
                  className="card-img-top"
                  style={{ width: "100%", height: "100px", objectFit: "cover" }}
                />
              </Card>
            </Col>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">YOU GOT NO CLOTHES</p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default ClosetPage;
