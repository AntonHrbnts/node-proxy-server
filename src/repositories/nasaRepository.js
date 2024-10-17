const axios = require("axios");
const config = require("../config/config");

async function getMeteors(startDate, endDate) {
    const axiosResponse = await axios.get(
        `${config.nasaBaseUrl}/neo/rest/v1/feed`,
        {
            params: {
                api_key: config.nasaApiKey,
                start_date: startDate,
                end_date: endDate,
            },
        }
    );

    return axiosResponse.data.near_earth_objects;
}

async function getMostRecentImages() {
    const response = await axios.get(
        `${config.nasaBaseUrl}/mars-photos/api/v1/rovers/curiosity/latest_photos`,
        {
            params: {
                api_key: config.nasaApiKey,
            },
        }
    );
    return response.data.latest_photos;
}

const getMostRecentImage = async function () {
    const mostRecentImages = await getMostRecentImages();
    if (mostRecentImages.length > 0) {
        return mostRecentImages[mostRecentImages.length - 1];
    }
    return null;
};

module.exports = { getMeteors, getMostRecentImage };
