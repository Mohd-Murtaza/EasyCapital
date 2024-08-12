import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://easy-capital-backend.vercel.app/user', { withCredentials: true });
        setAuth(response.data);
      } catch (error) {
        setAuth(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://easy-capital-backend.vercel.app/user/login', { email, password }, { withCredentials: true });
      setAuth(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async ({name, email, password}) => {
    try {
      const response = await axios.post('https://easy-capital-backend.vercel.app/user/signup', { name, email, password }, { withCredentials: true });
      setAuth(response.data)
    } catch (error) {
      console.error(error);
    }
  };  

  const logout = async () => {
    try {
      await axios.post('https://easy-capital-backend.vercel.app/user/logout', {}, { withCredentials: true });
      setAuth(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };