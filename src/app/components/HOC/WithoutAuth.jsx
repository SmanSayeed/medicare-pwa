'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function WithoutAuth(WrappedComponent) {
  return function WrappedWithAuth(props) {
    const Router = useRouter();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
      if (isAuthenticated) {
        // Show an error message using a toast for trying to access when authenticated
        // toast.error('You are already logged in!');
        // Redirect to home or the desired authenticated page
        Router.push('/'); // Redirect to home or another appropriate page
      }
    }, [isAuthenticated, Router]);

    // Only render the wrapped component if not authenticated
    return !isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
}