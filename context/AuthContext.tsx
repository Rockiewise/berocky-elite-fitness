
import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'user' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: Role) => { success: boolean; message?: string };
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'sarolanrewaju691@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, requestedRole: Role) => {
    // Strict Admin Enforcement
    if (requestedRole === 'admin' && email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return { 
        success: false, 
        message: "Access Denied. Only the verified business owner (sarolanrewaju691@gmail.com) can access the Commander dashboard." 
      };
    }

    // Role escalation: If the admin email logs in as a user, we still grant admin privileges
    const finalRole = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'user';

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: finalRole === 'admin' ? 'Rocky Commander' : email.split('@')[0],
      email: email.toLowerCase(),
      role: finalRole,
    };

    setUser(mockUser);
    localStorage.setItem('rocky_session', JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rocky_session');
  };

  useEffect(() => {
    const saved = localStorage.getItem('rocky_session');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
