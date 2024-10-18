const nasaRepository = require("../repositories/nasaRepository");
const Exception = require("../utils/exception");
const dateUtils = require("../utils/dateUtils");

const getMeteorsData = async ({startDate, endDate, count, wereDangerousMeteors}) => {

    const meteorsData = await nasaRepository.getMeteors(dateUtils.getStartDateOrDefault(startDate), dateUtils.getEndDateOrDefault(endDate, startDate));

    if (!meteorsData) {
        throw new Exception(500, "Failed to fetch data from NASA API");
    }
    let allMeteors = Object.values(meteorsData).flat();

    if (!Array.isArray(allMeteors)) {
        throw new Exception(
            500,
            "Expected an array of meteors, but received something else" + meteorsData
        );
    }

    allMeteors = filterDangerousMeteors(wereDangerousMeteors, allMeteors);
    allMeteors = sliceMeteors(count, allMeteors);

    return toMeteorsDto(allMeteors);
};

function toMeteorsDto(allMeteors) {
    return allMeteors.map(meteor => ({
        id: meteor.id,
        name: meteor.name,
        diameter: meteor.estimated_diameter.meters,
        is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
        close_approach_data: meteor.close_approach_data.map(data => ({
            close_approach_date_full: data.close_approach_date_full,
            kilometers_per_second: data.relative_velocity.kilometers_per_second
        }))
    }));
}

function filterDangerousMeteors(dangerous, allMeteors) {
    if (dangerous) {
        allMeteors = allMeteors.filter((meteor) => meteor.is_potentially_hazardous_asteroid)
    }
    return allMeteors;
}

function sliceMeteors(count, allMeteors) {
    return count ? allMeteors.slice(0, count) : allMeteors;
}


module.exports = getMeteorsData;
