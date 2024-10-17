process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
require("dotenv").config();

const config = {
    port: process.env.PORT,
    template_path: "templates",
    nasaBaseUrl: process.env.NASA_BASE_URL,
    nasaApiKey: process.env.NASA_API_KEY,
};

module.exports = config;
