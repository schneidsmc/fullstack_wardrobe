import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";
import axios from "axios";
import SearchBar from "../Components/search-bar";

const ClosetPage = () => {
  // holding items and user name in state
  const [clothingItems, setClothingItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false); //state for showing the modal
  const [selectedItem, setSelectedItem] = useState(null);

  // FETCH
  const getItems = async () => {
    try {
            // Update Fetch url after deployment
      const response = await axios.get("/api/upload/clothing", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("token", `${localStorage.getItem("token")}`);
      // console.log("API Response:", response.data);
      setClothingItems(response.data);
    } catch (error) {
      console.error("Cannot get itmes", error);
    }
  };

    const getUserDetails = async () => {
      try {
      const response = await axios.get('/api/users/info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      // console.log(response.data)
        setUserName(response.data.name);
      } catch (error) {
      console.error('Cannot get user details', error)
    }
  }

  useEffect(() => {
    getItems();
    getUserDetails();
  }, []);

  const handleCardClick =(item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  //Delete item - failing
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/upload/clothing/${selectedItem._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove deleted item from state
      setClothingItems(clothingItems.filter(item => item._id !== selectedItem._id));
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  //Search
  const handleSearch = (query) => {
    console.log('Search query:', query);
};

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">

        {userName}'s Closet
        {/* CLOSET */}
        <SearchBar onSearch={handleSearch}/>
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
            <Col key={item._id}  xs={3} sm={4} md={3} className="mb-4">
              <Card style={{ width: "100px", height: "100px", cursor: "pointer"}}
                onClick={() => handleCardClick(item)}
              >
              <Card.Img
                src={item.image} 
                alt={`${item.category} ${item.brand} ${item.color}`}
                className="card-img-top"
                style={{width: "100%", height: "100px", objectFit: "cover" }}
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
            {/* Modal time baby*/}
            {selectedItem && (
              <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <Card>
              <Card.Img
                variant="top"
                src={selectedItem.image}
                alt={`${selectedItem.category} ${selectedItem.brand} ${selectedItem.color}`}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
              <Card.Text style={{ fontSize: "14px" }}>
                <strong>Category:</strong> {selectedItem.category}
                <br />
                <strong>Color:</strong> {selectedItem.color}
                <br />
                <strong>Season:</strong> {selectedItem.season}
                <br />
                <strong>Occasion:</strong> {selectedItem.occasion}
              </Card.Text>
              </Card.Body>
              </Card>
              </Modal.Body>
              <Modal.Footer>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
Delete
            </Button>
          </Modal.Footer>
              </Modal>
            )}

    </div>
  );
};

export default ClosetPage;
