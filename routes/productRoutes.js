import express from "express";
import {
  addProduct,
  getProducts,
  getProductById
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;