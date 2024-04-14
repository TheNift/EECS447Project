import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <Link to="/">
            <button variant="outlined">Home</button>
        </Link>
        <Link to="/search">
            <button variant="outlined">Search</button>
        </Link>
        <Link to="/entry">
            <button variant="outlined">Entry</button>
        </Link>
        <Link to="/edit">
            <button variant="outlined">Edit</button>
        </Link>
    </div>
  );
}

export default Header;