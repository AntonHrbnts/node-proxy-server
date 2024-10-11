const https = require('https')
const options = require('./nasa.options.js')

const feed = (()=>{ 
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
  });
  req.on('error', (e) => {
    console.error(e);
  });

  req.end();
});

module.exports = feed