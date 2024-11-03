import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
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

  const handleDelete = async () => {
    // console.log("selected item for deletions:", selectedItem);
    // console.log("selected item for deletions:", selectedItem._id);

    if (!item || !item._id) {
      console.error("no item delected or ID is missing");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?",
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
      await axios.delete(`/api/upload/clothing/${item._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("Deleting item with ID:", selectedItem._id);
      // Remove deleted item from state
      handleBack();
    } catch (error) {
      console.error("OOPE Failed to delete item", error);
    }
  };

  return (
    <div className="container mt-5">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/closet")}>
          Closet
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{item?.category} Details</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-center mb-4">{item.category} Details</h1>
      <Card>
        <Card.Img
          variant="top"
          src={item.image}
          alt={`${item.category} ${item.brand} ${item.color}`}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Text style={{ fontSize: "14px", position: "relative" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setIsEditing((prevState) => !prevState)}
            >
              {" "}
              Edit Item <FaEdit style={{ marginLeft: "5px" }} />
              <br />
            </div>
            <strong>Color:</strong> {color}
            <br />
            <strong>Season:</strong> {season}
            <br />
            <strong>Occasion:</strong> {occasion}
            <br />
            <strong>Custom Tags:</strong> {tags.join(", ")}
            <span
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => setIsEditing((prevState) => !prevState)}
            >
              <FaPlusCircle />
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
              <Form.Group>
                <Form.Label>Custom Tags</Form.Label>
                <OrganizationTagsInput tags={tags} setTags={setTags} />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleSaveItem}
                style={{ marginTop: "10px" }}
              >
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
                style={{ marginTop: "10px", marginLeft: "10px" }}
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
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemPage;
