import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getProducts = (search = "", page = 1, limit = 10) =>
  API.get(`/products?search=${search}&page=${page}&limit=${limit}`);

export const getProductById = (id) =>
  API.get(`/products/${id}`);

export const addToCart = (data) =>
  API.post("/cart", data);

export const getCartItems = () =>
  API.get("/cart");

export const removeCartItem = (id) =>
  API.delete(`/cart/${id}`);

// Wishlist APIs
export const addToWishlist = (data) =>
  API.post("/wishlist", data);

export const getWishlist = () =>
  API.get("/wishlist");

export const removeFromWishlist = (id) =>
  API.delete(`/wishlist/${id}`);

// Authentication APIs
export const register = (userData) =>
  API.post("/auth/register", userData);

export const login = (credentials) =>
  API.post("/auth/login", credentials);

export const getProfile = () =>
  API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });