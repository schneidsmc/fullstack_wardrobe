import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const OutfitPage = () => {
  const { id } = useParams(); // Get the item ID from the URL parameters
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    const fetchOutfitDetails = async () => {
      try {
        const response = await axios.get(`/api/outfits/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched outfit:", response.data)
        setOutfit(response.data);
      } catch (error) {
        console.error("Error fetching outfit details:", error);
      }
    };
    fetchOutfitDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleDelete = async () => {
    // console.log("selected item for deletions:", selectedItem);
    // console.log("selected item for deletions:", selectedItem._id);
    if (!outfit || !outfit._id) {
      console.error("no outfit deleted or ID is missing");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this outfit?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      await axios.delete(`/api/outfits/${outfit._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("Deleting item with ID:", selectedItem._id);
      // Remove deleted item from state
      handleBack();
    } catch (error) {
      console.error("OOPE Failed to delete outfit", error);
    }
  };

  return (
    <div className="container mt-5">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/closet")}>
          Closet
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Outfit Details</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-center mb-4">{outfit.name}</h1>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h1>{outfit.name}</h1>
            <Row>
              <img src={outfit.top.image} alt="Selected top" />
              <img src={outfit.bottom.image} alt="Selected bottom" />
              <img src={outfit.shoes.image} alt="Selected shoes" />
              <img src={outfit.accessories.image} alt="Selected accessories" />
            </Row>
            <div>
              <Button variant="secondary" onClick={handleBack} className="me-2">
                Back to Closet
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OutfitPage;
