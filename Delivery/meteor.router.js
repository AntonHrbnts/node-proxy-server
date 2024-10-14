const express = require("express");
const app = express();

const meteorsCallback = require('../UseCases/meteors.logic.js')

app.listen(8000, ()=> {
    console.log("Server started, port: 8000")
})

app.get('/meteors', meteorsCallback)