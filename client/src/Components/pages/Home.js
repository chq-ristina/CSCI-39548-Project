import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate, Location, useLocation } from 'react-router-dom';
import '../../App.css';
import Dropdown from '../Dropdown';
import SearchBar from '../SearchBar';
import './Home.css';
import '../../App';
import { useSelector } from 'react-redux';


function Home() {
 const searchType = useSelector((state) => state.searchType.value);
 const user_fname = useSelector((state) => state.user.value.fname);
 const user_id = useSelector((state) => state.user.value.user_id);
 const logged_in = useSelector((state) => state.user.value.logged_in);
  console.log("User fname:", user_fname, "User id:", user_id, "Logged in:", logged_in);

  const getPlaceholder = () => {
    switch(searchType.searchType){
      case "Genre":
        return "Enter genre...";
      case "Author":
        return "Enter author name...";
      default:
        return "Enter book title...";
    }
  }

  return (
    <div className="home">
      <div className='homeWelcome'>
        <span className="font-link">
          Welcome to Nobles & Barnes!
        </span>
        
      </div>
      <div className="flex-container homeSearchBar">
          <div className="flex-child appDropdown">
            <Dropdown 
            menu={["Title", "Genre", "Author"]}
            />
          </div>
          <div className="flex-child appSearchBar">
            <SearchBar 
            placeholder={getPlaceholder()}
             />
          </div>
        </div>
    </div>
  )
}

export default Home