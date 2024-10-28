import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { FaEdit } from 'react-icons/fa';
import OrganizationTagsInput from "../Components/input-tags";

const ItemPage = () => {
  const { id } = useParams(); // Get the item ID from the URL parameters
  const [item, setItem] = useState(null);
  const [tags, setTags] = useState([]); // State for tags
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode

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
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSaveTags = async () => {
    try {
      await axios.put(
        `/api/upload/clothing/${id}`,
        { tags }, // Send updated tags to the backend
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Tags updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating tags:", error);
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
            <strong>Color:</strong> {item.color}
            <br />
            <strong>Season:</strong> {item.season}
            <br />
            <strong>Occasion:</strong> {item.occasion}
            <br />
            <strong>Tags:</strong> {tags.join(", ")}
            <span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
              <FaEdit />
            </span>
          </Card.Text>

          {/* Tags Input */}
          {isEditing ? (
            <div>
              <OrganizationTagsInput tags={tags} setTags={setTags} />
              <Button variant="primary" onClick={handleSaveTags}>
                Save Tags
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            </div>
          ) : null}

          <Button variant="secondary" onClick={handleBack} style={{ marginTop: '10px' }}>
            Back to Closet
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemPage;
