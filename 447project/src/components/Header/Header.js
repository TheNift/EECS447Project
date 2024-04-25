import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/SmashBall.svg';

const Header = () => {
  return (
    <div className={styles.header}>
        <img src={logo} alt="Smash Logo" className={styles.appLogo}/>
        <Link to="/" className={styles.headerMember}>
            <button>Home</button>
        </Link>
        <Link to="/search" className={styles.headerMember}>
            <button>Search</button>
        </Link>
        <Link to="/entry" className={styles.headerMember}>
            <button>Entry</button>
        </Link>
        <Link to="/edit" className={styles.headerMember}>
            <button>Edit</button>
        </Link>
    </div>
  );
}

export default Header;