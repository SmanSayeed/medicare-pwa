"use client";

import React, { useEffect } from "react";
import InstallPWAButton from "./InstallPWAButton";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useRouter } from "next/navigation";
import routeHelper from "@/helpers/routeHelper";
import { useSelector } from "react-redux";
import WithAuth from "./HOC/WithAuth";
// import AddToHomeScreen from "/PWAComponents/AddToHomeScreen";

 function RootLayoutClient({ children }) {
  // React.useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => {
  //         console.log(
  //           "Service Worker registered with scope:",
  //           registration.scope
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   }
  // }, []);

  const Router = useRouter();
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
const {user,token} = useSelector(state => state.user);
// console.log("user ",user,token);
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      Router.push(routeHelper.login);
    }
  }, [isAuthenticated, Router]);

  return (
    <>
    
      {/* Header */}
      <Header />

      {/* Body */}

      <div className="page-content-wrapper">{children}</div>

      {/* Footer */}
      <Footer />
    </>
  );
}

// export default RootLayoutClient;
export default WithAuth(RootLayoutClient);
