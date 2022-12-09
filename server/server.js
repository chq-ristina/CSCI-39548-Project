const { raw } = require('express');
const express = require('express')
const app = express();

var results = []; //will hold a list of all the data for each book

app.get("/search/Title/:title", async (req, res) => {
    const {title} = req.params;
    if(!title){
        res.send(results);
    }

    const rawData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`);
    const book = await rawData.json();
    
    let total = book.totalItems;
    let maxBooks = Math.min(10, total);
    if(total > 0){
        let items = book.items; //list of all the books, probably will need to parse through the list
        //res.send(items[0].volumeInfo.imageLinks.thumbnail);
        for(var i = 0; i < maxBooks; i++){
            let item = items[i].volumeInfo;
            var data = new Object();

            item.title ? (data.title = item.title): data.title = null;
            item.authors ? (data.author = item.authors) : data.author = null;
            item.description ? (data.description = item.description) : data.description = null;
            items.imageLinks ? (data.img = items.imageLinks.thumbnail) : data.img = null;

            results.push(data);

        } 
    }
    let temp = results;
    results = [];
    res.send(temp);
})

app.get("/search/Author/:author", async (req, res) => {
    const {author} = req.params;
    if(!author){
        res.send(results);
    }

    const rawData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`);
    const book = await rawData.json();
    
    let total = book.totalItems;
    let maxBooks = Math.min(10, total);
    if(total > 0){
        let items = book.items; //list of all the books, probably will need to parse through the list
        //res.send(items[0].volumeInfo.imageLinks.thumbnail);
        for(var i = 0; i < maxBooks; i++){
            let item = items[i].volumeInfo;
            var data = new Object();

            item.title ? (data.title = item.title): data.title = null;
            item.authors ? (data.author = item.authors) : data.author = null;
            item.description ? (data.description = item.description) : data.description = null;
            items.imageLinks ? (data.img = items.imageLinks.thumbnail) : data.img = null;

            results.push(data);

        } 
    }
    let temp = results;
    results = [];
    res.send(temp);
})

app.get("/search/Genre/:genre", async (req, res) => {
    const {genre} = req.params;
    if(!genre){
        res.send(results);
    }

    const rawData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`);
    const book = await rawData.json();
    
    let total = book.totalItems;
    let maxBooks = Math.min(10, total);
    if(total > 0){
        let items = book.items; //list of all the books, probably will need to parse through the list
        //res.send(items[0].volumeInfo.imageLinks.thumbnail);
        for(var i = 0; i < maxBooks; i++){
            let item = items[i].volumeInfo;
            var data = new Object();

            item.title ? (data.title = item.title): data.title = null;
            item.authors ? (data.author = item.authors) : data.author = null;
            item.description ? (data.description = item.description) : data.description = null;
            items.imageLinks ? (data.img = items.imageLinks.thumbnail) : data.img = null;

            results.push(data);

        } 
    }
    var temp = results;
    res.send(temp);
    results = [];
})

app.listen(5000, () => {console.log('Server listening on port 5000...')});
