const express = require("express");
const meteorsCallback = require('./meteors.logic.js')
const app = express();

app.listen(8000, ()=> {
    console.log("Server started, port: 8000")
})

app.get('/meteors', (req, res) => meteorsCallback)