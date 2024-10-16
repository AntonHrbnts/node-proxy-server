const nasa = require('../nasa/nasa.client.js')
const mapper = require('./meteor.mapper.js')


const meteorsCallback = async (request, response) => {

    try {
        let meteors = await nasa.getMeteors(
            getStartDateOrDefault(request.query.start_date),
            getEndDateOrDefault(request.query.end_date)
        );
        let adaptedMeteors = mapper(meteors, request.query)
        response.send(adaptedMeteors);
    } catch (error) {
        throw new Error('Error getting data from NASA: ' + error);
    }
};

function getStartDateOrDefault(startDate) {
    return startDate || new Date().toISOString().split('T')[0];
}

function getEndDateOrDefault(endDate) {

    if (endDate) {
        return endDate
    }
    var date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
}

module.exports = meteorsCallback