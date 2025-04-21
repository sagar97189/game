import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Game } from '../../context/GameContext';
import { motion } from 'framer-motion';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { addToCart, isInCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  const inCart = isInCart ? isInCart(game.id) : false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!inCart) {
      addToCart({
        id: game.id,
        title: game.title,
        price: game.salePrice || game.price,
        image: game.image,
      });
      
      // Show added to cart notification
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 1500);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Wishlist functionality would be implemented here
    setIsWishlisted(!isWishlisted);
    console.log('Added to wishlist:', game.title);
  };

  return (
    <motion.div 
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/game/${game.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          
          {game.discount && (
            <motion.div 
              className="absolute top-2 right-2 bg-violet-500 text-white font-bold px-2 py-1 rounded-md text-sm z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              -{game.discount}%
            </motion.div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.h3 
              className="text-lg font-bold text-white truncate"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {game.title}
            </motion.h3>
            <motion.div 
              className="flex items-center mt-1"
              animate={{ y: isHovered ? -5 : 0, opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span 
                    key={i} 
                    className={`text-sm ${i < Math.floor(game.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                    animate={{ scale: isHovered && i < Math.floor(game.rating) ? 1.2 : 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <span className="ml-2 text-xs text-gray-300">({game.reviews})</span>
            </motion.div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <motion.div 
              className="flex items-center space-x-2"
              animate={{ x: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {game.salePrice ? (
                <>
                  <span className="text-lg font-bold text-white">${game.salePrice.toFixed(2)}</span>
                  <span className="text-sm line-through text-gray-400">${game.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-white">${game.price.toFixed(2)}</span>
              )}
            </motion.div>
            
            <div className="flex space-x-2">
              <motion.button
                onClick={handleWishlist}
                className={`p-2 rounded-full transition-colors duration-200 ${isWishlisted ? 'text-red-500 bg-gray-700/50' : 'text-gray-300 hover:text-red-400 hover:bg-gray-700/50'}`}
                aria-label="Add to wishlist"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </motion.button>
              <motion.button
                onClick={handleAddToCart}
                className={`p-2 rounded-full transition-colors duration-200 ${inCart ? 'text-green-500 bg-gray-700/50' : 'text-gray-300 hover:text-violet-400 hover:bg-gray-700/50'}`}
                aria-label="Add to cart"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                disabled={inCart}
              >
                {inCart ? <Check size={18} /> : <ShoppingCart size={18} />}
              </motion.button>
            </div>
          </div>
          
          <motion.div 
            className="flex flex-wrap gap-1 mt-3"
            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {game.platforms.slice(0, 3).map((platform, index) => (
              <motion.span
                key={index}
                className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                whileHover={{ y: -2, backgroundColor: "#4B5563" }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {platform}
              </motion.span>
            ))}
            {game.platforms.length > 3 && (
              <motion.span 
                className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                whileHover={{ y: -2, backgroundColor: "#4B5563" }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                +{game.platforms.length - 3}
              </motion.span>
            )}
          </motion.div>
        </div>
      </Link>
      
      {/* Added to cart notification */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: showAddedToCart ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showAddedToCart ? 'auto' : 'none' }}
      >
        <motion.div 
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: showAddedToCart ? 1 : 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Check className="mr-2" /> Added to Cart
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameCard;