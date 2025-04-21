import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, LogIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { cartItems } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/'
                    ? 'text-violet-400 bg-gray-800/50'
                    : 'text-gray-300 hover:text-violet-400 hover:bg-gray-800/30'
                } transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/store"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/store'
                    ? 'text-violet-400 bg-gray-800/50'
                    : 'text-gray-300 hover:text-violet-400 hover:bg-gray-800/30'
                } transition-colors duration-200`}
              >
                Store
              </Link>
              <div className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-violet-400 hover:bg-gray-800/30 rounded-md cursor-pointer transition-colors duration-200">
                Categories
                <div className="absolute left-0 mt-2 w-48 hidden group-hover:block bg-gray-800 rounded-md shadow-lg p-2">
                  <Link
                    to="/store?category=action"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-violet-400 hover:bg-gray-700/50 rounded-md"
                  >
                    Action
                  </Link>
                  <Link
                    to="/store?category=adventure"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-violet-400 hover:bg-gray-700/50 rounded-md"
                  >
                    Adventure
                  </Link>
                  <Link
                    to="/store?category=rpg"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-violet-400 hover:bg-gray-700/50 rounded-md"
                  >
                    RPG
                  </Link>
                  <Link
                    to="/store?category=strategy"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-violet-400 hover:bg-gray-700/50 rounded-md"
                  >
                    Strategy
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-violet-400 rounded-full hover:bg-gray-800/40 transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/wishlist"
                  className="p-2 text-gray-300 hover:text-violet-400 rounded-full hover:bg-gray-800/40 transition-colors duration-200"
                  aria-label="Wishlist"
                >
                  <Heart size={20} />
                </Link>
                <Link
                  to="/account"
                  className="p-2 text-gray-300 hover:text-violet-400 rounded-full hover:bg-gray-800/40 transition-colors duration-200"
                  aria-label="Account"
                >
                  <User size={20} />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="p-2 text-gray-300 hover:text-violet-400 rounded-full hover:bg-gray-800/40 transition-colors duration-200"
                aria-label="Login"
              >
                <LogIn size={20} />
              </Link>
            )}
            
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-violet-400 rounded-full hover:bg-gray-800/40 transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-violet-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-violet-400 hover:bg-gray-800/40 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/'
                  ? 'text-violet-400 bg-gray-800/50'
                  : 'text-gray-300 hover:text-violet-400 hover:bg-gray-800/30'
              } transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              to="/store"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/store'
                  ? 'text-violet-400 bg-gray-800/50'
                  : 'text-gray-300 hover:text-violet-400 hover:bg-gray-800/30'
              } transition-colors duration-200`}
            >
              Store
            </Link>
            <div className="relative px-3 py-2 rounded-md text-base font-medium text-gray-300">
              Categories
            </div>
            <div className="pl-6 space-y-1">
              <Link
                to="/store?category=action"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-violet-400 hover:bg-gray-700/50 transition-colors duration-200"
              >
                Action
              </Link>
              <Link
                to="/store?category=adventure"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-violet-400 hover:bg-gray-700/50 transition-colors duration-200"
              >
                Adventure
              </Link>
              <Link
                to="/store?category=rpg"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-violet-400 hover:bg-gray-700/50 transition-colors duration-200"
              >
                RPG
              </Link>
              <Link
                to="/store?category=strategy"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-violet-400 hover:bg-gray-700/50 transition-colors duration-200"
              >
                Strategy
              </Link>
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-800">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 rounded-full text-gray-300" />
              </div>
              <div className="ml-3">
                {isAuthenticated ? (
                  <div className="text-base font-medium text-gray-300">User Name</div>
                ) : (
                  <Link
                    to="/login"
                    className="text-base font-medium text-violet-400 hover:text-violet-300"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {isAuthenticated && (
                <>
                  <Link
                    to="/wishlist"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-violet-400 hover:bg-gray-800/30 transition-colors duration-200"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/account"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-violet-400 hover:bg-gray-800/30 transition-colors duration-200"
                  >
                    Account
                  </Link>
                </>
              )}
              <Link
                to="/cart"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-violet-400 hover:bg-gray-800/30 transition-colors duration-200"
              >
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search bar */}
      {searchOpen && (
        <div className="absolute top-16 w-full bg-gray-900/95 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form className="relative">
              <input
                type="text"
                className="w-full bg-gray-800 border-0 rounded-lg py-2 px-4 pl-10 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                placeholder="Search for games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;