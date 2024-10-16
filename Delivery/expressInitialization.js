function expressInit() {
    const express = require("express");
    const app = express();

    const nunjucks = require('nunjucks')

    nunjucks.configure('templates', {
        autoescape: true,
        express: app
    })

    app.set('view engine', 'njk')
    app.use(express.json())

    app.listen(8000, () => {
        console.log("Server started, port: 8000")
    })
    return app;
}

module.exports = expressInit;