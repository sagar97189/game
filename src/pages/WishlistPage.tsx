import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGames } from '../context/GameContext';
import GameCard from '../components/ui/GameCard';

const WishlistPage = () => {
  const { isAuthenticated } = useAuth();
  const { games } = useGames();
  
  // In a real app, you would fetch the user's wishlist from your backend
  // For demo purposes, we'll just display some random games
  const wishlistGames = games.slice(0, 4);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-900">
        <div className="text-center max-w-md px-4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-700">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Sign in to view your wishlist</h2>
            <p className="text-gray-400 mb-6">You need to be signed in to access your wishlist.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (wishlistGames.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-900">
        <div className="text-center max-w-md px-4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-700">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6">You haven't added any games to your wishlist yet.</p>
            <Link to="/store" className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center">
              <ArrowLeft size={18} className="mr-2" /> Browse Games
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Wishlist</h1>
          <Link to="/store" className="text-violet-400 hover:text-violet-300 transition-colors inline-flex items-center">
            <ArrowLeft size={18} className="mr-2" /> Continue Shopping
          </Link>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;