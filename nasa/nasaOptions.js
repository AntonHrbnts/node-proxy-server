process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const api_key = process.env.nasa_api_key

const feed_path = `/neo/rest/v1/feed?api_key=${api_key}`;
console.log(feed_path)

const options = {
    hostname: 'api.nasa.gov',
    port: 443,
    path: feed_path,
    method: 'GET'
  };

 const meteors_path = "https://" +  options.hostname + feed_path;

  module.exports = { meteors_path, options }