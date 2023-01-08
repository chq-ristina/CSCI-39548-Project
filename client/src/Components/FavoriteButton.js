import React, {useEffect, useState} from 'react'
import axios from 'axios'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteInsert, addFavoriteRemove, removeFavoriteInsert, removeFavoriteRemove } from '../Features/Favoriting';

function FavoriteButton(props) {
    const [favorited, setFavorited] = useState((props.props.favorite) ? true : false);

    /*
    Want to deal with deleting books from db.
    Before...planned to search for the book in the db, if exists, get the id of the entry
    using the id, can delete the entry
    */
    const handleClick = () => {
    }
  return (<button onClick={(e) => {
        e.preventDefault();
        setFavorited(!favorited);
        console.log(props.props.img);
        const faveBook = {
            title: props.props.title,
            author: props.props.author,
            img: props.props.img,
            description: props.props.description,
            favorite: !favorited
        }

        axios.post('http://localhost:5000/insert', faveBook).then(response => console.log(response.data))
        
        !favorited ? window.alert(`${props.props.title} added to favorites!`) : window.alert(`${props.props.title} removed from favorites!`);
      }}>
    {(favorited)? <FavoriteIcon/> : <FavoriteBorderIcon/>}
    </button> 
    )
}

export default FavoriteButton