const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const bookTemplateCopy = require('./BookModels')
const userTemplateCopy = require('./UserModels')

app.use(express.json());
app.use(cors());

dotenv.config()


const { MongoClient, ServerApiVersion } = require('mongodb');
const { collection } = require('./UserModels')
const uri = process.env.DATABASE_ACCESS;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

var results = []; //will hold a list of all the data for each book

app.get("/search/Title/:title", async (req, res) => {
    const { title } = req.params;
    if (!title) {
        res.send(results);
    }

    const rawData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&maxResults=40`);
    const book = await rawData.json();
    // console.log(book);
    let total = book.totalItems;
    if (total > 0) {
        let items = book.items; //list of all the books, probably will need to parse through the list

        for (var i = 0; i < total; i++) {
            if (items[i]?.volumeInfo) {
                let item = items[i].volumeInfo;
                var data = new Object();

                item.hasOwnProperty('title') ? (data.title = item.title) : data.title = null;
                item.hasOwnProperty('authors') ? (data.author = item.authors) : data.author = null;
                item.hasOwnProperty('description') ? (data.description = item.description) : data.description = null;
                item.hasOwnProperty('imageLinks') ? (data.img = item.imageLinks.thumbnail) : data.img = null;

                results.push(data);
            }

        }
    }
    let temp = results;
    //console.log("debug: ", temp);
    results = [];
    res.send(temp);
})

app.get("/search/Author/:author", async (req, res) => {
    const { author } = req.params;
    if (!author) {
        res.send(results);
    }

    const rawData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&maxResults=40`);
    const book = await rawData.json();

    let total = book.totalItems;
    if (total > 0) {
        let items = book.items; //list of all the books, probably will need to parse through the list

        for (var i = 0; i < total; i++) {
            if (items[i]?.volumeInfo) {
                let item = items[i].volumeInfo;
                var data = new Object();

                item.hasOwnProperty('title') ? (data.title = item.title) : data.title = null;
                item.hasOwnProperty('authors') ? (data.author = item.authors) : data.author = null;
                item.hasOwnProperty('description') ? (data.description = item.description) : data.description = null;
                item.hasOwnProperty('imageLinks') ? (data.img = item.imageLinks.thumbnail) : data.img = null;

                results.push(data);

            }

        }
    }
    let temp = results;
    results = [];
    res.send(temp);
})

app.get("/search/Genre/:genre", async (req, res) => {
    const { genre } = req.params;
    if (!genre) {
        res.send(results);
    }

    const rawData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=40`);
    const book = await rawData.json();

    let total = book.totalItems;
    if (total > 0) {
        let items = book.items; //list of all the books, probably will need to parse through the list

        for (var i = 0; i < total; i++) {
            if (items[i]?.volumeInfo) {
                let item = items[i].volumeInfo;
                var data = new Object();

                item.hasOwnProperty('title') ? (data.title = item.title) : data.title = null;
                item.hasOwnProperty('authors') ? (data.author = item.authors) : data.author = null;
                item.hasOwnProperty('description') ? (data.description = item.description) : data.description = null;
                item.hasOwnProperty('imageLinks') ? (data.img = item.imageLinks.thumbnail) : data.img = null;

                results.push(data);

            }

        }
    }
    var temp = results;
    res.send(temp);
    results = [];
})

app.post('/insert', async (req, res) => {
    await client.connect();
    try {
        const database = client.db("CSCI-39548-Project");
        const favorites = database.collection("Favorites");

        const favoritedBook = new bookTemplateCopy({
            title: req.body.title,
            author: req.body.author,
            img: req.body.img,
            description: req.body.description,
            favorite: req.body.favorite
        })
        const result = await favorites.insertOne(favoritedBook);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
})

app.get('/get-data', async (req, res) => {
    await client.connect();
    var resultArr = []
    try {
        const database = client.db("CSCI-39548-Project");
        const favorites = database.collection("Favorites");

        const cursor = favorites.find();

        if ((await cursor.count()) === 0) {
            console.log("No documents found");
        }

        await cursor.forEach((doc) => {
            resultArr.push(doc);
        })
    } finally {
        await client.close();
        res.send(resultArr);
    }
})

app.post('/delete', async (req, res) => {
    var id = req.body.id;
    console.log("id", id);
    await client.connect();

    try {
        const database = client.db("CSCI-39548-Project");
        const favorites = database.collection("Favorites");
        const query = { "_id": new mongoose.mongo.ObjectId(id) };

        const result = await favorites.deleteOne(query);

        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document");
        } else {
            console.log("No documents deleted");
        }
    } finally {
        await client.close();
    }
})

app.get("/login", cors(),(req, res) =>{

})

app.post("/login", async(req, res)=>{
    await client.connect();
    try{
        const database = client.db("CSCI-39548-Project");
        const users = database.collection("Users");

        const{email, password} = req.body;

        const checkEmail = await users.findOne({email:email});
        
        if (checkEmail){
            const checkPassword = await users.findOne({password:password});
            
            if(checkPassword){
                res.json("exists");
                console.log("User exists");
            }
            else{
                res.json("wrong password");
                console.log("User does not exist: password");
            }
        }else{
            res.json("wrong email");
            console.log("User does not exist: email")
        }
    }finally{
        await client.close();
    }
})

app.post("/register", async(req, res)=>{
    await client.connect();
    try{
        const database = client.db("CSCI-39548-Project");
        const users = database.collection("Users");

        const user = new userTemplateCopy({
            email: req.body.email,
            password: req.body.password,
            fname: req.body.fname,
            lname: req.body.lname
        })

        const check = await users.findOne({email: req.body.email});

        if(check){
            res.json("exists")
        }else{
            res.json("doesn't exist");
            const result = await users.insertOne(user);
            console.log(`A document was inserted with the _id: ${result.insertedId}`)
        }
        
    }finally{
        await client.close();
    }
})

app.listen(5000, () => { console.log('Server listening on port 5000...') });