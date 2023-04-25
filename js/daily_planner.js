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

// When the "complete" button is clicked on the page
document.getElementById('btn_Done').addEventListener('click', function() {
    // Set the "formCompleted" flag in local storage to true
    localStorage.setItem('dpCompleted', 'true');
});

// Tasks list
const tasksList = document.getElementById('tasks-list');

tasksList.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        const newItem = document.createElement('li');
        newItem.setAttribute('contenteditable', true);
        newItem.innerHTML = '';
        tasksList.appendChild(newItem);
    }
});