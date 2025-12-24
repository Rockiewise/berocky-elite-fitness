
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center transform rotate-3">
                <span className="text-white font-bold text-lg heading-font">R</span>
              </div>
              <span className="text-xl font-extrabold tracking-tighter heading-font uppercase">
                BE<span className="text-red-600">ROCKY</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering fitness enthusiasts in Ibadan and beyond through elite training, premium supplements, and a relentless community.
            </p>
            <div className="flex space-x-4">
              {['FB', 'IG', 'TW', 'YT'].map((social) => (
                <div key={social} className="w-10 h-10 border border-white/10 flex items-center justify-center rounded cursor-pointer hover:bg-red-600 hover:border-red-600 transition-colors">
                  <span className="text-xs font-bold">{social}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold uppercase heading-font mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Personal Training</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Nutritional Guides</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold uppercase heading-font mb-6">Location</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>Challenge Area, Ibadan</li>
              <li>Oyo State, Nigeria</li>
              <li>Mon-Fri: 5AM - 11PM</li>
              <li>Sat-Sun: 7AM - 9PM</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold uppercase heading-font mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest workout tips and gear updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-l px-4 py-2 w-full focus:outline-none focus:border-red-600 text-sm"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r font-bold text-sm uppercase">Join</button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BeRocky Elite Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
