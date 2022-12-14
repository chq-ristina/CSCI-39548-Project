import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Favorites.css';
import {isEmpty} from "lodash";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteButton from '../FavoriteButton';

function Favorites() {
  const [mongoDB, setMongoDB] = useState([{}]);

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('http://localhost:5000/get-data');
      const data = await response.json();
      const filteredData = data.filter(bookData => bookData.favorite);
      setMongoDB(filteredData);
    }
    fetchData();
  }, []);

  return (
    <span className="font-link">
      {isEmpty(mongoDB) ? (
        <p>No favorites yet</p>
      ): (
        <div className='favorites-Favorites'>
          {(typeof mongoDB[0].title === 'undefined') ? (
            <p className='loading'>Loading...</p>
          ): (
            mongoDB.map((fave, key) => {
              let authorString = "";

              let title = fave.title ? fave.title : "No title";
              let authors = fave.author ? fave.author : ["No author"];
              let description = fave.description ? fave.description : "No description available";
              let image = fave.img ? fave.img : "https://www.freeiconspng.com/uploads/no-image-icon-10.png";

              authors.forEach((author) => {
                author += ", ";
                authorString += author;
              })
              authorString = authorString.slice(0, authorString.length - 2);

              if(description.length > 600){
                description = description.slice(0, 600);
                description += "...";
              }

              return(
                <div key={key}>
                  <div className='search-imgDescription'>
                    <img src={image} width="128" height="192"/>
                    <FavoriteButton
                    props={fave}
                    />
                    <p className='search-description'>{description}</p>
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
      )}
    </span>
    
  )
}

export default Favorites