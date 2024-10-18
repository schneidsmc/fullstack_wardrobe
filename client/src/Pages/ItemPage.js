import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate is used to redirect after delete
import axios from "axios";
import { Card, Button, Container } from "react-bootstrap";


const ItemPage = () => {
  const { id } = useParams();  
  const [item, setItem] = useState(null);
  const navigate = useNavigate(); 
  
  const getItemDetails = async () => {
    try {
      const response = await axios.get(`/api/upload/clothing/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(response.data)
      setItem(response.data);
    } catch (error) {
      console.error("Cannot get item details", error);
    }
  };

  useEffect(() => {
    //getItems();
    getItemDetails();
  }, [id]); //triggers useEffeect when the id changes

   //Delete item
   const handleDelete = async () => {
    console.log("selected item for deletions:", item);
    console.log("selected item for deletions:", item._id);

    if (!item || !item._id) {
      console.error("No item selected or ID is missing");
      return;
    }
    try {
      await axios.delete(`/api/upload/clothing/${item._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Deleting item with ID:", item._id);
      navigate("/closet"); // Redirect the user back to the closet after deletion
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <Container className="mt-5">
      {item ? (
        <Card className='text-center'>
            <Card.Title>Item Details</Card.Title>
          <Card>
            <Card>
              <Card.Img
                variant="top"
                src={item.image}
                alt={`${item.category} ${item.brand} ${item.color}`}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Text style={{ fontSize: "14px" }}>
                  <strong>Category:</strong> {item.category}
                  <br />
                  <strong>Color:</strong> {item.color}
                  <br />
                  <strong>Season:</strong> {item.season}
                  <br />
                  <strong>Occasion:</strong> {item.occasion}
                </Card.Text>
              </Card.Body>
            </Card>
          <Card.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Card.Footer>
        </Card>
        </Card> 
        ) : (
        <p>Loading item details...</p>
      )}
      </Container>
  );
};

export default ItemPage;
