import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteInsert, addFavoriteRemove, removeFavoriteInsert, removeFavoriteRemove } from '../Features/Favoriting';
//import './FavoriteButton.css';

function FavoriteButton(props) {
  const [favorited, setFavorited] = useState((props.props.favorite) ? true : false);
  const user_id = useSelector((state) => state.user.value.user_id);
  const logged_in = useSelector((state) => state.user.value.logged_in);

  const handleClick = async () => {
    const faveBook = {
      title: props.props.title,
      author: props.props.author,
      img: props.props.img,
      description: props.props.description,
      user_id: user_id,
      favorite: !favorited
    }
    if (!favorited) {
      axios.post('http://localhost:5000/favorites/insert', faveBook).then(response => console.log("Favorited: ", response.data))
    }
    else {
      const response = await axios.get('http://localhost:5000/favorites/get-data');
      const data = await response.data;
      console.log("Get data: ", data);

      //check if faveBook is in the database
      var insertId;
      console.log("FaveBook: ", faveBook);
      data.forEach((book) => {
        console.log(book.author.toString() === faveBook.author.toString());
        if (book.title === faveBook.title && book.author.toString() === faveBook.author.toString() && book.img === faveBook.img &&
          book.description === faveBook.description) {
          console.log("Found book in database!");
          insertId = book._id;
          console.log("_id: ", insertId);
        }

      })
      if (insertId) {
        console.log('deleting...');
        axios.post('http://localhost:5000/favorites/delete', {
          id: insertId
        });
      }
    }

  }
  return (<button onClick={(e) => {
    e.preventDefault();
    //setFavorited(!favorited);
    if (logged_in) {
      setFavorited(!favorited);
      handleClick();
      !favorited ? window.alert(`${props.props.title} added to favorites!`) : window.alert(`${props.props.title} removed from favorites!`);
    } else {
      window.alert("You must be logged in to favorite a book");
    }

  }}>
    {(favorited) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
  </button>
  )
}

export default FavoriteButton