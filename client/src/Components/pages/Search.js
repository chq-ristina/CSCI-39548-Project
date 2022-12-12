import React, {useEffect, useState}from 'react'
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import './Search.css';
import {isEmpty} from "lodash";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavorite, addFavoriteInsert, addFavoriteRemove, removeFavorite } from '../../Features/Favoriting';
import FavoriteButton from '../FavoriteButton';

function Search() {
  const searchWord = useSelector((state) => state.searchWord.value);
  const searchType = useSelector((state) => state.searchType.value);
  const toInsert = useSelector((state) => (state.favoriting.value.toInsert));
  const toRemove = useSelector((state) => (state.favoriting.value.toRemove));

  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    async function fetchData (){
      const response = await fetch(`/search/${searchType.searchType}/${searchWord.searchWord}`);
      const data = await response.json();
      setBackendData(data);
    }
    fetchData();
  }, []);

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
                  {/*<button onClick={(e) => {
                    e.preventDefault();
                    console.log(key, title, authorString);
                    if(book.hasOwnProperty('favorite')){
                      book.favorite = !book.favorite;
                    }
                    else{
                      book.favorite = true
                    }
                    updateFavorites(book);
                    book.favorite ? window.alert(`${title} added to favorites!`) : window.alert(`${title} removed from favorites!`);
                  }}>
                    {(book.hasOwnProperty('favorite') && book.favorite)? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </button>*/}
                  <FavoriteButton
                  props={book}/>
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