const express = require('express')
const app = express();

app.listen(5000, () => {console.log('Server listening on port 5000...')});

app.get("/search", (req, res) => {
    res.send({1 : "searching..."});
})

app.get("/search/author", (req, res) => {
    res.send({1 : "searching..."});
})

app.get("/search/genre", (req, res) => {
    res.send({1 : "searching..."});
})