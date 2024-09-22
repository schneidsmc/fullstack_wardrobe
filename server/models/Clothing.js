import mongoose from 'mongoose';

const clothingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['tops', 'bottoms', 'accessories', 'shoes'],
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large', 'xlarge'],
    required: true,
  },
  brand: {
    type: String,
    enum: ['rei', 'gap', 'duluth', 'target'],
    required: true,
  },
  color: {
    type: String,
    enum: ['blue', 'red', 'orange', 'purple'],
    required: true,
  },

  // brand: String,
  // size: String,
  // color: String,
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  collection: "clothingDb"
});

const Clothing = mongoose.model('Clothing', clothingSchema);

export default Clothing;
