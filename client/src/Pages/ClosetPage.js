import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Col,
  Row,
  Card,
  Spinner,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import SearchBar from "../Components/search-bar";

const ClosetPage = () => {
  // holding items and user name in state
  const [activeTab, setActiveTab] = useState("items");
  const [clothingItems, setClothingItems] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [userName, setUserName] = useState("");
  const [loadingImage, setLoadingImage] = useState([]);
  const navigate = useNavigate();

  // FETCH clothing items
  const getItems = async () => {
    try {
      // Update Fetch url after deployment
      const response = await axios.get("/api/upload/clothing", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setClothingItems(response.data);
    } catch (error) {
      console.error("Cannot get itmes", error);
    }
  };

  // Fetch for saved outfits
  const getSavedOutfits = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("/api/outfits/outfits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("token", token)
      // console.log("FETCHED OUTFITS:", response.data)
      setSavedOutfits(response.data);
    } catch (error) {
      console.error(
        "Cannot get saved outfits. Error:",
        error.response || error
      );
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(response.data)
      setUserName(response.data.name);
    } catch (error) {
      console.error("Cannot get user details", error);
    }
  };

  useEffect(() => {
    getItems();
    getUserDetails();
    getSavedOutfits();
  }, []);

  const handleCardClick = (item) => {
    navigate(`/item/${item._id}`);
  };

  const handleOutfitClick = (outfit) => {
    navigate(`/outfit/${outfit._id}`);
  };

  // Handle search query
  const handleSearch = async (query) => {
    try {
      const endpoint =
        activeTab === "items" ? "/api/upload/clothing" : "/api/outfits/outfits"; // search on outfit tab
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: query ? { query } : {}, // Send the search query to the backend
      });
      if (activeTab === "items") {
        setClothingItems(response.data);
      } else {
        setSavedOutfits(response.data);
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const imageLoad = (itemId) => {
    setLoadingImage((prev) => ({
      ...prev,
      [itemId]: false,
    }));
  };

  const imageLoadErr = (itemId) => {
    setLoadingImage((prev) => ({
      ...prev,
      [itemId]: false,
    }));
  };

  const renderClothingItems = () => (
    <Row>
      {Array.isArray(clothingItems) && clothingItems.length > 0 ? (
        clothingItems.map((item) => (
          <Col key={item._id} xs={3} sm={4} md={3} className="mb-4">
            <Card
              style={{ width: "100px", height: "100px", cursor: "pointer" }}
              onClick={() => handleCardClick(item)}
            >
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                {loadingImage[item._id] !== false && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#f8f9fa",
                    }}
                  >
                    <Spinner animation="border" size="sm" />
                  </div>
                )}
                <Card.Img
                  src={item.image}
                  alt={`${item.category} ${item.brand} ${item.color}`}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "cover",
                    opacity: loadingImage[item._id] === false ? 1 : 0,
                  }}
                  onLoad={() => imageLoad(item._id)}
                  onError={() => imageLoadErr(item._id)}
                />
              </div>
            </Card>
          </Col>
        ))
      ) : (
        <div className="col-12">
          <p className="text-center">YOU GOT NO CLOTHES</p>
        </div>
      )}
    </Row>
  );

  const renderSavedOutfits = () => (
    <Row>
      {Array.isArray(savedOutfits) && savedOutfits.length > 0 ? (
        savedOutfits.map((outfit) => (
          <Col key={outfit._id} xs={3} sm={4} md={3} className="mb-4">
            <Card
              style={{
                width: "100px",
                height: "100px",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => handleOutfitClick(outfit)}
            >
              <Card.Img
              src={outfit.top.length > 0 ? outfit.top[0].image : ""}
              alt={outfit.name}
              style={{
                width: "100%",
                height: "60%",
                objectFit: "cover",
              }}
            />
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "center", 
                alignItems: "center", 
                height: "40%", 
                textAlign: "center", 
                padding: "0.5rem", 
              }}
            >
              <div>{outfit.name}</div>
            </Card.Body>
          </Card>
        </Col>
      ))
    ) : (
        <div className="col-12">
          <p className="text-center">YOU GOT NO OUTFITS</p>
        </div>
      )}
    </Row>
  );

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

      <div className="text-center mb-4">
        <Link to="/camera">
          <Button variant="primary" className="me-3 mb-3">
            Add Item
          </Button>
        </Link>

        <Link to="/bycategory">
          <Button variant="primary" className="mb-3">
            Create Outfit
          </Button>
        </Link>
      </div>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "items"}
            onClick={() => setActiveTab("items")}
          >
            Clothes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "outfits"}
            onClick={() => setActiveTab("outfits")}
          >
            Outfits
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "items" ? renderClothingItems() : renderSavedOutfits()}
    </div>
  );
};

export default ClosetPage;
