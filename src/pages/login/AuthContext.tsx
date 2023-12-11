import React, { createContext, useState, useContext, useCallback, ReactNode } from "react";
import axios from 'axios';

// Define the shape of your context data
interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}
interface AuthProviderProps {
    children: ReactNode;
    login: (token: string) => void;  
    logout: () => void;              
  }

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Define the props for your AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}


// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, login, logout }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
  
    const handleLogin = useCallback((token: string) => {
      setAuthToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      login(token); // Invoke the passed-in login function
    }, [login]);
  
    const handleLogout = useCallback(() => {
      setAuthToken(null);
      delete axios.defaults.headers.common['Authorization'];
      logout(); // Invoke the passed-in logout function
    }, [logout]);
  
    return (
      <AuthContext.Provider value={{ authToken, login: handleLogin, logout: handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
