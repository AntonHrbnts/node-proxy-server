const nasaRepository = require("../repositories/nasaRepository");
const Exception = require("../utils/exception");
const dateUtils = require("../utils/dateUtils");

const getMeteorsData = async ({ date, count, wereDangerousMeteors }) => {
    const startDate = dateUtils.getStartDateOrDefault(date);
    const endDate = dateUtils.getEndDateOrDefault(date, startDate);

    const meteorsData = await nasaRepository.getMeteors(startDate, endDate);

    if (!meteorsData) {
        throw new Exception(500, "Failed to fetch data from NASA API");
    }

    const meteorsArray = meteorsData[startDate];

    if (!Array.isArray(meteorsArray)) {
        throw new Exception(
            500,
            "Expected an array of meteors, but received something else"
        );
    }

    const filteredData = meteorsArray.map((meteor) => {
        const diameter_meters =
            meteor.estimated_diameter?.meters?.estimated_diameter_max || "unknown";
        const closeApproachData = meteor.close_approach_data?.[0] || {};
        const close_approach_date_full =
            closeApproachData.close_approach_date_full || "unknown";
        const relative_velocity_kps =
            closeApproachData.relative_velocity?.kilometers_per_second || "unknown";

        return {
            id: meteor.id || "unknown",
            name: meteor.name || "unknown",
            diameter_meters,
            is_potentially_hazardous_asteroid:
                meteor.is_potentially_hazardous_asteroid || false,
            close_approach_date_full,
            relative_velocity_kps,
        };
    });

    if (count) {
        return { count: filteredData.length };
    }

    if (wereDangerousMeteors) {
        const dangerousMeteors = filteredData.filter(
            (meteor) => meteor.is_potentially_hazardous_asteroid
        );
        return { wereDangerousMeteors: dangerousMeteors.length > 0 };
    }

    return filteredData;
};

module.exports = getMeteorsData;
