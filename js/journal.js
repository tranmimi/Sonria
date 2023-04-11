// Function to set the display style of an element based on a flag in localStorage
function setDisplayFromFlag(flagName, elementId) {
    const element = document.getElementById(elementId);
    if (localStorage.getItem(flagName) === 'true') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}
// When the "main.html" page loads, call the setDisplayFromFlag function for each element
window.onload = function() {
    setDisplayFromFlag('mmCompleted', 'morning_motivation');
    setDisplayFromFlag('epCompleted', 'journal_page');
    setDisplayFromFlag('dpCompleted', 'daily_planner');
    setDisplayFromFlag('eciCompleted', 'emo_check_in');
};


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

// Get the stored entry time from localStorage
const entryTime = localStorage.getItem("entryTime");
const journalEntryTime = localStorage.getItem("journalEntryTime");

// Display the entry time on the page
const entryTimeDisplay = document.getElementById("mm_entry_time");
entryTimeDisplay.textContent = `${entryTime}`;

const journalTimeDisplay = document.getElementById("entry_time");
journalTimeDisplay.textContent = `${journalEntryTime}`;


/* function displayNewEntryPrompt(){
    const newEntryPrompt = document.getElementById('new_entry_prompt');
    newEntryPrompt.style.display = 'block';
    newEntryPrompt.style.position = 'absolute';
    newEntryPrompt.style.width = '832px';
    newEntryPrompt.style.height = '489px';
    newEntryPrompt.style.left = '304vh';
    newEntryPrompt.style.top = '355vh';
    newEntryPrompt.style.overflow = 'visible';
}
const new_entry_btn = document.getElementById('btnNew_Entry');
new_entry_btn.addEventListener('click', displayNewEntryPrompt); */
