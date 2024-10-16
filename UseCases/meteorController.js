const nasa = require('../nasa/nasa.client.js')
const mapper = require('./meteor.mapper.js')

async function getMeteorsObjects(request) {
    var startDateOrDefault = getStartDateOrDefault(request.query.start_date);
    var endDateOrDefault = getEndDateOrDefault(request.query.end_date, startDateOrDefault);

    let meteors = await nasa.getMeteors(
        startDateOrDefault,
        endDateOrDefault
    );

    let adaptedMeteors = mapper(meteors, request.query)
    return adaptedMeteors;
}

const getMeteors = async (request, response) => {
    try {
        let meteors = await getMeteorsObjects(request);
        response.send(meteors);
    } catch (error) {
        throw new Error('Error getting data from NASA: ' + error);
    }
};

const getMeteorsView = async (request, response) => {
    try {
        var meteors = getMeteorsObjects(request);
    } catch (error) {
        throw new Error('Error getting data from NASA: ' + error);
    }
};


function getStartDateOrDefault(startDate) {
    return startDate || new Date().toISOString().split('T')[0];
}

function getEndDateOrDefault(endDate, startDate) {

    if (endDate) {
        return endDate
    }
    var date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
}

module.exports = getMeteors