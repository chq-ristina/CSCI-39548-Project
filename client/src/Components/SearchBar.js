import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({placeholder, data}){
    const handleChange = (event) => {
        console.log(event.target.value);
    }
    
    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type='text' placeholder={placeholder} onChange={handleChange}/>
                <div className='searchIcon'>
                    <SearchIcon />
                </div>
            </div>
            <div className='dataResult'></div>

        </div>
    )
}

export default SearchBar;