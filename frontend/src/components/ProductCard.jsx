import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { addToCart as addToCartAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      addNotification("Please login to add items to cart", "warning");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    try {
      await addToCartAPI({ productId: product._id, quantity: 1 });
      addToCart(product);
      addNotification(`${product.name} added to cart successfully!`, "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      addNotification("Failed to add item to cart", "error");
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      addNotification("Please login to add items to wishlist", "warning");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    try {
      // Toggle wishlist state
      setIsWishlisted(!isWishlisted);
      
      if (!isWishlisted) {
        addNotification(`${product.name} added to wishlist!`, "success");
      } else {
        addNotification(`${product.name} removed from wishlist`, "info");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      addNotification("Failed to update wishlist", "error");
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="group bg-white border border-gray-200 hover:border-orange-500 transition-all duration-300 overflow-hidden cursor-pointer">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50" onClick={handleProductClick}>
        <div className="aspect-square w-full h-80 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
        </div>
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <div className="bg-orange-500 text-black px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
            New
          </div>
          <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
            -20%
          </div>
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleWishlist();
          }}
          className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-4">
        {/* Product Name */}
        <h3 
          className="font-bold text-lg text-black leading-tight group-hover:text-orange-500 transition-colors"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        {/* Category */}
        <div className="inline-block">
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400 text-sm">
            ⭐⭐⭐⭐☆
          </div>
          <span className="text-gray-500 text-xs">(120)</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <p className="font-bold text-2xl text-black">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-gray-400 line-through text-sm">
            ₹{Math.round(product.price * 1.25).toLocaleString()}
          </p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center text-sm">
          <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-green-600 font-medium">In Stock ({product.stock || 50})</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="flex-1 border border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-500 py-2 rounded font-medium text-sm uppercase tracking-wide transition-all"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="flex-1 bg-black hover:bg-gray-800 text-white py-2 rounded font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;