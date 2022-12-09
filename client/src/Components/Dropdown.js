import React, { useState } from 'react';
import './Dropdown.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchType } from '../Features/SearchType';

function Dropdown({menu}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }  

  const dispatch = useDispatch();
  const searchType = useSelector((state) => state.searchType.value);

  return (
    <div className="dropdown">
        <button className="dropdown-button" onClick={handleOpen}>
            <div className="dropdown-text">
                <div>{searchType.searchType}</div>
                <div className="material-icons">
                    {!open ? (<ExpandMoreIcon />) : <ExpandLessIcon/>}
                </div>
            </div>
        </button>
        {open ? (
            <ul className= "menu">
                {menu.map((menuItem, index) => (
                   <li key={index} className="menu-item">
                        <button
                        onClick={() => {
                            handleOpen();
                            dispatch(setSearchType({searchType: menuItem}));
                        }}
                        >
                            {menuItem}
                        </button>
                    </li> 
                ))}
                
            </ul>
        ) : null}
        
    </div>
  )
}

export default Dropdown