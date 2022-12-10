import React, {useEffect, useState}from 'react'
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import './Search.css';

function Search() {
  const searchWord = useSelector((state) => state.searchWord.value);
  const searchType = useSelector((state) => state.searchType.value);
  const dispatch = useDispatch();

  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    async function fetchData (){
      const response = await fetch(`/search/${searchType.searchType}/${searchWord.searchWord}`);
      const data = await response.json();
      setBackendData(data);
    }
    /*fetch(`/search/${searchType.searchType}/${searchWord.searchWord}`).then(
      response => response.json()
    ).then(
      data => setBackendData(data)
    )*/
    fetchData();
  }, []);

  //console.log(backendData);
  //console.log(backendData[0].title);
  /*backendData.forEach((book) =>{
    console.log(book);
  })*/
  return (
    <span className="font-link">
    <div className='search-Search'>
      {(typeof backendData[0].title === 'undefined') ? (
        <p className="loading">Loading...</p>  
      ): (
        backendData.map((book, key) =>{
          let authorString = "";

          let title = book.title;
          let authors = book.author;
          let description = book.description;
          let image = book.img;

          authors.forEach((author) => {
            author += ", ";
            authorString += author;
          })
          
          authorString = authorString.slice(0, authorString.length - 2);
          
          console.log(key, description.length);

          if(description.length > 600){
            description = description.slice(0, 600);
            description += "...";
          }

         return(
          <div key={key}>
            <div className='search-imgDescription'>
              <img src = {image} />
              <p className="search-description">{description}</p>
            </div>
            <div className='search-words'>
              <h3 className='search-title'>{title}</h3>
              <p className='search-author'>{authorString}</p>
            </div>
          </div>
         )
        })
      )
      
      }
    </div>
    </span>
  )
}

export default Search