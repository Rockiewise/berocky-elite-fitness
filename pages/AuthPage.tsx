
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || (isAdminMode ? "/admin" : "/dashboard");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = login(email, isAdminMode ? 'admin' : 'user');
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message || "Invalid credentials.");
      }
      setIsLoading(false);
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate Google OAuth Popup
    setTimeout(() => {
      // For demonstration, we'll prompt for an email if it's the first time, 
      // or just use the admin email if in Admin mode
      const simulatedEmail = isAdminMode ? "sarolanrewaju691@gmail.com" : "client@gmail.com";
      const result = login(simulatedEmail, isAdminMode ? 'admin' : 'user');
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message || "Google Authentication Failed.");
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-800 rounded-full blur-[150px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center transform rotate-6 shadow-lg shadow-red-600/30">
                <span className="text-white font-bold text-2xl heading-font">R</span>
              </div>
              <span className="text-3xl font-extrabold tracking-tighter heading-font uppercase">
                BE<span className="text-red-600">ROCKY</span>
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase heading-font tracking-tight mb-2">
              {isAdminMode ? 'Commander Access' : isLogin ? 'Sign In' : 'Create Profile'}
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              {isAdminMode 
                ? 'Restricted to sarolanrewaju691@gmail.com' 
                : isLogin ? 'Welcome back to the iron paradise' : 'Begin your legacy today'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-start space-x-3 animate-in fade-in slide-in-from-top-1">
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-red-500 font-bold leading-relaxed">{error}</p>
            </div>
          )}

          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-4 bg-white text-black font-bold uppercase rounded-2xl text-xs tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center space-x-3 mb-6 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-4 text-gray-500 font-bold tracking-widest">Or Use Email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Account Email</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all placeholder:text-gray-700"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Password</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all placeholder:text-gray-700"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-red-600 text-white font-bold uppercase rounded-2xl text-xs tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 active:scale-[0.98] mt-4 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>{isLogin ? 'Access Portal' : 'Create Account'}</span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="w-full text-[10px] text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest"
            >
              {isLogin ? "New to the gym? Create Account" : "Back to login"}
            </button>
            <button 
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setIsLogin(true);
                setError(null);
                setEmail(isAdminMode ? "" : "sarolanrewaju691@gmail.com"); // Pre-fill for convenience during review
              }}
              className={`w-full text-[10px] py-3 rounded-2xl border transition-all uppercase font-black tracking-widest ${
                isAdminMode 
                  ? 'border-red-600 text-red-600 bg-red-600/5' 
                  : 'border-white/10 text-gray-600 hover:text-white hover:border-white/30'
              }`}
            >
              {isAdminMode ? 'Return to Member Login' : 'Admin & Owner Secure Login'}
            </button>
          </div>
        </div>
        
        <div className="mt-10 flex items-center justify-center space-x-6 text-[10px] text-gray-600 uppercase font-bold tracking-[0.2em]">
          <span>Secure</span>
          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
          <span>Encrypted</span>
          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
          <span>BeRocky v2.5</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
