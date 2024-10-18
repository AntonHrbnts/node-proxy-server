const nasaRepository = require("../repositories/nasaRepository.js");
const getMeteorsData = require("../services/meteorService.js");
const stringToBoolean = require("../utils/booleanUtil.js");
const Joi = require('joi');

const getMeteors = async (req, res, next) => {
    try {
        const schema = Joi.object({
            start_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
            end_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
            count: Joi.number().min(1).optional(),
            wereDangerousMeteors: Joi.bool().optional(),
        })
        const {error, value} = schema.validate(req.query)
        if (error) {
            return next(error);
        }

        const startDate = req.query.start_date;
        const endDate = req.query.end_date;
        const count = req.query.count;

        const wereDangerousMeteors = stringToBoolean(
            req.query.wereDangerousMeteors
        );

        const meteors = await getMeteorsData({startDate, endDate, count, wereDangerousMeteors});

        res.send(meteors);
    } catch (error) {
        next(error);
    }
};

const meteorsView = async (req, res, next) => {
    try {
        const schema = Joi.object({
            start_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
            end_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
            count: Joi.number().min(1).optional(),
            wereDangerousMeteors: Joi.bool().optional(),
        })
        const {error, value} = schema.validate(req.query)
        if (error) {
            return next(error);
        }

        const startDate = req.query.start_date;
        const endDate = req.query.end_date;
        const count = req.query.count;

        const wereDangerousMeteors = stringToBoolean(
            req.query.wereDangerousMeteors
        );

        const meteors = await getMeteorsData({startDate, endDate, count, wereDangerousMeteors});

        console.log("meteorsView data: " + meteors);
        res.render("meteors.njk", {meteors});
    } catch (error) {
        next(error);
    }
};

const postPicture = async (req, res, next) => {
    try {
        const schema = Joi.object({
            userId: Joi.number().min(1).required(),
            userName: Joi.string().min(3).max(50).required()
        })

        const {error, value} = schema.validate(req.body)
        if (error) {
            return next(error);
        }
        const {userId, userName} = req.body;
        console.log("userId:" + userId);
        console.log("userName:" + userName);

        const image = await nasaRepository.getMostRecentImage();
        res.send(image);
    } catch (error) {
        next(error);
    }
};

const postPictureView = async (req, res, next) => {
    try {
        const schema = Joi.object({
            userId: Joi.number().min(1).required(),
            userName: Joi.string().min(3).max(50).required()
        })

        const {error, value} = schema.validate(req.body)
        if (error) {
            return next(error);
        }
        const {userId, userName} = req.body;
        console.log("userId:" + userId);
        console.log("userName:" + userName);

        const image = await nasaRepository.getMostRecentImage();
        console.log("image:" + image.img_src);
        res.render("recentPhoto.njk", image)
    } catch (error) {
        next(error);
    }
};

module.exports = {getMeteors, meteorsView, postPicture, postPictureView};
