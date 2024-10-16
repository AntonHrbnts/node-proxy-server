function modify(meteorsResponse, query) {
    console.log(meteorsResponse)
    var allMeteors = extractMeteors(meteorsResponse);

    allMeteors = filterDangerousMeteors(query, allMeteors);
    allMeteors = sliceMeteors(query, allMeteors);
    return toMeteorsModel(allMeteors);
}

function extractMeteors(meteorsResponse) {
    const meteorData = meteorsResponse.data.near_earth_objects;
    var allMeteors = Object.values(meteorData).flat();
    return allMeteors;
}

function filterDangerousMeteors(query, allMeteors) {
    var dangerous = query.dangerous;
    if (dangerous === 'true') {
        allMeteors = allMeteors.filter((meteor) => meteor.is_potentially_hazardous_asteroid)
    } else if (dangerous === 'false') {
        allMeteors = allMeteors.filter((meteor) => !meteor.is_potentially_hazardous_asteroid)
    }
    return allMeteors;
}

function sliceMeteors(query, allMeteors) {
    return query.count ? allMeteors.slice(0, query.count) : allMeteors;
}

function toMeteorsModel(allMeteors) {
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


module.exports = modify