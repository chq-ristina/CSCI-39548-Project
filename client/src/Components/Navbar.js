import React, { useState, useEffect } from 'react';
import './Navbar.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../Features/User';

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate();

  const user_fname = useSelector((state) => state.user.value.fname);
  const user_id = useSelector((state) => state.user.value.user_id);
  const logged_in = useSelector((state) => state.user.value.logged_in);

  useEffect(() => {
    // execute on location change
    setOpen(false);
    //console.log('Location changed!', location.pathname);
  }, [location]);

  const handleLogOut = () => {
    dispatch(removeUser());
    history("/");

  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className='navbar-left'>
            <Link style={{ textDecoration: 'none' }} to='/' className="navbar-logo">
              <span className="font-link nobles-barnes">
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
                    {
                      logged_in &&
                      <li className='menu-item'>
                        Hi <strong>{user_fname}</strong>
                      </li>
                    }
                    {
                      logged_in &&
                      <li onClick={handleLogOut} className='menu-item' style={{ cursor: 'pointer' }}>
                        <strong>Logout</strong>
                      </li>
                    }
                    {
                      !logged_in &&
                      <li className='menu-item'>
                        <Link style={{ textDecoration: 'none' }} to='/login'>Sign in</Link>
                      </li>
                    }
                    {
                      !logged_in &&
                      <li className='menu-item'>
                        <Link style={{ textDecoration: 'none' }} to='/register'>Create an account</Link>
                      </li>
                    }


                    <li className='menu-item'>
                      <Link style={{textDecoration: 'none' }} to='/order-history'>Order history</Link>
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
              <Link style={{textDecoration: 'none'}} to='/checkout'>
                <ShoppingCartIcon style={{ color: 'darkgrey' }} />
              </Link>

            </div>


          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
