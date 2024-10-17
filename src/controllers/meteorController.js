const { format } = require("date-fns");
const nasaRepository = require("../repositories/nasaRepository.js");
const getMeteorsData = require("../services/meteorService.js");
const stringToBoolean = require("../utils/booleanUtil.js");

const getMeteors = async (req, res, next) => {
    try {
        const date = req.query.date || format(new Date(), "yyyy-MM-dd");
        const count = stringToBoolean(req.query.count);
        const wereDangerousMeteors = stringToBoolean(
            req.query.wereDangerousMeteors
        );

        const meteors = await getMeteorsData({ date, count, wereDangerousMeteors });

        res.send(meteors);
    } catch (error) {
        next(error);
    }
};

const meteorsView = async (req, res, next) => {
    try {
        const date = req.query.date || format(new Date(), "yyyy-MM-dd");
        const count = stringToBoolean(req.query.count);
        const wereDangerousMeteors = stringToBoolean(
            req.query.wereDangerousMeteors
        );

        const meteors = await getMeteorsData({ date, count, wereDangerousMeteors });

        console.log("meteorsView data: " + meteors);
        res.render("meteors.njk", { meteors });
    } catch (error) {
        next(error);
    }
};

const postPicture = async (req, res, next) => {
    try {
        const { userId, userName } = req.body;

        console.log("userId:" + userId);
        console.log("userName:" + userName);

        const image = await nasaRepository.getMostRecentImage();
        res.send(image);
    } catch (error) {
        next(error);
    }
};

module.exports = { getMeteors, meteorsView, postPicture };
