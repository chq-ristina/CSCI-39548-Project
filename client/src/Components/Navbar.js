import React, { useState, useEffect } from 'react';
import './Navbar.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }

  const location = useLocation();

  useEffect(() => {
    // execute on location change
    setOpen(false);
    console.log('Location changed!', location.pathname);
  }, [location]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className='navbar-left'>
            <Link style={{ textDecoration: 'none' }} to='/' className="navbar-logo">
              <span className="font-link">
                Nobles & Barnes
              </span>
              <MenuBookIcon />
            </Link>
          </div>

          <div className='navbar-right'>

            <div className='navbar-account'>
              <div onClick={handleOpen} className='navbar-account-icon'>
                <AccountCircleIcon style={{ color: 'darkgrey' }} />
                {!open ? (<ExpandMoreIcon />) : <ExpandLessIcon />}
              </div>
              <div className='navbar-menu-container'>
                {open &&
                  <ul className='menu'>
                    <li className='menu-item'>
                      <Link style={{ textDecoration: 'none' }} to='/login'>Sign in</Link>
                    </li>
                    <li className='menu-item'>
                      <Link style={{ textDecoration: 'none' }} to='/register'>Create an account</Link>
                    </li>
                    <li className='menu-item'>
                      Order history
                    </li>
                  </ul>
                }
              </div>

            </div>

            <div className='navbar-fave-container'>
              <Link style={{ textDecoration: 'none' }} to='/favorites' className='navbar-favorite'>
                <span className="font-link">
                  Favorites
                </span>
                <FavoriteIcon />
              </Link>
            </div>

            <div className='navbar-cart'>
              <ShoppingCartIcon style={{ color: 'darkgrey' }} />
            </div>


          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
