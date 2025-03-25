'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import routeHelper from "@/helpers/routeHelper";

export default function WithAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const Router = useRouter();
    const isAuthenticated = useSelector(state => state.user?.isAuthenticated);

    useEffect(() => {
      if (isAuthenticated === false) {
        Router.push(routeHelper.login);
      }
    }, [isAuthenticated, Router]);

    // Avoid rendering until we know the authentication status
    // if (isAuthenticated === undefined) {
    //     return <div>Loading...</div>; // or a spinner/loading component
    // }

    return <WrappedComponent {...props} />;
  };
}