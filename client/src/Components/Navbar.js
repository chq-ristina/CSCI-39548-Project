import React from 'react';
import './Navbar.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link style={{textDecoration: 'none'}} to='/' className="navbar-logo">
            <span className="font-link">
              Nobles & Barnes  
            </span>
            <MenuBookIcon/>
          </Link>
          <Link style={{textDecoration: 'none'}} to='/favorites' className='navbar-favorite'>
            <span className="font-link">
              Favorites  
            </span>
            <FavoriteIcon/>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
