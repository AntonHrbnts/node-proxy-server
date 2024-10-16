const express = require("express");
const app = express();
const meteorController = require('../UseCases/meteorController.js')

const nunjucks = require('nunjucks')

nunjucks.configure('views', {
    autoescape: true,
    express: app
})
app.set('view engine', 'njk')

app.listen(8000, ()=> {
    console.log("Server started, port: 8000")
})

app.get('/meteors', meteorController.getMeteors);