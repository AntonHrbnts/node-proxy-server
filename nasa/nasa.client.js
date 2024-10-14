const https = require('https')
const axios = require('axios')
const { meteors_path, options } = require('./nasa.options.js')


const feed = (() => {
  const req = https.request(options, (res) => {

    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });

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

async function getMeteors(params) {
  try {
    const response = await axios.get(meteors_path);
    return response;
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

module.exports = { feed, getMeteors }