import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './ProductPage.css';
import { useLocation } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';
import { addToCart } from '../../Features/ShoppingCart';


function ProductPage() {
  const location = useLocation()
  const { props } = location.state

  const dispatch = useDispatch();
  const shopping_cart = useSelector((state) => state.shoppingCart.value.shopping_cart);
  console.log("Shopping Cart:", shopping_cart);

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
    author: authors,
    img: image,
    description: description,
    price: props.price
  }

  console.log(book);
  if(book.price?.$numberDecimal !== undefined){
    console.log("book.price.$numberDecimal =", book.price.$numberDecimal);
  }else{
  console.log("book.price =", book.price);
  }

  const handleClick = () => {
    dispatch(addToCart(book));
    console.log("Shopping cart:", shopping_cart);
    window.alert(`Added ${book.title} by ${authorString} to cart!`);
  }

  return (
    <div className='parent'>
      <div className='left'>
        <img src={book.img}/>
        <div>
          <FavoriteButton props={book}/>
          <div>Add to your favorites</div>
        </div>
      </div>
      <div className='right'>
        <div className='title'> {book.title} </div>
        <div className='author'>by <strong>{authorString}</strong></div>
        <div className='buy'>
          <p className='buy-left'>${(book.price?.$numberDecimal !== undefined) ? book.price.$numberDecimal : book.price}</p>
          <button className='buy-right' onClick={handleClick}>Add to cart</button>
        </div>
        <div className='description'>{book.description}</div>
      </div>

    </div>

  )
}

export default ProductPage