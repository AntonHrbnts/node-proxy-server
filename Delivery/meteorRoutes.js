const express = require("express");
const app = express();
const meteorController = require('../UseCases/meteorController.js')

const nunjucks = require('nunjucks')

nunjucks.configure('templates', {
    autoescape: true,
    express: app
})
app.set('view engine', 'njk')
app.use(express.json())

app.listen(8000, ()=> {
    console.log("Server started, port: 8000")
})

app.get('/meteors', meteorController.getMeteors);
app.get('/meteorsView', meteorsView());
app.post('/picture', meteorController.postPicture)

function meteorsView() {
    return async (req, res) => {
        const meteors = await meteorController.getMeteorsObjects(req, res);
        console.log('meteorsView data: ' + meteors);
        res.render('meteors.njk', {meteors})
    };
}