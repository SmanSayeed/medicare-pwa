import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';
import routeHelper from '@/helpers/routeHelper';
import InstallPWAButton from '../InstallPWAButton';
import siteHelper from '@/helpers/siteHelper';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/*-- Internet Connection Status */}
      <div className="internet-connection-status" id="internetStatus"></div>

      {/*-- Header Area */}
      <div className="header-area" id="headerArea">
        <div className="container">
          {/*-- Header Content */}
          <div className="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
            {/*-- Logo Wrapper */}
            <div className="logo-wrapper">
              <Link href={routeHelper.home}>
                {/* <img src="img/core-img/logo.png" alt=""/> */}
                {siteHelper.title}
              </Link>
            </div>
            <div className="d-flex gap-2 justify-content-center align-items-center">
              <InstallPWAButton />

              {/*-- Navbar Toggler */}
              <div
                className="navbar--toggler"
                onClick={toggleSidebar}
                aria-controls="affanOffcanvas"
              >
                <span className="d-block"></span>
                <span className="d-block"></span>
                <span className="d-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*-- # Sidenav Left */}
      <div
        className={`offcanvas offcanvas-start ${sidebarOpen ? 'show' : ''}`} // Toggling show class based on state
        id="affanOffcanvas"
        data-bs-scroll="true"
        tabIndex="-1"
        aria-labelledby="affanOffcanvsLabel"
      >
        <button
          className="btn-close btn-close-white text-reset"
          type="button"
          onClick={closeSidebar} // Close button handler
        ></button>

        <div className="offcanvas-body p-0">
          <Sidebar onClose={closeSidebar} /> {/* Passing close handler to Sidebar */}
        </div>
      </div>
    </>
  );
}