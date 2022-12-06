import React, { useState } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import Dropdown from './Components/Dropdown';

/*
Was thinking of doing a drop down bar next to search bar so user can select between searching for a
title, genere, or author
Maybe can use UseState to help with the whole title vs genre or author
If all else fails...do different tabs/components for searching for a title, genre, author
searching for book title can be the main/home page
*/

function App() {
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
    <div className="App">
      <div className="flex-container">
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
          setSearch={setSearch} />
        </div>
      </div>
      <div>{search}</div>
      
    </div>
    
  );
}

export default App;
