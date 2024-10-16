const nasa = require('../nasa/nasaClient.js')
const adapt = require('./meteorAdaptor.js')
const dateUtils = require('../utils/dateUtils.js')

exports.getMeteorsObjects = async function (request) {
    const startDateOrDefault = dateUtils.getStartDateOrDefault(request.query.start_date);
    const endDateOrDefault = dateUtils.getEndDateOrDefault(request.query.end_date, startDateOrDefault);

    let meteors = await nasa.getMeteors(
        startDateOrDefault,
        endDateOrDefault
    );
    return adapt(meteors, request.query)
}

exports.getMeteors = async (request, response) => {
    try {
        let meteors = await this.getMeteorsObjects(request);
        response.send(meteors);
    } catch (error) {
        throw new Error('Error getting data from NASA: ' + error);
    }
};

exports.meteorsView = function () {
    return async (req, res) => {
        const meteors = await meteorController.getMeteorsObjects(req, res);
        console.log('meteorsView data: ' + meteors);
        res.render('meteors.njk', {meteors})
    };
}

exports.postPicture = async (request, response) => {
    try {
        const {userId, userName, API_KEY} = request.body

        console.log('userId:' + userId)
        console.log('userName:' + userName)

        let image = await nasa.getMostRecentImage(API_KEY);
        response.send(image);
    } catch (error) {
        throw new Error('Error getting data from NASA: ' + error);
    }
};