import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist, addToCart } from "../services/api";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await getWishlist();
        setWishlistItems(response.data || []);
      } catch (err) {
        setError("Failed to load wishlist");
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isAuthenticated, navigate]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId);
      setWishlistItems(wishlistItems.filter(item => item._id !== productId));
      addNotification("Item removed from wishlist", "info");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      addNotification("Failed to remove item from wishlist", "error");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ productId: product._id, quantity: 1 });
      addNotification(`${product.name} added to cart successfully!`, "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      addNotification("Failed to add item to cart", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Error</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded font-bold text-sm uppercase tracking-wide transition-all"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6 text-lg">
              Start adding items you love to your wishlist
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-3 rounded font-bold text-sm uppercase tracking-wide transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div key={item._id} className="relative">
                <ProductCard product={item} />
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
