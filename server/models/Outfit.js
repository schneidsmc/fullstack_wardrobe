import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        top: [{
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
            required: true},
            image: {type: String, required: true}
        }],
        bottom: [{
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
            required: true},
            image: {type: String, required: true}
        }],
        shoes: [{
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
            required: true},
            image: {type: String, required: true},
        }],
        accessories: [{
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing"},
            image: {type: String, required: true}
        }],
    },
    {
        timestamps: true,
        collection: "outfitDb",
    }
);

const Outfit = mongoose.model("Outfit", outfitSchema)

export default Outfit