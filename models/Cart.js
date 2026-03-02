import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true }
});

export default mongoose.model("Cart", cartSchema);