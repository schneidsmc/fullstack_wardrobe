import mongoose from "mongoose";

const clothingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    season: {
      type: String,
    },
    occasion: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
    collection: "clothingDb",
  },
);

// const clothingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     category: {
//       type: String,
//       enum: [
//         "tank",
//         "sweater",
//         "long sleeve",
//         "short sleeve",
//         "jacket",
//         "tube top", // Tops
//         "shorts",
//         "pants",
//         "skirt", // Bottoms
//         "heels",
//         "boots",
//         "sandals",
//         "sneakers", // Shoes
//         "necklace",
//         "earrings",
//         "bag",
//         "scarf",
//         "hat",
//         "bracelet",
//         "ring",
//         "sunglasses", // Accessories
//       ],
//       required: true,
//     },
//     color: {
//       type: String,
//       enum: [
//         "black",
//         "white",
//         "gray",
//         "red",
//         "green",
//         "yellow",
//         "blue",
//         "brown",
//         "pink",
//         "beige",
//         "purple",
//         "orange",
//         "gold",
//         "silver",
//         "multicolor",
//       ],
//       required: true,
//     },
//     season: {
//       type: String,
//       enum: ["spring", "summer", "autumn", "winter"],
//       required: true,
//     },
//     occasion: {
//       type: String,
//       enum: [
//         "casual",
//         "work",
//         "formal",
//         "activewear",
//         "vacation",
//         "party",
//         "holiday",
//       ],
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     collection: "clothingDb",
//   },
// );

const Clothing = mongoose.model("Clothing", clothingSchema);

export default Clothing;
