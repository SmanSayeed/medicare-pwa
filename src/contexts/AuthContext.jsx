
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import routeHelper from '@/helpers/routeHelper';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const Router = useRouter();
  const {user,token,isAuthenticated} = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication state and redirect if necessary
    if (!isAuthenticated) {
      Router.push(routeHelper.login);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, Router]);

//   // Only render children when not in loading state
//   if (loading) {
//     return <div>Loading...</div>; 
//   }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}