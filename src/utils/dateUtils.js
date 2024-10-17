exports.getStartDateOrDefault = function (startDate) {
    return startDate || new Date().toISOString().split('T')[0];
}

exports.getEndDateOrDefault = function (endDate, startDate) {

    if (endDate) {
        return endDate
    }
    var date = new Date();
    //todo fix bug(if start_date in query and end_date is not present)
    date.setDate(startDate || date.getDate() - 1);
    return date.toISOString().split('T')[0];
}