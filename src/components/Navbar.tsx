import React from 'react';
import logo from '../assets/logo.png';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="logo">
        <img src={logo} alt="РЕВЬЮ" />
      </div>
      <div className="nav-icons">
        <div className="nav-icon icon-grid">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="9.43478" height="9.43478" stroke="white" />
            <rect x="10.0652" y="10.0652" width="9.43478" height="9.43478" stroke="white" />
            <rect x="0.5" y="10.0652" width="9.43478" height="9.43478" stroke="white" />
            <rect x="10.0652" y="0.5" width="9.43478" height="9.43478" stroke="white" />
          </svg>
        </div>
        <div className="nav-icon icon-cart">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0.5H2.5L4 6M4 6L5.5 12H17.5L19 6H4Z" stroke="white" />
            <circle cx="8" cy="16.5" r="2.5" stroke="white" />
            <circle cx="15" cy="16.5" r="2.5" stroke="white" />
          </svg>
        </div>
        <div className="nav-icon icon-user">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 19H0.5C0.5 16.8333 2.4 10.5 10 10.5C17.6 10.5 19.5 16.8333 19.5 19Z" stroke="white" />
            <circle cx="10" cy="4.5" r="4" stroke="white" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
