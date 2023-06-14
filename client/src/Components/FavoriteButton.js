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

  const title = props.props.title;
  const author = props.props.author;
  const img = props.props.img;
  const description = props.props.description

  const req = {
    params: {
      title: title,
      author: author,
      img: img,
      description: description,
      user_id: user_id
    }
  }

  //check if it is already a favorite book
  axios.get('http://localhost:5000/favorites/check',req)
    .then(res => {
      console.log("fave check res:", res.data);
      setFavorited(res.data.found);
      console.log("favorited:", favorited);
    });
  

  const handleClick = async () => {
    const faveBook = {
      title: title,
      author: author,
      img: img,
      description: description,
      user_id: user_id,
      favorite: !favorited
    }
    if (!favorited) {
      axios.post('http://localhost:5000/favorites/insert', faveBook).then(response => console.log("Favorited: ", response.data))
    }
    else {
      const response = await axios.get('http://localhost:5000/favorites/check',req);
      if(response.data.found){
        console.log('deleting...');
        axios.post('http://localhost:5000/favorites/delete', 
        {
          id: response.data.insertID
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