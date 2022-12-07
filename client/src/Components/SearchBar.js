import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, Navigate, useNavigate } from 'react-router-dom';

/*
Might help with what I want to do with searching
https://stackoverflow.com/questions/72923507/navigate-to-a-search-page-after-a-search-in-the-search-bar-and-reuse-the-search
*/

function SearchBar({placeholder, setSearch}){
    var curSearch;
    const navigate = useNavigate();

    const handleChange = (event) => {
        curSearch = event.target.value;
    }

    const handleClick = () =>{
        setSearch(curSearch);
        if(curSearch){
            navigate("/search", { state: curSearch, replace: true });
        }
        console.log(curSearch);
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