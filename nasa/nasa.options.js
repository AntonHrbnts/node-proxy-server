process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const api_key = process.env.nasa_api_key

const feed_path = `/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${api_key}`;
console.log(feed_path)
// const feed_path = `/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=jdT7geV5iPWY5TJWt94rKcO7usE2JQuVWFsX2UkG`;

const options = {
    hostname: 'api.nasa.gov',
    port: 443,
    path: feed_path,
    method: 'GET'
  };

  module.exports = options