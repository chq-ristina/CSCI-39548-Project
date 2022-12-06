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
  const [search, setSearch] = useState("Title");

  return (
    <div className="App">
      <Dropdown 
      search={search}
      setSearch={setSearch}
      menu={["Title", "Genre", "Author"]}
      />
      {/*<SearchBar placeholder="Enter a book name..." />*/}
    </div>
    
  );
}

export default App;
