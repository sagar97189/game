import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Github } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-400 text-sm">
              NexusGames is your premier destination for digital games. 
              Discover the latest releases, exclusive deals, and join our gaming community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Store
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/store?category=new" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/store?category=bestsellers" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/store?sale=true" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Deals & Promotions
                </Link>
              </li>
              <li>
                <Link to="/store?category=free" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Free to Play
                </Link>
              </li>
              <li>
                <Link to="/giftcards" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} NexusGames. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-violet-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-violet-400 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 text-sm hover:text-violet-400 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;