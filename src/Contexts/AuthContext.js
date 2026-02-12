import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const storedUser = localStorage.getItem('kuriouschef_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, call backend API
    const mockUser = {
      id: '1',
      email: email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=B71C1C&color=fff`
    };
    setUser(mockUser);
    localStorage.setItem('kuriouschef_user', JSON.stringify(mockUser));
    localStorage.setItem('kuriouschef_token', 'mock_jwt_token');
    return { success: true, user: mockUser };
  };

  const signup = (name, email, password) => {
    // Mock signup
    const mockUser = {
      id: Date.now().toString(),
      email: email,
      name: name,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=B71C1C&color=fff`
    };
    setUser(mockUser);
    localStorage.setItem('kuriouschef_user', JSON.stringify(mockUser));
    localStorage.setItem('kuriouschef_token', 'mock_jwt_token');
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kuriouschef_user');
    localStorage.removeItem('kuriouschef_token');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};