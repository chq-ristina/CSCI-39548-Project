const express = require('express')
const app = express();
app.use(express.json());
//import {username, password} from './passwords.js';

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://{username}:{password}@cluster0.ovsefug.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//await client.connect();

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
        
        for(var i = 0; i < maxBooks; i++){
            let item = items[i].volumeInfo;
            var data = new Object();
            
            item.hasOwnProperty('title') ? (data.title = item.title): data.title = null;
            item.hasOwnProperty('authors') ? (data.author = item.authors) : data.author = null;
            item.hasOwnProperty('description') ? (data.description = item.description) : data.description = null;
            item.hasOwnProperty('imageLinks') ? (data.img = item.imageLinks.thumbnail) : data.img = null;

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
        
        for(var i = 0; i < maxBooks; i++){
            let item = items[i].volumeInfo;
            var data = new Object();

            item.hasOwnProperty('title') ? (data.title = item.title): data.title = null;
            item.hasOwnProperty('authors') ? (data.author = item.authors) : data.author = null;
            item.hasOwnProperty('description') ? (data.description = item.description) : data.description = null;
            item.hasOwnProperty('imageLinks') ? (data.img = item.imageLinks.thumbnail) : data.img = null;

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
        
        for(var i = 0; i < maxBooks; i++){
            let item = items[i].volumeInfo;
            var data = new Object();

            item.hasOwnProperty('title') ? (data.title = item.title): data.title = null;
            item.hasOwnProperty('authors') ? (data.author = item.authors) : data.author = null;
            item.hasOwnProperty('description') ? (data.description = item.description) : data.description = null;
            item.hasOwnProperty('imageLinks') ? (data.img = item.imageLinks.thumbnail) : data.img = null;

            results.push(data);

        } 
    }
    var temp = results;
    res.send(temp);
    results = [];
})

app.post('/insert', async (req, res) => {
    const {book} = req.params;
    console.log(book);
    /*await client.connect();
    try{
        const database = client.db("CSCI-39548-Project");
        const favorites = database.collection("Favorites");

        const doc = {
            title: req.body.title,
            authors: req.body.authors,
            description: req.body.description,
            img: req.body.img
        }
        const result = await favorites.insertOne(doc);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally{
        await client.close();
    }*/
})

app.get('/get-data', async(req, res) => {
    await client.connect();
    var resultArr = []
    try{
        const database = client.db("CSCI-39548-Project");
        const favorites = database.collection("Favorites");

        const cursor = favorites.find();

        if((await cursor.count()) === 0){
            console.log("No documents found");
        }

        await cursor.forEach((doc) => {
            resultArr.push(doc);
        })
    } finally{
        await client.close();
        res.send(resultArr);
    }
})

app.post('/delete', async(req, res) =>{
    var id = req.id;
    await client.connect();

    try{
        const database = client.db("CSCI-39548-Project");
        const favorites = database.collection("Favorites");

        const query = {"_id": ObjectId(id)};

        const result = await favorites.deleteOne(query);

        if(result.deletedCount === 1){
            console.log("Successfully deleted one document");
        }else{
            console.log("No documents deleted");
        }
    } finally {
        await client.close();
    }
})

app.listen(5000, () => {console.log('Server listening on port 5000...')});