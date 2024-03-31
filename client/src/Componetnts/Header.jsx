import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Import CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
        <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/annotate" className="nav-link">Annotate</Link>
          </li>
          <li className="nav-item">
            <Link to="/analytics" className="nav-link">Analytics</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
