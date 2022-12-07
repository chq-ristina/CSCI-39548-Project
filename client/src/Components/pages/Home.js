import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../App.css';
import Dropdown from '../Dropdown';
import SearchBar from '../SearchBar';
import './Home.css';


function Home() {
  const [searchType, setSearchType] = useState("Title");
  const [search, setSearch] = useState("");

  const getPlaceholder = () => {
    switch(searchType){
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
            searchType={searchType}
            setSearchType={setSearchType}
            menu={["Title", "Genre", "Author"]}
            />
          </div>
          <div className="flex-child appSearchBar">
            <SearchBar 
            placeholder={getPlaceholder()}
            setSearch={setSearch}
             />
          </div>
        </div>

      <div>{search}</div>
    </div>
  )
}

export default Home