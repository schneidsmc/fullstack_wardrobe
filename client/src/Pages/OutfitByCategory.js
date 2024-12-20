import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OutfitByCategory.css";
import { Button, Breadcrumb } from "react-bootstrap";

const OutfitGrid = () => {
    const navigate = useNavigate();
    const [tops, setTops] = useState([]);
    const [bottoms, setBottoms] = useState([]);
    const [shoes, setShoes] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [selectedOutfit, setSelectedOutfit] = useState({
        top: null,
        bottom: null,
        shoes: null,
        accessories: null,
    });

    useEffect(() => {
        fetchClothingItems();
    }, []);

    const fetchClothingItems = async () => {
        try {
        const response = await axios.get("/api/upload/clothing", {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = response.data;
        console.log("response.data", response.data)
        setTops(data.filter((item) => item.category === "top" || item.category === "tank" || item.category === "sweater" || item.category === "long sleeve" || item.category === "short sleeve" || item.category === "jacket" || item.category === "tube top"));
        setBottoms(data.filter((item) => item.category === "bottom" || item.category === "shorts" || item.category === "pants" || item.category === "skirts"));
        setShoes(data.filter((item) => item.category === "shoes" || item.category === "heels" || item.category === "boots" || item.category === "sandals" || item.category === "sneakers"));
        setAccessories(data.filter((item) => item.category === "accessories" || item.category === "necklace" || item.category === "earrings" || item.category === "bag" || item.category === "hat" || item.category === "scarf" || item.category === "bracelet" || item.category === "ring" || item.category === "sunglasses"));
        } catch (error) {
        console.error("Error fetching clothing:", error);
        }}
    const handleSelection = (item, category) => {
        setSelectedOutfit((prev) => ({
            ...prev,
            [category]: prev[category]?._id === item._id ? null : item,
        }))
    }

    const handleSaveOutfit = async () => {
        try {
            const outfitData = {
                name: "My Outfit",
                top: selectedOutfit.top._id,
                bottom: selectedOutfit.bottom._id,
                shoes: selectedOutfit.shoes._id,
                accessories: selectedOutfit.accessories?._id
            }
            console.log("outfitData:", outfitData)
            const response = await axios.post("/api/outfits", outfitData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if (response.status === 201) {
                alert("outfit saved");
                setSelectedOutfit({
                    top: null,
                    bottom: null,
                    shoes: null,
                    accessories: null
                })
            }
        } catch (error) {
            console.error("Error saving outfit:", error);
            alert("Failed to save outfit")
        }
    };

    const handlePreviewClick = (category) => {
        setSelectedOutfit((prev) => ({
            ...prev,
            [category]: null,
        }));
    }
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
    }

export default OutfitGrid