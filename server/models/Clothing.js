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

const Clothing = mongoose.model("Clothing", clothingSchema);

export default Clothing;
