import React from 'react';
import Link from 'next/link';
import routeHelper from '@/helpers/routeHelper';
import Logout from '../Atoms/Logout/Logout';
import { useSelector } from 'react-redux';

export default function Sidebar({ onClose }) {
  const { isAuthenticated, user } = useSelector(state => state.user);

  const handleLinkClick = () => {
    // Close the sidebar on menu item click
    onClose();
  };

  return (
    <div className="sidenav-wrapper">
      {/*-- Sidenav Profile */}
      <div className="sidenav-profile bg-gradient">
        <div className="sidenav-style1"></div>
        {isAuthenticated && (
          <>
            {/*-- User Thumbnail */}
            <div className="user-profile">
              <img src="img/bg-img/2.jpg" alt="" />
            </div>

            {/*-- User Info */}
            <div className="user-info">
              <h6 className="user-name mb-0">{user?.name}</h6>
              <span>{user?.email}</span>
            </div>
          </>
        )}
      </div>

      {/*-- Sidenav Nav */}
      <ul className="sidenav-nav ps-0">
        {isAuthenticated && (
          <>
            <li>
              <Link href={routeHelper.home} onClick={handleLinkClick}>
                <i className="bi bi-person"></i> Profile
              </Link>
            </li>
            <li>
              <Link href={routeHelper.home} onClick={handleLinkClick}>
                <i className="bi bi-house-door"></i> Home
              </Link>
            </li>
            <li onClick={handleLinkClick}>
              <Logout />
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li>
              <Link href={routeHelper.login} onClick={handleLinkClick}>
                <i className="bi bi-door-open"></i> Login
              </Link>
            </li>
            <li>
              <Link href={routeHelper.register} onClick={handleLinkClick}>
                <i className="bi bi-plus-square"></i> Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {/*-- Social Info */}
      <div className="social-info-wrap">
        <a href="#">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="#">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="#">
          <i className="bi bi-linkedin"></i>
        </a>
      </div>

      {/*-- Copyright Info */}
      <div className="copyright-info">
        <p>
          <span id="copyrightYear"></span>
          &copy; Made by <a href="#"> BJIT Warecollection team</a>
        </p>
      </div>
    </div>
  );
}