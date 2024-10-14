const express = require("express")
const feed = require('./nasa/nasa.client.js')
const app = express();

app.listen(8000, ()=> {
    console.log("Server started, port: 8000")
})
feed()