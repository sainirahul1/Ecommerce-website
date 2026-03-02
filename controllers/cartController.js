import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const totalPrice = product.price * quantity;

    const cartItem = await Cart.create({
      productId,
      quantity,
      totalPrice
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.find().populate("productId");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};