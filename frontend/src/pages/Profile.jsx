import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { getProfile, getWishlist, removeFromWishlist } from "../services/api";
import ProductCard from "../components/ProductCard";

function Profile() {
  const { user, logoutUser } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileResponse = await getProfile();
        const wishlistResponse = await getWishlist();
        
        setProfileData(profileResponse.data);
        setWishlistItems(wishlistResponse.data || []);
      } catch (err) {
        setError("Failed to load profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    addNotification("Logged out successfully", "success");
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-orange-500 text-black rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h2 className="text-xl font-semibold text-black">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-orange-500 text-black font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "wishlist"
                      ? "bg-orange-500 text-black font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Wishlist ({wishlistItems.length})
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "orders"
                      ? "bg-orange-500 text-black font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-orange-500 text-black font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Settings
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-black mb-6">Profile Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData?.name || user?.name || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileData?.email || user?.email || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData?.phone || ""}
                      placeholder="Not provided"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    <input
                      type="text"
                      value={new Date(profileData?.createdAt || Date.now()).toLocaleDateString()}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-2 rounded font-medium transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-black mb-6">My Wishlist</h3>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-16 w-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">Your wishlist is empty</h4>
                    <p className="text-gray-500 mb-6">Start adding items you love to your wishlist</p>
                    <button
                      onClick={() => navigate("/")}
                      className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-2 rounded font-medium transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-black mb-6">Order History</h3>
                <div className="text-center py-12">
                  <svg className="mx-auto h-16 w-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">No orders yet</h4>
                  <p className="text-gray-500 mb-6">When you place your first order, it will appear here</p>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-2 rounded font-medium transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-black mb-6">Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-black mb-3">Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-gray-700">Email notifications for new products</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-gray-700">Order status updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-gray-700">Promotional offers</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-black mb-3">Privacy</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-gray-700">Show profile to other users</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-gray-700">Share purchase history</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-black mb-3">Account</h4>
                    <div className="space-y-3">
                      <button className="text-red-600 hover:text-red-700">Delete Account</button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-2 rounded font-medium transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
