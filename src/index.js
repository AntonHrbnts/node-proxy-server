const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const config = require("./config/config.js");
const meteorController = require("./controllers/meteorController.js");
const errorHandler = require("./utils/errorHandler.js");

const app = express();

nunjucks.configure(config.template_path, {
    autoescape: true,
    express: app,
});

app.set("view engine", "njk");
app.use(express.json());

app.get("/meteors", meteorController.getMeteors);
app.get("/meteorsView", meteorController.meteorsView);
app.post("/picture", meteorController.postPicture);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log("Server started, port: " + config.port);
});
