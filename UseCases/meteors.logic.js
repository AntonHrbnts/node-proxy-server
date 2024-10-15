const nasa = require('../nasa/nasa.client.js')
const mapper = require('./meteor.mapper.js')

const meteorsCallback = async (request, response) => {
    let meteors = await nasa.getMeteors(request.query.start_date, request.query.end_date);
    let adaptedMeteors = mapper(meteors)
    response.send(adaptedMeteors);
};

module.exports = meteorsCallback