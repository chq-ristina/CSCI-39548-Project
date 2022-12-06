import React, { useState } from 'react';
import './Dropdown.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Dropdown({menu, search, setSearch}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }  

  return (
    <div className="dropdown">
        <button className="dropdown-button" onClick={handleOpen}>
            <div className="dropdown-text">
                <div>{search}</div>
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
                            setSearch(menuItem);
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