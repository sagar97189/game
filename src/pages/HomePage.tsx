import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sparkles, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import GameCard from '../components/ui/GameCard';
import { useGames, Game } from '../context/GameContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const HomePage = () => {
  const { featuredGames, newReleases, onSale, games } = useGames();
  const [heroGames, setHeroGames] = useState<Game[]>([]);
  const { scrollY } = useScroll();
  
  // References for scroll animations
  const featuredRef = useRef<HTMLDivElement>(null);
  const specialDealsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const featuredInView = useInView(featuredRef, { once: false, amount: 0.2 });
  const specialDealsInView = useInView(specialDealsRef, { once: false, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const springHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });
  
  // Opacity effects for sections
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const springHeroOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Select a few games for the hero section
    if (games.length > 0) {
      setHeroGames([games[0], games[1], games[5]]);
    }
  }, [games]);

  return (
    <div className="min-h-screen pt-16 overflow-hidden">
      {/* Hero section with featured games */}
      <motion.section 
        className="relative overflow-hidden"
        style={{ 
          y: springHeroY,
          opacity: springHeroOpacity
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          effect="fade"
          className="h-[80vh] md:h-[70vh]"
        >
          {heroGames.map((game) => (
            <SwiperSlide key={game.id}>
              <div className="relative h-full w-full">
                <img
                  src={game.image}
                  alt={game.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                      className="max-w-lg"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {game.title}
                      </h1>
                      <p className="text-lg text-gray-300 mb-6">
                        {game.description.substring(0, 120)}...
                      </p>
                      <div className="flex items-center space-x-4 mb-6">
                        {game.salePrice ? (
                          <>
                            <motion.span 
                              className="text-2xl font-bold text-white"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, delay: 0.5 }}
                            >
                              ${game.salePrice.toFixed(2)}
                            </motion.span>
                            <span className="text-xl line-through text-gray-400">${game.price.toFixed(2)}</span>
                            <motion.span 
                              className="bg-violet-500 text-white px-2 py-1 rounded-md text-sm font-bold"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.7 }}
                            >
                              {game.discount}% OFF
                            </motion.span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-white">${game.price.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {game.genres.map((genre, index) => (
                          <motion.span
                            key={index}
                            className="px-3 py-1 bg-gray-800/80 text-gray-300 rounded-md text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            {genre}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, type: "spring" }}
                        >
                          <Link
                            to={`/game/${game.id}`}
                            className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                          >
                            View Game
                          </Link>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, type: "spring" }}
                        >
                          <Link
                            to="/store"
                            className="bg-gray-800/80 text-white hover:bg-gray-700 px-6 py-3 rounded-md font-medium transition-colors duration-300"
                          >
                            Explore Store
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* New Releases Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="text-violet-400 mr-2" size={24} />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">New Releases</h2>
            </div>
            <Link to="/store?category=new" className="flex items-center text-violet-400 hover:text-violet-300 transition-colors group">
              View All 
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={18} className="ml-1 group-hover:ml-2 transition-all" />
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {newReleases.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Games Section with diagonal divider */}
      <section ref={featuredRef} className="relative bg-gray-800 py-16">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gray-900 transform -skew-y-2"></div>
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: featuredInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex justify-between items-center mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={featuredInView ? "show" : "hidden"}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="text-cyan-400 mr-2" size={24} />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Games</h2>
            </div>
            <Link to="/store?featured=true" className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group">
              View All 
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={18} className="ml-1 group-hover:ml-2 transition-all" />
              </motion.div>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={featuredInView ? "show" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Special Deals Section */}
      <section ref={specialDealsRef} className="bg-gray-900 py-16 relative">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gray-800 transform skew-y-2"></div>
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: specialDealsInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex justify-between items-center mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={specialDealsInView ? "show" : "hidden"}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <motion.div
                animate={{ 
                  rotate: [0, 15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Gift className="text-rose-400 mr-2" size={24} />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Special Deals</h2>
            </div>
            <Link to="/store?sale=true" className="flex items-center text-rose-400 hover:text-rose-300 transition-colors group">
              View All 
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={18} className="ml-1 group-hover:ml-2 transition-all" />
              </motion.div>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {onSale.map((game, index) => (
              <motion.div
                key={game.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1 }
                }}
                initial="hidden"
                animate={specialDealsInView ? "show" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to action */}
      <section ref={ctaRef} className="bg-gradient-to-r from-violet-600 to-purple-900 py-20 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={ctaInView ? "show" : "hidden"}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join Our Gaming Community
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get access to exclusive deals, early releases, and connect with fellow gamers around the world.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/register"
              className="bg-white text-violet-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg transition-colors duration-300 transform hover:scale-105"
            >
              Sign Up Now
            </Link>
            <Link
              to="/store"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium text-lg transition-colors duration-300 transform hover:scale-105"
            >
              Explore Games
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <motion.div
          className="absolute top-10 left-10 w-6 h-6 rounded-full bg-white/20"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-4 h-4 rounded-full bg-white/20"
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-white/10"
          animate={{
            y: [0, 60, 0],
            x: [0, -40, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>
    </div>
  );
};

export default HomePage;