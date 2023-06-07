import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './ProductPage.css';
import { isEmpty } from "lodash";
import { useLocation } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';


function ProductPage() {
  const location = useLocation()
  const { props } = location.state

  let authorString = "";

  let title = props.title ? props.title : "No title";
  let authors = props.author ? props.author : ["No author"];
  let description = props.description ? props.description : "No description available";
  let image = props.img ? props.img : "https://www.freeiconspng.com/uploads/no-image-icon-10.png";

  authors.forEach((author) => {
    author += ", ";
    authorString += author;
  })

  authorString = authorString.slice(0, authorString.length - 2);

  const book = {
    title: title,
    author: authorString,
    img: image,
    description: description
  }

  console.log(book);

  return (
    <div className='productPage'>
      <div className='child cover'>
        <img src={book.img} />
        <div>
          <FavoriteButton props={book} />
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