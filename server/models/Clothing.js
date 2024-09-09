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
  name: {
    type: String,
    required: true,
  },
  brand: String,
  size: String,
  color: String,
//   image: String???,
}, {
  timestamps: true,
  collection: "clothingDb"
});

const Clothing = mongoose.model('Clothing', clothingSchema);

export default Clothing;
