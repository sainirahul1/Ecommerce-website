import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { addToCart as addToCartAPI } from "../services/api";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
        setSelectedImage(0);
      } catch (err) {
        setError("Product not found");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      addNotification("Please login to add items to cart", "warning");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    try {
      await addToCartAPI({ productId: product._id, quantity });
      addToCart({ ...product, quantity });
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

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded font-bold text-sm uppercase tracking-wide transition-all"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // Placeholder for multiple images

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button
              onClick={() => navigate(`/?category=${product.category}`)}
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              {product.category}
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex text-yellow-400">
                      ⭐⭐⭐⭐☆
                    </div>
                    <span className="text-gray-600">(120 reviews)</span>
                  </div>
                </div>
                <button
                  onClick={handleWishlist}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}
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

              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex items-center text-green-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  In Stock ({product.stock || 50} available)
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <p className="text-4xl font-bold text-black">₹{product.price.toLocaleString()}</p>
                <p className="text-xl text-gray-400 line-through">
                  ₹{Math.round(product.price * 1.25).toLocaleString()}
                </p>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                  -20%
                </span>
              </div>
              <p className="text-gray-600">Free shipping on orders over ₹2000</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium quality materials
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  1 year warranty
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  30-day return policy
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= (product.stock || 10)) {
                        setQuantity(val);
                      }
                    }}
                    className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2"
                    min="1"
                    max={product.stock || 10}
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 10)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-400 text-black py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  View Cart
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Brand</p>
                  <p className="font-medium text-gray-900">E Shop Premium</p>
                </div>
                <div>
                  <p className="text-gray-500">SKU</p>
                  <p className="font-medium text-gray-900">ES-{product._id?.slice(-6).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{product.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Availability</p>
                  <p className="font-medium text-green-600">In Stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold text-black mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl font-bold">4.5</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">⭐⭐⭐⭐☆</div>
                  <p className="text-gray-600 text-sm">Based on 120 reviews</p>
                </div>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-3">{stars}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: stars === 5 ? "60%" : stars === 4 ? "25%" : stars === 3 ? "10%" : stars === 2 ? "3%" : "2%"
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {stars === 5 ? 72 : stars === 4 ? 30 : stars === 3 ? 12 : stars === 2 ? 4 : 2}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                  <span className="font-medium">John D.</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Excellent product! Exactly as described and great quality.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐☆</div>
                  <span className="font-medium">Sarah M.</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Really happy with this purchase. Fast shipping and good packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
