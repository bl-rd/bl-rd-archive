const { DateTime } = require('luxon');

module.exports = {
    iso: function (date) {
        return DateTime.fromJSDate(date).toISO({
            includeOffset: false,
            suppressMilliseconds: true
        })
    },
    formatDate: function (date) {
        return DateTime.fromJSDate(date).toFormat('dd MMM y');
    }
}