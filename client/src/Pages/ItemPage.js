import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import OrganizationTagsInput from "../Components/input-tags";

const ItemPage = () => {
  const { id } = useParams(); // Get the item ID from the URL parameters
  const [item, setItem] = useState(null);
  const [tags, setTags] = useState([]); // State for tags
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [season, setSeason] = useState("");
  const [occasion, setOccasion] = useState("");

  const categoryOptions = [
    "tank",
    "sweater",
    "long sleeve",
    "short sleeve",
    "jacket",
    "tube top", // Tops
    "shorts",
    "pants",
    "skirt", // Bottoms
    "heels",
    "boots",
    "sandals",
    "sneakers", // Shoes
    "necklace",
    "earrings",
    "bag",
    "scarf",
    "hat",
    "bracelet",
    "ring",
    "sunglasses", // Accessories
  ];
  const colorOptions = [
    "black",
    "white",
    "gray",
    "red",
    "green",
    "yellow",
    "blue",
    "brown",
    "pink",
    "beige",
    "purple",
    "orange",
    "gold",
    "silver",
    "multicolor",
  ];
  const seasonOptions = ["spring", "summer", "autumn", "winter"];
  const occasionOptions = [
    "casual",
    "work",
    "formal",
    "activewear",
    "vacation",
    "party",
    "holiday",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/api/upload/clothing/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setItem(response.data);
        setTags(response.data.tags || []); // Set initial tags
        setCategory(response.data.category);
        setColor(response.data.color);
        setSeason(response.data.season);
        setOccasion(response.data.occasion);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSaveItem = async () => {
    try {
      await axios.put(
        `/api/upload/clothing/${id}`,
        { category, color, season, occasion, tags }, // Send updated tags to the backend
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      alert("Item updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (!item) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{item.category} Details</h1>
      <Card>
        <Card.Img
          variant="top"
          src={item.image}
          alt={`${item.category} ${item.brand} ${item.color}`}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Text style={{ fontSize: "14px" }}>
            <strong>Color:</strong> {color}
            <br />
            <strong>Season:</strong> {season}
            <br />
            <strong>Occasion:</strong> {occasion}
            <br />
            <strong>Tags:</strong> {tags.join(", ")}
            <span
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
            </span>
          </Card.Text>

          {/* Tags Input */}
          {isEditing && (
            <div>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  as="select"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">Select Color</option>
                  {colorOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="season">
                <Form.Label>Season</Form.Label>
                <Form.Control
                  as="select"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                >
                  <option value="">Select Season</option>
                  {seasonOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="occasion">
                <Form.Label>Occasion</Form.Label>
                <Form.Control
                  as="select"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                >
                  <option value="">Select Occasion</option>
                  {occasionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <OrganizationTagsInput tags={tags} setTags={setTags} />

              <Button variant="primary" onClick={handleSaveItem}>
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </div>
          )}

          <Button
            variant="secondary"
            onClick={handleBack}
            style={{ marginTop: "10px" }}
          >
            Back to Closet
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemPage;
