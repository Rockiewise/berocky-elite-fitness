
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="overflow-hidden">
      {/* Portal Quick Access (Updated with Auth Logic) */}
      <div className="bg-zinc-900 border-b border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <span className="text-gray-500 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            System Entry Points:
          </span>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-red-500 hover:text-white transition-colors flex items-center">
                User Portal (Active)
              </Link>
              <Link to="/admin" className="text-blue-500 hover:text-white transition-colors flex items-center">
                Admin Panel {isAdmin ? '(Unlocked)' : '(Requires Auth)'}
              </Link>
            </>
          ) : (
            <Link to="/auth" className="text-zinc-500 hover:text-red-500 transition-colors flex items-center">
              Login to Access Portals
            </Link>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 grayscale-[0.4]"
            alt="Gym Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest mb-4">
              Ibadan's #1 Fitness Hub
            </span>
            <h1 className="text-6xl sm:text-8xl font-black uppercase heading-font leading-none tracking-tighter mb-6">
              UNLEASH YOUR <br />
              <span className="text-red-600">LIMITS</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Elite training, specialized programs, and high-performance supplements. Join the community that builds legends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={isAuthenticated ? "/dashboard" : "/membership"} 
                className="px-10 py-4 bg-red-600 text-white font-bold uppercase rounded text-lg text-center transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
              >
                {isAuthenticated ? "My Training" : "Start Training"}
              </Link>
              <Link 
                to="/classes" 
                className="px-10 py-4 border-2 border-white text-white font-bold uppercase rounded text-lg text-center transition-colors hover:bg-white hover:text-black"
              >
                View Classes
              </Link>
            </div>
            
            <div className="mt-12 flex items-center space-x-8">
              <div>
                <span className="block text-3xl font-bold heading-font">500+</span>
                <span className="text-xs text-gray-400 uppercase font-semibold">Active Members</span>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div>
                <span className="block text-3xl font-bold heading-font">57</span>
                <span className="text-xs text-gray-400 uppercase font-semibold">5-Star Reviews</span>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div>
                <span className="block text-3xl font-bold heading-font">20+</span>
                <span className="text-xs text-gray-400 uppercase font-semibold">Elite Coaches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold uppercase heading-font mb-4">Why Train with <span className="text-red-600">Rocky?</span></h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Personal Training', desc: 'Customized workouts with our certified elite coaches in Ibadan.', icon: '💪' },
              { title: 'Online Coaching', desc: 'Global training plans delivered via our bespoke app interface.', icon: '📱' },
              { title: 'Premium Supplements', desc: 'Curated products to fuel your gains and speed up recovery.', icon: '⚡' }
            ].map((service, i) => (
              <div key={i} className="p-8 bg-zinc-900/50 border border-white/5 rounded-xl transition-all hover:border-red-600/50 hover:bg-zinc-900 group">
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold heading-font mb-4 group-hover:text-red-600 transition-colors">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold uppercase heading-font">Member Stories</h2>
              <p className="text-gray-400 mt-2">Real results from the BeRocky community.</p>
            </div>
            <div className="hidden sm:block">
              <button className="p-2 border border-white/10 rounded mr-2 hover:bg-white/5">←</button>
              <button className="p-2 border border-white/10 rounded hover:bg-white/5">→</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Tunde O.', role: 'Bodybuilder', quote: 'BeRocky changed my life. The equipment in Ibadan is unparalleled and the community keeps me going.' },
              { name: 'Sarah J.', role: 'Fitness Model', quote: 'The online training plans are so detailed. I can train anywhere and still get Rocky results!' },
              { name: 'Ahmed K.', role: 'Casual Lifter', quote: 'Best gym in Oyo state, period. Great vibes, great music, and very professional staff.' }
            ].map((t, i) => (
              <div key={i} className="p-8 bg-black border border-white/5 rounded-2xl relative">
                <div className="text-red-600 text-6xl absolute top-4 right-8 opacity-20">"</div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center font-bold text-red-600 mr-4">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl sm:text-6xl font-black uppercase heading-font mb-8">Ready to transform?</h2>
          <p className="text-xl text-white/80 mb-10 font-medium">
            Join the elite today. Memberships start at just ₦15,000/month. No contracts, just gains.
          </p>
          <Link 
            to={isAuthenticated ? "/dashboard" : "/membership"} 
            className="inline-block px-12 py-5 bg-black text-white font-bold uppercase rounded-full text-xl hover:bg-zinc-900 transition-colors shadow-2xl"
          >
            {isAuthenticated ? "Open Your Stats" : "Claim Your Free Trial"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
