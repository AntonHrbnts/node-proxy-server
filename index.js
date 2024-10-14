const express = require("express")
const axios = require('axios')

const feed = require('./nasa/nasa.client.js')
const app = express();

app.listen(8000, ()=> {
    console.log("Server started, port: 8000")
})

app.get('/meteors', (req, res) => {
    axios.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=jdT7geV5iPWY5TJWt94rKcO7usE2JQuVWFsX2UkG')
    .then(response => {
        console.log(response)
        res.send(response.data)})
    .catch(error => {console.log(error)})
})
