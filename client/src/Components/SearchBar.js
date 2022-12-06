import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({placeholder, setSearch}){
    var curSearch;
    const handleChange = (event) => {
        curSearch = event.target.value;
    }

    const handleClick = () =>{
        setSearch(curSearch);
    }
    
    return (
        <div className="search">
            <div className="searchInputs">
                <div className="searchInput">
                  <input type="text" placeholder={placeholder} onChange={handleChange}/>  
                </div>
                <div className="searchInput searchIcon" onClick={handleClick}>
                    <SearchIcon />
                </div>
            </div>
            <div className='dataResult'></div>

        </div>
    )
}

export default SearchBar;