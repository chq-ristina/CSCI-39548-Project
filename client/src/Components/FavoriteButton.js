import React, {useEffect, useState} from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteInsert, addFavoriteRemove, removeFavoriteInsert, removeFavoriteRemove } from '../Features/Favoriting';

function FavoriteButton(props) {
    const [favorited, setFavorited] = useState(false);
    const toInsert = useSelector((state) => (state.favoriting.value.toInsert));
    const toRemove = useSelector((state) => (state.favoriting.value.toRemove));

    /*useEffect(() => {
        toInsert.forEach((book) => {
            book.favorite = true;
            async function fetchData(){
                const response = await fetch('/insert', {
                    method: 'POST',
                    body: JSON.stringify(book)
                });
            }
            fetchData();
            removeFavoriteInsert(book);
        })
    },[])*/

    //need id of object before deleting
    /*useEffect(() => {
        toRemove.forEach((book) => {
            book.favorite = false;
            async function fetchData(){
                const response = await fetch('/delete', {
                    method: 'POST',
                    body: JSON.stringify(book)
                });
            }
            fetchData();
            removeFavoriteRemove(book);
        })
    },[])*/

    async function updateFavorites(book) {
        var data = new FormData();
        data.append("json", JSON.stringify(book));
        if(!favorited){
            addFavoriteInsert(book);
            console.log("Updated toInsert");
            await fetch('/insert', {
                method: "POST",
                body: data
            });
        }
        else{
            addFavoriteRemove(book);
            console.log("Updated toRemove");
        }
        /*if(book.favorite){
            addFavoriteInsert(book);
            setFavorited(true);
        }else{
            addFavoriteRemove(book);
            setFavorited(false);
        }*/
      }

  return (<button onClick={(e) => {
        e.preventDefault();
        setFavorited(!favorited);
        /*if(props.hasOwnProperty('favorite')){
          props.favorite = !props.favorite;
          Object.preventExtensions(props);
        }
        else{
          props.favorite = true;
          Object.preventExtensions(props);
        }*/
        updateFavorites(props.props);
        !favorited ? window.alert(`${props.props.title} added to favorites!`) : window.alert(`${props.props.title} removed from favorites!`);
      }}>
    {(favorited)? <FavoriteIcon/> : <FavoriteBorderIcon/>}
    </button> 
    )
}

export default FavoriteButton