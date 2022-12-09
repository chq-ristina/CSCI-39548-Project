import React, {useEffect, useState}from 'react'
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';

function Search() {
  const searchWord = useSelector((state) => state.searchWord.value);
  const searchType = useSelector((state) => state.searchType.value);

  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch(`/search/${searchType.searchType}/${searchWord.searchWord}`).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      } 
    )
  }, []);

  return (
    <span className="font-link">
      <h1>Search</h1>
      <p>{searchType.searchType}</p>
      <p>{searchWord.searchWord}</p>
    </span>
  )
}

export default Search