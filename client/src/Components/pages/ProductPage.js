import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './ProductPage.css';
import { isEmpty } from "lodash";
import { useLocation } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';


function ProductPage() {
  const location = useLocation()
  const { props } = location.state
  const book = {
    title: props.title,
    author: props.author,
    img: props.img,
    description: props.description
  }

  console.log(book);

  return (
    <div className='productPage'>
      <div className='child cover'>
        <img src={book.img} />
        <div>
          <FavoriteButton props={book}/>
          <div>Add to your favorites</div>
          {/* <div>PRICE</div> */}
        </div>
        
      </div>
      <div className='child'>
        <div className='title'> {book.title} </div>
        <div className='author'>by <strong>{book.author}</strong></div>
        <div className='description'>{book.description}</div>
      </div>
    </div>

  )
}

export default ProductPage