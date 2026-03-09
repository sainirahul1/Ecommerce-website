import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { count } = useCart();
  const { isAuthenticated, user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-black text-white">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.55 12.02c0 .95-.38 1.81-.99 2.44-.61.63-1.46 1.02-2.39 1.02-.93 0-1.78-.39-2.39-1.02-.61-.63-.99-1.49-.99-2.44 0-.95.38-1.81.99-2.44.61-.63 1.46-1.02 2.39-1.02.93 0 1.78.39 2.39 1.02.61.63.99 1.49.99 2.44z"/>
              </svg>
              <span className="ml-2 text-xl font-bold uppercase tracking-wider">E Shop</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide transition-colors ${
                isActive('/') ? 'text-orange-500' : ''
              }`}
            >
              New & Featured
            </Link>
            
            <Link
              to="/men"
              className="text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide transition-colors"
            >
              Men
            </Link>

            <Link
              to="/women"
              className="text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide transition-colors"
            >
              Women
            </Link>

            <Link
              to="/kids"
              className="text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide transition-colors"
            >
              Kids
            </Link>

            <Link
              to="/sale"
              className="text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide transition-colors"
            >
              Sale
            </Link>

            <div className="relative">
              <Link
                to="/cart"
                className="flex items-center text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide transition-colors"
              >
                <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {count}
                  </span>
                )}
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={handleProfileClick}
                  className="profile-button flex items-center space-x-1 text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide transition-colors"
                >
                  <div className="w-6 h-6 bg-orange-500 text-black rounded-full flex items-center justify-center text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>{user?.name?.split(' ')[0]}</span>
                </button>
                
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-400 text-black px-4 py-2 rounded font-bold text-sm uppercase tracking-wide transition-colors"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black border-t border-gray-800 py-4">
            <div className="space-y-2 px-4 py-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide py-2"
              >
                New & Featured
              </Link>
              
              <Link
                to="/men"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide py-2"
              >
                Men
              </Link>

              <Link
                to="/women"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide py-2"
              >
                Women
              </Link>

              <Link
                to="/kids"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide py-2"
              >
                Kids
              </Link>

              <Link
                to="/sale"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide py-2"
              >
                Sale
              </Link>

              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide py-2"
              >
                <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
                {count > 0 && (
                  <span className="ml-2 bg-orange-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {count}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="space-y-2 pt-2 border-t border-gray-800">
                  <div className="text-white py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-orange-500 text-black rounded-full flex items-center justify-center text-xs font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm uppercase tracking-wide">{user?.name?.split(' ')[0]}</span>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white hover:text-orange-500 text-sm uppercase tracking-wide py-2"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white hover:text-orange-500 text-sm uppercase tracking-wide py-2"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-white hover:text-orange-500 text-sm uppercase tracking-wide py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-gray-800">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white hover:text-orange-500 font-medium text-sm uppercase tracking-wide py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block bg-orange-500 hover:bg-orange-400 text-black px-4 py-2 rounded font-bold text-sm uppercase tracking-wide text-center"
                  >
                    Join Us
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;