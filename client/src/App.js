import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Favorite from './Components/pages/Favorites';
import Search from './Components/pages/Search';
import ProductPage from './Components/pages/ProductPage';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import Checkout from './Components/pages/Checkout';
import OrderComplete from './Components/pages/OrderComplete';

/*
Was thinking of doing a drop down bar next to search bar so user can select between searching for a
title, genere, or author
Maybe can use UseState to help with the whole title vs genre or author
If all else fails...do different tabs/components for searching for a title, genre, author
searching for book title can be the main/home page


Changing API to GoogleBooks API
Look at this youtube video (https://www.youtube.com/watch?v=I2UBjN5ER4s) to help with making a single page webpage
Figure out how to use search word for API call...can use searchType state to decide how to call the API just got to learn how
to use reactjs and express js together
*/

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar className="appNavbar"/>
        <Routes>
          <Route path='/'exact element={<Home/>}></Route>
          <Route path='/favorites' element={<Favorite/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/product' element={<ProductPage/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/order-complete' element={<OrderComplete/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
