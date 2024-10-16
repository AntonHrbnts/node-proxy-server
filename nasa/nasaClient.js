const https = require('https')
const axios = require('axios')
const {URL} = require('url')

const {meteors_path, options} = require('./nasaOptions.js')

async function getMeteors(startDate, endDate) {
    try {
        meteors_url = new URL(meteors_path);
        meteors_url.searchParams.append('start_date', startDate);
        meteors_url.searchParams.append('end_date', endDate);

        var axiosResponse = await axios.get(meteors_url.toString());
        console.log(axiosResponse)
        return axiosResponse;
    } catch (error) {
        if (error.response) {
            console.error(error.response.satus + ": " + error.response.data)
        } else if (error.request) {
            console.error(error.request.satus + ": " + error.request.data)
        } else {
            console.error(error.message)
        }
    }
}

async function getMostRecentImages(API_KEY) {
    const imageUri = new URL('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos')
    imageUri.searchParams.append('api_key', API_KEY)
    try {
        const response = await axios.get(imageUri);
        return response.data.latest_photos;
    } catch (error) {
        console.error('Error getting recent images: ' + error)
    }
    return null;
}

const getMostRecentImage = async function (API_KEY) {
    const mostRecentImages = await getMostRecentImages(API_KEY);
    if (mostRecentImages.length > 0) {
        return mostRecentImages[mostRecentImages.length - 1];
    }
    return null;
}

const feed = (() => {
    const req = https.request(options, (res) => {

        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });

        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
        return rawData;
    });
    req.on('error', (e) => {
        console.error(e);
    });

    req.end();
});

module.exports = {feed, getMeteors, getMostRecentImage}