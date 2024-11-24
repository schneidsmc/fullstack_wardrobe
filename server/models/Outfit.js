import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        top: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
            required: true,
        },
        bottom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
            required: true,
        },
        shoes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
            required: true,
        },
        accessories: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
        },
    },
    {
        timestamps: true,
        collection: "outfitDb",
    }
);

const Outfit = mongoose.model("Outfit", outfitSchema)

export default Outfit