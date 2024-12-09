import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OutfitByCategory.css";
import shirt from "../SampleClothes/shirt.png";
import blouse from "../SampleClothes/blouse.png";
import pants from "../SampleClothes/pants.png";
import shoes from "../SampleClothes/shoes.png";
import scarf from "../SampleClothes/scarf.png";
import { Button, Breadcrumb } from "react-bootstrap";

// Sample Items
const sampleTops = [
  {
    _id: "t1",
    category: "top",
    image: shirt,
    name: "Blue T-Shirt",
  },
  { _id: "t2", category: "top", image: blouse, name: "Blouse" },
];

const sampleBottoms = [
  {
    _id: "b1",
    category: "bottom",
    image: pants,
    name: "Cargo Pants",
  },
];

const sampleShoes = [
  {
    _id: "s1",
    category: "shoes",
    image: shoes,
    name: "White Sneakers",
  },
];

const sampleAccessories = [
  {
    _id: "a1",
    category: "accessories",
    image: scarf,
    name: "Hipster Scarf",
  },
];

const OutfitGrid = () => {
  // sample data
  const navigate = useNavigate();
  const [tops] = useState(sampleTops);
  const [bottoms] = useState(sampleBottoms);
  const [shoes] = useState(sampleShoes);
  const [accessories] = useState(sampleAccessories);
  const [selectedOutfit, setSelectedOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    accessories: null,
  });
  //  const navigate = useNavigate();
  //   const [tops, setTops] = useState([]);
  //   const [bottoms, setBottoms] = useState([]);
  //   const [shoes, setShoes] = useState([]);
  //   const [accessories, setAccessories] = useState([]);
  //   const [selectedOutfit, setSelectedOutfit] = useState({
  //     top: null,
  //     bottom: null,
  //     shoes: null,
  //     accessories: null,
  //   });

  //   useEffect(() => {
  //     fetchClothingItems();
  //   }, []);

  //   const fetchClothingItems = async () => {
  //     try {
  //       const response = await axios.get("/api/upload/clothing", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });

  //       const data = response.data;
  //       setTops(data.filter((item) => item.category === "top"));
  //       setBottoms(data.filter((item) => item.category === "bottom"));
  //       setShoes(data.filter((item) => item.category === "shoes"));
  //       setAccessories(data.filter((item) => item.category === "accessories"));
  //     } catch (error) {
  //       console.error("Error fetching clothing:", error);
  //     }
  // };

  // click items in preview section to deselect them
  const handleSelection = (item, category) => {
    setSelectedOutfit((prev) => ({
      ...prev,
      [category]: prev[category]?._id === item._id ? null : item,
    }));
  };

  // save outfit - not currently working
  const handleSaveOutfit = async () => {
    try {
      const outfitData = {
        name: "My Outfit", // add a name input field
        items: {
          top: selectedOutfit.top?._id,
          bottom: selectedOutfit.bottom?._id,
          shoes: selectedOutfit.shoes?._id,
          accessories: selectedOutfit.accessories?._id,
        },
      };

      const response = await axios.post("/api/outfits", outfitData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        alert("Outfit saved successfully!");
        setSelectedOutfit({
          top: null,
          bottom: null,
          shoes: null,
          accessories: null,
        });
      }
    } catch (error) {
      console.error("Error saving outfit:", error);
      alert("Failed to save outfit. Please try again.");
    }
  };

  const handlePreviewClick = (category) => {
    setSelectedOutfit((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  return (
    <div className="container mt-5">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/closet")}>
          Closet
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/bycategory")}>
          Create Outfit
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="grid-container">
        {/* Preview section */}
        <h2>Create New Outift:</h2>
        <div className="preview-items">
          {selectedOutfit.accessories && (
            <img
              src={selectedOutfit.accessories.image}
              alt="Selected accessories"
              onClick={() => handlePreviewClick("accessories")}
              style={{ cursor: "pointer" }}
            />
          )}
          {selectedOutfit.top && (
            <img
              src={selectedOutfit.top.image}
              alt="Selected top"
              onClick={() => handlePreviewClick("top")}
              style={{ cursor: "pointer" }}
            />
          )}
          {selectedOutfit.bottom && (
            <img
              src={selectedOutfit.bottom.image}
              alt="Selected bottom"
              onClick={() => handlePreviewClick("bottom")}
              style={{ cursor: "pointer" }}
            />
          )}
          {selectedOutfit.shoes && (
            <img
              src={selectedOutfit.shoes.image}
              alt="Selected shoes"
              onClick={() => handlePreviewClick("shoes")}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>

        <Button
          padding="10px 20px"
          margin="20px 0"
          variant="primary"
          className="mb-3"
          onClick={handleSaveOutfit}
          disabled={
            !selectedOutfit.top &&
            !selectedOutfit.bottom &&
            !selectedOutfit.shoes
          }
        >
          Save Outfit
        </Button>

        {/* Selection Grid */}
        <div className="selection-grid">
          <div className="category-section">
            <h3>Tops</h3>
            <div className="items-grid">
              {tops.map((top) => (
                <div
                  key={top._id}
                  className={`grid-item ${selectedOutfit.top?._id === top._id ? "selected" : ""}`}
                  onClick={() => handleSelection(top, "top")}
                >
                  <img src={top.image} alt={top.category} />
                </div>
              ))}
            </div>
          </div>

          <div className="category-section">
            <h3>Bottoms</h3>
            <div className="items-grid">
              {bottoms.map((bottom) => (
                <div
                  key={bottom._id}
                  className={`grid-item ${selectedOutfit.bottom?._id === bottom._id ? "selected" : ""}`}
                  onClick={() => handleSelection(bottom, "bottom")}
                >
                  <img src={bottom.image} alt={bottom.category} />
                </div>
              ))}
            </div>
          </div>

          <div className="category-section">
            <h3>Shoes</h3>
            <div className="items-grid">
              {shoes.map((shoe) => (
                <div
                  key={shoe._id}
                  className={`grid-item ${selectedOutfit.shoes?._id === shoe._id ? "selected" : ""}`}
                  onClick={() => handleSelection(shoe, "shoes")}
                >
                  <img src={shoe.image} alt={shoe.category} />
                </div>
              ))}
            </div>
          </div>

          <div className="category-section">
            <h3>Accessories</h3>
            <div className="items-grid">
              {accessories.map((accessories) => (
                <div
                  key={accessories._id}
                  className={`grid-item ${selectedOutfit.accessories?._id === accessories._id ? "selected" : ""}`}
                  onClick={() => handleSelection(accessories, "accessories")}
                >
                  <img src={accessories.image} alt={accessories.category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitGrid;
