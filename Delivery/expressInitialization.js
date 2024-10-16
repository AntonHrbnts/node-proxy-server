const config = require("../config/config");

function expressInit() {
    const config = require("../config/config.js");
    const express = require("express");
    const app = express();

    const nunjucks = require('nunjucks')

    nunjucks.configure(config.template_path, {
        autoescape: true,
        express: app
    })

    app.set('view engine', 'njk')
    app.use(express.json())

    app.listen(config.port, () => {
        console.log("Server started, port: " + config.port)
    })
    return app;
}

module.exports = expressInit;