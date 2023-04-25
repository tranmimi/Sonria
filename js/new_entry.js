// Gets accurate date for today
const dateElement = document.querySelector(".date_prompt");
/**
 * @param {Date} date
 */
function formatDate(date){
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `Today is ${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}
const currentDate = new Date();
dateElement.textContent = formatDate(currentDate);