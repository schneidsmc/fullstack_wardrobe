import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Col, Row, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import SearchBar from "../Components/search-bar";

const ClosetPage = () => {
  // holding items and user name in state
  const [clothingItems, setClothingItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [loadingImage, setLoadingImage] = useState([]);
  const navigate = useNavigate();


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
      console.log("API Response:", response.data);
      setClothingItems(response.data);
    } catch (error) {
      console.error("Cannot get itmes", error);
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
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };


  const handleDelete = async () => {
      console.log("selected item for deletions:", selectedItem);
      console.log("selected item for deletions:", selectedItem._id);
  
      if (!selectedItem || !selectedItem._id) {
        console.error("no item delected or ID is missing");
        return;
      }
      try {
        const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
        await axios.delete(`/api/upload/clothing/${selectedItem._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Deleting item with ID:", selectedItem._id);
        // Remove deleted item from state
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedItem._id),
        );
        handleClose(); // Close the modal
      } catch (error) {
        console.error("OOPE Failed to delete item", error);
      }
    };
    const handleSearch = async (query) => {
      try {
          const response = await axios.get(`/api/upload/clothing`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              params: {
                  query: query, // Send the query to the backend
              },
          });
          
          // Update clothing items based on the search results
          setClothingItems(response.data);
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
            <Col key={item._id} xs={3} sm={4} md={3} className="mb-4">
              <Card
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleCardClick(item)}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Show spinner while image is loading */}
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
                  <br />
                  <strong>Tags:</strong> {selectedItem.tags?.join(',')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ClosetPage;



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Breadcrumb, Button, Col, Row, Card } from "react-bootstrap";
// import axios from "axios";
// import SearchBar from "../Components/search-bar";

// const ClosetPage = () => {
//   const [clothingItems, setClothingItems] = useState([]);
//   const [userName, setUserName] = useState("");
//   const [showModal, setShowModal] = useState(false); //state for showing the modal
//   const [selectedItem, setSelectedItem] = useState(null);
//   const navigate = useNavigate();

//   // Fetch clothing items
//   const getItems = async () => {
//     try {
//       const response = await axios.get("/api/upload/clothing", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setClothingItems(response.data);
//     } catch (error) {
//       console.error("Cannot get items", error);
//     }
//   };

//   // Fetch user details
//   const getUserDetails = async () => {
//     try {
//       const response = await axios.get("/api/users/info", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setUserName(response.data.name);
//     } catch (error) {
//       console.error("Cannot get user details", error);
//     }
//   };

//   useEffect(() => {
//     getItems();
//     getUserDetails();
//   }, []);

//   const handleCardClick = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setSelectedItem(null);
//   };


//   const handleDelete = async () => {
//       console.log("selected item for deletions:", selectedItem);
//       console.log("selected item for deletions:", selectedItem._id);
  
//       if (!selectedItem || !selectedItem._id) {
//         console.error("no item delected or ID is missing");
//         return;
//       }
//       try {
//         const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found in localStorage");
//         return;
//       }
//         await axios.delete(`/api/upload/clothing/${selectedItem._id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         console.log("Deleting item with ID:", selectedItem._id);
//         // Remove deleted item from state
//         setClothingItems(
//           clothingItems.filter((item) => item._id !== selectedItem._id),
//         );
//         handleClose(); // Close the modal
//       } catch (error) {
//         console.error("OOPE Failed to delete item", error);
//       }
//     };
//     const handleSearch = async (query) => {
//       try {
//           const response = await axios.get(`/api/upload/clothing`, {
//               headers: {
//                   Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//               params: {
//                   query: query, // Send the query to the backend
//               },
//           });
          
//           // Update clothing items based on the search results
//           setClothingItems(response.data);
//       } catch (error) {
//           console.error("Error fetching search results", error);
//       }
//   };

//   return (
//     <div className="container mt-5">
//       <Breadcrumb>
//         <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
//         <Breadcrumb.Item onClick={() => navigate("/closet")}>
//           Closet
//         </Breadcrumb.Item>
//       </Breadcrumb>
//       <h1 className="text-center mb-4">
//         {userName}'s Closet
//         <SearchBar onSearch={handleSearch} />
//       </h1>
//       <div className="text-center">
//         <Link to="/camera">
//           <Button variant="primary" className="mb-3">
//             Add Item
//           </Button>
//         </Link>
//       </div>
//       <Row>
//         {Array.isArray(clothingItems) && clothingItems.length > 0 ? (
//           clothingItems.map((item) => (
//             <Col key={item._id} xs={3} sm={4} md={3} className="mb-4">
//               <Card
//                 style={{ width: "100px", height: "100px", cursor: "pointer" }}
//                 onClick={() => handleCardClick(item)}
//               >
//                 <Card.Img
//                   src={item.image}
//                   alt={`${item.category} ${item.brand} ${item.color}`}
//                   className="card-img-top"
//                   style={{ width: "100%", height: "100px", objectFit: "cover" }}
//                 />
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <div className="col-12">
//             <p className="text-center">YOU GOT NO CLOTHES</p>
//           </div>
//         )}
//       </Row>
//     </div>
//   );
// };

// export default ClosetPage;
