import React, { useEffect, useState } from 'react'
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import './Search.css';
import { isEmpty } from "lodash";
import FavoriteButton from '../FavoriteButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const searchWord = useSelector((state) => state.searchWord.value);
  const searchType = useSelector((state) => state.searchType.value);
  const toInsert = useSelector((state) => (state.favoriting.value.toInsert));
  const toRemove = useSelector((state) => (state.favoriting.value.toRemove));

  const [paginate, setpaginate] = useState(10);

  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    async function fetchData() {
      //console.log("calling fetch data..");
      const response = await fetch(`https://nobles-and-barnes-api.onrender.com/search/${searchType.searchType}/${searchWord.searchWord}`);
      const data = await response.json();
      // console.log("debug:", data);
      setBackendData(data);
    }
    fetchData();
  }, []);


  const load_more = (event) => {
    setpaginate((prevValue) => prevValue + 10);
  };

  return (
    <span className="font-link">
      {
        (isEmpty(backendData)) ? (
          <p className='loading'>No results found</p>
        ) : (
          <div className='search-Search'>
            {(typeof backendData[0].title === 'undefined') ? (
              <p className="loading">Loading...</p>
            ) : (
              backendData.slice(0, paginate)
                .map((book, key) => {
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

                  if (description.length > 600) {
                    description = description.slice(0, 600);
                    description += "...";
                  }
                  
                  let bookWithPrice = {
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    img: book.img,
                    price: 15.99
                  }
                  
                  return (
                    <div key={key} className='search-result'>
                      <div className='search-imgDescription'>
                        <Link to='/product' state={{ props: bookWithPrice }}>
                          <img src={image} width="128" height="192" />
                        </Link>

                        <FavoriteButton
                          props={bookWithPrice} />
                        <p className='search-price'><strong>${bookWithPrice.price}</strong></p>
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
            <div className='load-more'>
              {(typeof backendData[0].title != 'undefined' && paginate < 40)? 
                (<button onClick={load_more}>Load More</button>): 
                (<span></span>)}
            </div>
            
          </div>
        )
      }

    </span>
  )
}

export default Search