
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'supplement' | 'gear'>('all');

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-black uppercase heading-font mb-4">Elite <span className="text-red-600">Supplements</span> & Gear</h1>
            <p className="text-gray-400 max-w-xl">Fuel your body with science-backed supplements and professional-grade training equipment.</p>
          </div>
          
          <div className="flex space-x-2">
            {['all', 'supplement', 'gear'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-red-600 text-white' 
                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden hover:border-red-600/30 transition-all">
              <div className="relative aspect-square overflow-hidden bg-zinc-900">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold heading-font mb-2 group-hover:text-red-600 transition-colors">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black heading-font text-white">₦{product.price.toLocaleString()}</span>
                  <button className="px-5 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded hover:bg-red-700 active:scale-95 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Promotion banner */}
        <div className="mt-24 relative rounded-3xl overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-red-600/10"></div>
          <div className="relative px-8 py-16 text-center md:px-16 md:text-left flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold heading-font uppercase mb-4 leading-tight">First order? Get <span className="text-red-600">20% OFF</span> Supplements</h2>
              <p className="text-gray-400 mb-8 max-w-lg">Use code <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">ROCKY20</span> at checkout. Nationwide delivery across Nigeria.</p>
              <button className="px-10 py-4 bg-white text-black font-bold uppercase rounded hover:bg-gray-200 transition-colors">Shop All Products</button>
            </div>
            <div className="flex-1 hidden md:block">
              <img src="https://picsum.photos/seed/promo/600/400" className="rounded-xl shadow-2xl rotate-2" alt="Supplements" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
