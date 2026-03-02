import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getProducts = (search = "") =>
  API.get(`/products?search=${search}`);

export const addToCart = (data) =>
  API.post("/cart", data);

export const getCartItems = () =>
  API.get("/cart");

export const removeCartItem = (id) =>
  API.delete(`/cart/${id}`);