import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Favorites.css';
import {isEmpty} from "lodash";
import FavoriteIcon from '@mui/icons-material/Favorite';

function Favorites() {
  //const favoriteList = useSelector((state) => state.favorited.value);

  const [mongoDB, setMongoDB] = useState([{}]);

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('/get-data');
      const data = await response.json();
      setMongoDB(data);
    }
    fetchData();
  }, []);
  /*favoriteList.forEach((fave) => {
    useEffect(async () => {
      const response = await fetch('/insert', {
        method: 'POST',
        body: JSON.stringify(fave)
      });
    }, []);
  })*/
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
                    <button onClick={(e) => {
                      e.preventDefault();
                      fave.favorite = !fave.favorite;

                      fave.favorite ? window.alert(`${title} added to favorites!`) : window.alert(`${title} removed from favorites!`);
                    }}>
                      <FavoriteIcon/>
                    </button>
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