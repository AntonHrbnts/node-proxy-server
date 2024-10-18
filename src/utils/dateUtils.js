const {format} = require("date-fns");

function getStartDateOrDefault(startDate) {
    return startDate || format(new Date(), "yyyy-MM-dd");
}

function getEndDateOrDefault (endDate) {

    if (endDate) {
        return endDate
    }
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return format(date, "yyyy-MM-dd");
}

module.exports = {getStartDateOrDefault, getEndDateOrDefault};