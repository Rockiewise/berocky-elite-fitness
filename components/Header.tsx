
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, isAdmin } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Membership', path: '/membership' },
    { name: 'Classes', path: '/classes' },
    { name: 'Shop', path: '/shop' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center transform rotate-3">
              <span className="text-white font-bold text-xl heading-font">R</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tighter heading-font">
              BE<span className="text-red-600">ROCKY</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-red-600 ${
                  location.pathname === link.path ? 'text-red-600' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors border border-white/5"
                >
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-bold">
                    {user?.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">{isAdmin ? 'Admin' : 'Dashboard'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 bg-red-600 text-white font-bold uppercase text-sm rounded transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-white/10 animate-in fade-in slide-in-from-top-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-bold uppercase text-gray-300 hover:text-red-600"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-3 border-t border-white/5">
              {isAuthenticated ? (
                <>
                  <Link
                    to={isAdmin ? "/admin" : "/dashboard"}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-base font-bold uppercase text-white"
                  >
                    My {isAdmin ? 'Admin' : 'Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-4 text-base font-bold uppercase text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block py-4 text-base font-bold uppercase text-red-600"
                >
                  Member Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
