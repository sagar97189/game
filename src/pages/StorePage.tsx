import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameCard from '../components/ui/GameCard';
import { useGames, Game } from '../context/GameContext';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

const StorePage = () => {
  const location = useLocation();
  const { games, searchGames } = useGames();
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortOption, setSortOption] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract all unique genres and platforms from games
  const allGenres = Array.from(new Set(games.flatMap(game => game.genres)));
  const allPlatforms = Array.from(new Set(games.flatMap(game => game.platforms)));

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const saleParam = params.get('sale');
    const featuredParam = params.get('featured');
    
    let filteredGames = [...games];
    
    // Apply URL parameters first
    if (categoryParam) {
      filteredGames = filteredGames.filter(game => 
        game.genres.some(genre => genre.toLowerCase() === categoryParam.toLowerCase())
      );
    }
    
    if (saleParam === 'true') {
      filteredGames = filteredGames.filter(game => game.salePrice !== undefined);
    }
    
    // Apply search and filters
    if (searchQuery) {
      filteredGames = searchGames(searchQuery);
    }
    
    if (selectedGenres.length > 0) {
      filteredGames = filteredGames.filter(game => 
        game.genres.some(genre => selectedGenres.includes(genre))
      );
    }
    
    if (selectedPlatforms.length > 0) {
      filteredGames = filteredGames.filter(game => 
        game.platforms.some(platform => selectedPlatforms.includes(platform))
      );
    }
    
    // Apply price range
    filteredGames = filteredGames.filter(game => {
      const price = game.salePrice || game.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    switch (sortOption) {
      case 'priceAsc':
        filteredGames.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'priceDesc':
        filteredGames.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'nameAsc':
        filteredGames.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        filteredGames.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'releaseDate':
        filteredGames.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'rating':
        filteredGames.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // By default, sort by relevance (no specific sorting)
        break;
    }
    
    setDisplayedGames(filteredGames);
  }, [games, searchQuery, selectedGenres, selectedPlatforms, priceRange, sortOption, location.search, searchGames]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseFloat(event.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setPriceRange([0, 100]);
    setSortOption('relevance');
  };

  const totalFilters = selectedGenres.length + selectedPlatforms.length + (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Game Store</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border-0 rounded-lg py-2 px-4 pl-10 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors md:hidden w-full justify-center"
              >
                <Filter size={18} className="mr-2" /> 
                Filters {totalFilters > 0 && `(${totalFilters})`}
              </button>
              
              <div className="relative w-full md:w-auto">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none w-full md:w-48 bg-gray-800 border-0 rounded-lg py-2 px-4 text-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none pr-8"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="nameAsc">Name: A to Z</option>
                  <option value="nameDesc">Name: Z to A</option>
                  <option value="releaseDate">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <aside className={`md:w-64 bg-gray-800 rounded-lg p-4 md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Filters</h2>
              {totalFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-violet-400 hover:text-violet-300 flex items-center"
                >
                  Clear All <X size={14} className="ml-1" />
                </button>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Genres</h3>
              <div className="space-y-2">
                {allGenres.map((genre) => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                      className="rounded border-gray-600 text-violet-500 focus:ring-violet-500 focus:ring-offset-gray-800"
                    />
                    <span className="ml-2 text-gray-300">{genre}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Platforms</h3>
              <div className="space-y-2">
                {allPlatforms.map((platform) => (
                  <label key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() => handlePlatformToggle(platform)}
                      className="rounded border-gray-600 text-violet-500 focus:ring-violet-500 focus:ring-offset-gray-800"
                    />
                    <span className="ml-2 text-gray-300">{platform}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Price Range</h3>
              <div className="mb-2 flex justify-between text-gray-300">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <div className="relative mb-4">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(e, 0)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(e, 1)}
                  className="absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none"
                />
              </div>
            </div>
            
            {/* Mobile only close button */}
            <button
              onClick={() => setShowFilters(false)}
              className="mt-4 w-full py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors md:hidden"
            >
              Apply Filters
            </button>
          </aside>
          
          {/* Games grid */}
          <div className="flex-1">
            {displayedGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;