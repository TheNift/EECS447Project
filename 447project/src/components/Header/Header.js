import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <Link to="/" className="header-member">
            <button variant="outlined">Home</button>
        </Link>
        <Link to="/search" className="header-member">
            <button variant="outlined">Search</button>
        </Link>
        <Link to="/entry" className="header-member">
            <button variant="outlined">Entry</button>
        </Link>
        <Link to="/edit" className="header-member">
            <button variant="outlined">Edit</button>
        </Link>
    </div>
  );
}

export default Header;