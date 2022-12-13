import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchWord } from '../Features/SearchWord';


function SearchBar({placeholder}){
    var curSearch;
    const dispatch = useDispatch();

    const handleChange = (event) => {
        curSearch = event.target.value;
    }

    const handleClick = () =>{
        console.log("clicked!");
        dispatch(setSearchWord({searchWord: encodeURI(curSearch)}));
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <div className="searchInput">
                  <input type="text" placeholder={placeholder} onChange={handleChange}/>  
                </div>
                <div className="searchInput searchIcon" onClick={handleClick}>
                    <Link style={{textDecoration: 'none'}} to='/search'>
                       <SearchIcon /> 
                    </Link>
                </div>
                
            </div>
            <div className='dataResult'></div>

        </div>
    )
}

export default SearchBar;