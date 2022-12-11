import React, {useEffect, useState}from 'react'
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import './Search.css';
import {isEmpty} from "lodash";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

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

  //backendData && Object.keys(backendData).length === 0 && Object.getPrototypeOf(backendData) === Object.prototype
  const [open, setOpen] = useState(true);
  
  const handleOpen = ( )=> {
    setOpen(!open);
  } 


  return (
    <span className="font-link">
      {
        (isEmpty(backendData)) ? (
          <p className='loading'>No results found</p>
        ):(
          <div className='search-Search'>
            {(typeof backendData[0].title === 'undefined') ? (
            <p className="loading">Loading...</p>  
            ): (
              backendData.map((book, key) =>{
              let authorString = "";
          
              let title = book.title ? book.title : "No title";
              let authors = book.author ? book.author : ["No author"];
              let description = book.description ? book.description : "No description available";
              let image = book.img ? book.img : "https://www.freeiconspng.com/uploads/no-image-icon-10.png";

              authors.forEach((author) => {
                author += ", ";
                authorString += author;
              })
          
              authorString = authorString.slice(0, authorString.length - 2);
          
              //console.log(key, description.length);

              if(description.length > 600){
                description = description.slice(0, 600);
                description += "...";
              }

              return(
                <div key={key}>
                <div className='search-imgDescription'>
                  <img src = {image} width="128" height="192"/>
                  <button data-id={key} onClick={handleOpen}>
                    {open ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
                    {console.log(title)}
                  </button> 
                  <p className="search-description">{description}</p>
                </div>
                <div className='search-words'>
                  <h3 className='search-title'>{title}</h3>
                  <p className='search-author'>{authorString}</p>
                </div>
                </div>
              )
            })
          )}
        </div>
        )
      }
    
    </span>
  )
}

export default Search