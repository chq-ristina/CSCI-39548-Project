import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchWord } from '../Features/SearchWord';


function SearchBar({ placeholder }) {
    var curSearch;
    const dispatch = useDispatch();
    const history= useNavigate();

    const handleChange = (event) => {
        curSearch = event.target.value;
    }

    const handleClick = () => {
        console.log("clicked!");
        console.log("curSearch =", curSearch);
        if (curSearch !== undefined) {
            dispatch(setSearchWord({ searchWord: encodeURI(curSearch) }));
            history("/search");
        }
        
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <div className="searchInput">
                    <input type="text" placeholder={placeholder} onChange={handleChange} />
                </div>
                <div className="searchInput searchIcon" onClick={handleClick}>
                    <SearchIcon/>
                </div>

            </div>
            <div className='dataResult'></div>

        </div>
    )
}

export default SearchBar;