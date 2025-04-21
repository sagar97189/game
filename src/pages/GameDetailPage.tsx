import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { useCart } from '../context/CartContext';
import { Star, Heart, ShoppingCart, Share2, Award, Calendar, User, Users, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getGameById } = useGames();
  const { addToCart, cartItems } = useCart();
  const [activeTab, setActiveTab] = useState('description');
  const [isInCart, setIsInCart] = useState(false);
  
  // Find the game by id
  const game = getGameById(id as string);
  
  useEffect(() => {
    // Check if game is in cart
    if (game) {
      const inCart = cartItems.some(item => item.id === game.id);
      setIsInCart(inCart);
    }
    
    // Scroll to top when loading new game
    window.scrollTo(0, 0);
  }, [game, cartItems]);
  
  if (!game) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Game Not Found</h2>
          <p className="text-gray-400 mb-6">The game you're looking for doesn't exist or has been removed.</p>
          <Link to="/store" className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.salePrice || game.price,
      image: game.image,
    });
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Game Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <Link to="/store" className="inline-flex items-center text-gray-400 hover:text-violet-400 mb-2">
                <ChevronLeft size={16} /> Back to Store
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{game.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-violet-400 rounded-full hover:bg-gray-800/40 transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-gray-300 hover:text-violet-400 rounded-full hover:bg-gray-800/40 transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="aspect-video"
              >
                {game.screenshots.map((screenshot, index) => (
                  <SwiperSlide key={index}>
                    <img src={screenshot} alt={`${game.title} screenshot ${index + 1}`} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            {/* Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-gray-700">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'description'
                      ? 'text-violet-400 border-b-2 border-violet-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'requirements'
                      ? 'text-violet-400 border-b-2 border-violet-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('requirements')}
                >
                  System Requirements
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'reviews'
                      ? 'text-violet-400 border-b-2 border-violet-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>
              
              <div className="py-6">
                {activeTab === 'description' && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">{game.description}</p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          <li>Immersive open-world environment</li>
                          <li>Dynamic weather and day/night cycle</li>
                          <li>Unique character progression system</li>
                          <li>Over 50 hours of gameplay</li>
                          <li>Challenging quests and side missions</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Game Modes</h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          <li>Single-player campaign</li>
                          <li>Co-op multiplayer</li>
                          <li>Competitive multiplayer</li>
                          <li>Endless survival mode</li>
                          <li>Hardcore difficulty option</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'requirements' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-3">Minimum Requirements</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">OS:</span>
                            <span>Windows 10 64-bit</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">Processor:</span>
                            <span>Intel Core i5-6600K / AMD Ryzen 3 1300X</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">Memory:</span>
                            <span>8 GB RAM</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">Graphics:</span>
                            <span>NVIDIA GTX 1050 / AMD RX 560</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">Storage:</span>
                            <span>50 GB available space</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-3">Recommended Requirements</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">OS:</span>
                            <span>Windows 10 64-bit</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">Processor:</span>
                            <span>Intel Core i7-8700K / AMD Ryzen 5 3600X</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">Memory:</span>
                            <span>16 GB RAM</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">Graphics:</span>
                            <span>NVIDIA RTX 2060 / AMD RX 5700</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium text-gray-400 w-24">Storage:</span>
                            <span>50 GB SSD</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <div className="text-4xl font-bold text-white">{game.rating.toFixed(1)}</div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(game.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">{game.reviews} reviews</div>
                        </div>
                        <div className="flex-1">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="text-sm text-gray-400 w-10">5★</div>
                              <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '70%' }}></div>
                              </div>
                              <div className="text-sm text-gray-400 w-10 text-right">70%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-400 w-10">4★</div>
                              <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '20%' }}></div>
                              </div>
                              <div className="text-sm text-gray-400 w-10 text-right">20%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-400 w-10">3★</div>
                              <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '7%' }}></div>
                              </div>
                              <div className="text-sm text-gray-400 w-10 text-right">7%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-400 w-10">2★</div>
                              <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '2%' }}></div>
                              </div>
                              <div className="text-sm text-gray-400 w-10 text-right">2%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-400 w-10">1★</div>
                              <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '1%' }}></div>
                              </div>
                              <div className="text-sm text-gray-400 w-10 text-right">1%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800/50 p-6 rounded-lg">
                        <div className="flex items-start mb-4">
                          <div className="bg-violet-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            JD
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-semibold text-white">John Doe</h4>
                              <span className="text-sm text-gray-400">2 days ago</span>
                            </div>
                            <div className="flex mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}
                                />
                              ))}
                            </div>
                            <p className="text-gray-300 mb-2">
                              This game exceeded all my expectations! The graphics are stunning, gameplay is smooth, and the story is incredibly engaging. I've already put in over 30 hours and still finding new things to discover.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 p-6 rounded-lg">
                        <div className="flex items-start mb-4">
                          <div className="bg-cyan-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            AS
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-semibold text-white">Alice Smith</h4>
                              <span className="text-sm text-gray-400">1 week ago</span>
                            </div>
                            <div className="flex mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}
                                />
                              ))}
                            </div>
                            <p className="text-gray-300 mb-2">
                              I'm really enjoying the game, especially the combat system and character progression. The only downside is that some missions can get repetitive, but overall it's a great experience.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <button className="text-violet-400 hover:text-violet-300 font-medium">
                          Load More Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Purchase Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg overflow-hidden sticky top-24">
              <img src={game.image} alt={game.title} className="w-full aspect-video object-cover" />
              
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="flex mr-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(game.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-300">({game.reviews} reviews)</span>
                </div>
                
                <div className="mb-6">
                  {game.salePrice ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-white">${game.salePrice.toFixed(2)}</span>
                      <span className="text-xl line-through text-gray-400">${game.price.toFixed(2)}</span>
                      <span className="bg-violet-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                        {game.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-white">${game.price.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="space-y-3 mb-6">
                  {isInCart ? (
                    <Link
                      to="/cart"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                    >
                      <ShoppingCart size={18} className="mr-2" /> Go to Cart
                    </Link>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                    >
                      <ShoppingCart size={18} className="mr-2" /> Add to Cart
                    </button>
                  )}
                  <button className="w-full border border-violet-600 text-violet-400 hover:bg-violet-600/10 font-medium py-3 px-4 rounded-md flex items-center justify-center transition-colors">
                    <Heart size={18} className="mr-2" /> Add to Wishlist
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Award className="text-violet-400 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <span className="block text-white font-medium">Publisher</span>
                      <span>{game.publisher}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <User className="text-violet-400 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <span className="block text-white font-medium">Developer</span>
                      <span>{game.developer}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="text-violet-400 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <span className="block text-white font-medium">Release Date</span>
                      <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Monitor className="text-violet-400 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <span className="block text-white font-medium">Platforms</span>
                      <span>{game.platforms.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="text-violet-400 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <span className="block text-white font-medium">Genres</span>
                      <span>{game.genres.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;