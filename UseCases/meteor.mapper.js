function modify(meteors) {
    console.log(meteors)
    const meteorData = meteors.data.near_earth_objects;
    const allMeteors = Object.values(meteorData).flat();

    const adaptedMeteors = allMeteors.map(meteor => ({
        id: meteor.id,
        name: meteor.name,
        diameter: meteor.estimated_diameter.meters,
        is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
        close_approach_data: meteor.close_approach_data.map(data => ({
            close_approach_date_full: data.close_approach_date_full,
            kilometers_per_second: data.relative_velocity.kilometers_per_second
        }))
    }));

    return adaptedMeteors;
}

module.exports = modify