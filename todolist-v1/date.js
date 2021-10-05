module.exports.getDate = getDate;
module.exports.getDay = getDay;

function getDate() {
    let today = new Date();

    let option = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    return today.toLocaleDateString('en-US', option);
}

function getDay() {
    let today = new Date();

    let option = {
        weekday: 'long',
    };

    return today.toLocaleDateString('en-US', option);
}