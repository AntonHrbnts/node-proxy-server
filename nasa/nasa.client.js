const https = require('https')
const axios = require('axios')
const {URL} = require('url')

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

async function getMeteors(startDate, endDate) {
  try {
    meteors_url = new URL(meteors_path);
    meteors_url.searchParams.append('start_date', startDate);
    meteors_url.searchParams.append('end_date', endDate);

    return await axios.get(meteors_url.toString());
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