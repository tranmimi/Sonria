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

// Records exact time that user loads page and records it in local storage
const currentTime = new Date().toLocaleTimeString();
// Store the current time in localStorage with a key of "entryTime"
localStorage.setItem("journalEntryTime", currentTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}));

// When the "complete" button is clicked on the page
document.getElementById('btn_Done').addEventListener('click', function() {
    // Set the "formCompleted" flag in local storage to true
    localStorage.setItem('epCompleted', 'true');
});

// Reference for input elements to be displayed on Journal page
const input = document.getElementById('empty_page_entry');

input.addEventListener('empty_journal_submission', function() {
    localStorage.setItem('btn_done', input.value);
});

