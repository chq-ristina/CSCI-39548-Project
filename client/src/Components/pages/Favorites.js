import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Favorites.css';
import {isEmpty} from "lodash";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteButton from '../FavoriteButton';
import { Link } from 'react-router-dom';

function Favorites() {

  /*
  TODO: 
  Show books are favorited when not on the favorites page 
  */
  const [mongoDB, setMongoDB] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const user_id = useSelector((state) => state.user.value.user_id);
  //console.log("mongoDB:", mongoDB);
  console.log("User ID:", user_id);

  useEffect(() => {
    async function fetchData(){
      const response = await fetch(`http://localhost:5000/favorites/get-data?user_id=${user_id}`);
      const data = await response.json();
      const filteredData = data.filter(bookData => bookData.favorite);
      setMongoDB(filteredData);
    }
    fetchData();
  }, []);

  return (
    <span className="font-link">
      {/* {!loading && <h1 style={{color: 'black', margin: '30px'}}>Your Favorites</h1>} */}
      {isEmpty(mongoDB) ? (
        <p className='favorites-none'>No favorites yet</p>
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

              console.log("Fave price:", fave.price);
              console.log(fave.price.$numberDecimal.toString());
              let price = parseFloat(fave.price.$numberDecimal.toString());
              console.log("Fave price 2.0:", price);
              
              const newFave = {
                title: fave.title,
                author: fave.author,
                description: fave.description,
                img: fave.img,
                price: price
              }

              return(
                <div key={key}>
                  <div className='search-imgDescription'>
                    <Link to='/product' state={{props: newFave}}>
                      <img src={image} width="128" height="192"/>
                    </Link>
                    
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