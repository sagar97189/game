import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-900">
        <div className="text-center max-w-md px-4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-700">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any games to your cart yet.</p>
            <Link to="/store" className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center">
              <ArrowLeft size={18} className="mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Shopping Cart</h1>
          <div className="flex items-center justify-between">
            <Link to="/store" className="text-violet-400 hover:text-violet-300 transition-colors inline-flex items-center">
              <ArrowLeft size={18} className="mr-2" /> Continue Shopping
            </Link>
            <button 
              onClick={clearCart}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gray-700 px-6 py-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <h3 className="text-gray-300 font-medium">Product</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="text-gray-300 font-medium">Price</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="text-gray-300 font-medium">Quantity</h3>
                  </div>
                  <div className="col-span-2 text-right">
                    <h3 className="text-gray-300 font-medium">Total</h3>
                  </div>
                </div>
              </div>
              
              {/* Items */}
              <div className="divide-y divide-gray-700">
                {cartItems.map((item) => (
                  <div key={item.id} className="px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="ml-4">
                            <Link to={`/game/${item.id}`} className="text-white hover:text-violet-400 font-medium">
                              {item.title}
                            </Link>
                            <p className="text-gray-400 text-sm">Digital Download</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="text-gray-300">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-12 bg-gray-700 border-0 text-center text-gray-300 mx-2 rounded"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 text-right flex items-center justify-end">
                        <span className="text-gray-300 mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg overflow-hidden sticky top-24">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax (10%)</span>
                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-700 flex justify-between">
                    <span className="text-lg text-white font-medium">Total</span>
                    <span className="text-lg text-white font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 text-sm text-gray-400 text-center">
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;