// reminders-script.js
// Implemented by: Aria Siriouthay
// Implemented by Aria Siriouthay
// School Email: aria_siriouthay@student.uml.edu
// Personal Email: aria.siriouthay@gmail.com

// Some help references: 

// Calendar w/ to-do list
// https://www.youtube.com/watch?v=6EVgmpm4z5U&t=145s&ab_channel=OpenSourceCoding

// LocalStorage
// https://www.youtube.com/watch?v=x0VcigW9kN0&ab_channel=OpenJavaScript
// https://stackoverflow.com/questions/40843773/localstorage-keeps-overwriting-my-data
// https://stackoverflow.com/questions/61586194/removing-elements-from-json-array

// Implementing event notes
// https://www.youtube.com/watch?v=AkIUtUWpyZs&t=1s&ab_channel=CodingNepal


// imports for firebase and necessary database functions 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, set, ref, get, onValue, remove} from  "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

$(document).ready(function(){

    // necessary firebase configurations to connect with Sonria's database
    const firebaseConfig = {
    apiKey: "AIzaSyBFeeclMvlSO3wSWm7UoGcanmgjQGrj9gg",
    authDomain: "sonria-e68e7.firebaseapp.com",
    projectId: "sonria-e68e7",
    storageBucket: "sonria-e68e7.appspot.com",
    messagingSenderId: "770936446305",
    appId: "1:770936446305:web:8142c0a0996628d1c63920",
    measurementId: "G-GJJBX8J37X"
  };

    // initalizing firebase configurations
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    // localStorage.clear();

    // accessing the date that appears above calendar, the class that contains all days, and the section that displays today's date
    const date = document.getElementById("date");
    const daysCont = document.querySelector(".days");
    const displayDate = document.querySelector(".today-date");

    // initalizing today's month, day, and year
    let todayDate = new Date();
    let month = todayDate.getMonth();
    let year = todayDate.getFullYear();
    let day = todayDate.getDate();

    // array containing all months
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // setting the current date
    displayDate.innerHTML =  months[month] + " " + day + "th " + year;

    // creating the calender, getting any user data from the database, and saving any data that is not already on the DB.
    initCal(month, year, daysCont);
    getUserData(database, todayDate, month, year);
    saveEvents(database);

    // on click listener sending user over to new-reminders page to fill out form
    $(".btn").click(function(){
        window.location.href = "../pages/new-reminder.html";
    });

    // on click listener for when the previous arrow button is clicked on calendar
    $(".prev").click(function(){
        month--;
        if(month < 0 || month > 11){
            todayDate = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        }
        else{
            todayDate = new Date();
        }
        // reinitalizing the previous month
        initCal(month, year, daysCont);
        clickDays(month, year);
        markEvents(month, year);
    });

    // on click listener for when the next arrow button is clicked on calendar
    $(".next").click(function(){
        month++;
        if(month < 0 || month > 11){
            todayDate = new Date(year, month, new Date().getDate());
            year = todayDate.getFullYear();
            month = todayDate.getMonth();
        }
        else{
            todayDate = new Date();
        }
        // reinitalizing the next month
        initCal(month, year, daysCont);
        clickDays(month, year);
        markEvents(month, year);

    });

    // on click listener to close popups when day is clicked
    const closePopUpBtn = document.getElementsByClassName("close-button")[0];
    closePopUpBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("popup")[0];
        closePopUp(popup);
    });

    // on click listener to close popups when an event title is clicked
    const closeEventPopUpBtn = document.getElementsByClassName("event-close-button")[0];
    closeEventPopUpBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("event-popup")[0];
        closeEventPopUp(popup);
    });

    // on click listener for when user wants to edit a given event
    var currentTitle = "";
    const eventEditBtn = document.getElementById("edit-btn");
    eventEditBtn.addEventListener("click", function(){
        // access the localStorage event data and iterate through it until the 
        // event that the user wishes to edit is found
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        if(obj != null){
            for(let i = 0; i < obj.length; i++){
                // once found, set its edit attribute to true, save this change, and send
                // user over to the new reminders page to make any changes.
                if(obj[i].title === currentTitle){
                    obj[i].edit = "true";
                    obj = JSON.stringify(obj);
                    localStorage.setItem("eventObj", obj);
                    break;
                } 
            }
            window.location.href = "../pages/new-reminder.html";
        }
    });

    // on click listener for when user wishes to delete a given event
    const eventDeleteBtn = document.getElementById("delete-btn");
    eventDeleteBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("event-popup")[0];
        deleteEvents(currentTitle, database);
        closeEventPopUp(popup);
    });

    // on click listener to close popup from when event is clicked
    const eventExitBtn = document.getElementById("exit-btn");
    eventExitBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("event-popup")[0];
        closeEventPopUp(popup);
    });
}); 

// FUNCTIONS BEGIN

// function to save events to the Sonria database
function saveEvents(database){
    // get localStorage objects for the current user and event data
    let userObj = JSON.parse(localStorage.getItem("user")) || [];
    let eventObj = JSON.parse(localStorage.getItem("eventObj"));
    
    // if the event object has data, save this data to the DB
    if(eventObj != null){
        for(let i = 0; i < eventObj.length; i++){
            let eventStr = "/event" + i;
            // creating new subfolder called "events" that contain "event+index" entries
            // and saving it to this path in the DB.
            // each entry has the event title, date, start/end time, notes, and edit info
            set(ref(database, 'users/' + userObj.uid + "/events" + eventStr), {
                eventTitle: eventObj[i].title,
                eventDate: eventObj[i].date,
                eventStarttime: eventObj[i].start,
                eventEndtime: eventObj[i].end,
                eventNote: eventObj[i].note,
                eventEdit: eventObj[i].edit,
            })
            .catch((error) => {
                // The write failed...
                alert("error in saving event data");
            });
        }
    }
}

// function to get user data from DB.
function getUserData(database, todayDate, month, year){

    // getting access to user local storage data and retrieving a ref to their data
    // according to their user id. 
    let userObj = JSON.parse(localStorage.getItem("user")) || [];
    let userRef = ref(database, "users/" + userObj.uid);
    
    // get the user's data from the database
    get(userRef)
    .then((snapshot) => {

    // snapshot allows access to whatever data is stored within DB.
    const userData = snapshot.val();

    // set the greeting to contain the user's username.
    var greeting = document.getElementById("greeting");
    greeting.textContent = "Hi, " + userData.username + "!";

    // reference to the user's event section in the DB.
    let eventsRef = ref(database, "users/" + userObj.uid + "/events");
    onValue(eventsRef, function(snapshot) {
        // the "no tasks" prompt will show if a user has never entered event info into site.
        let noTasks = document.getElementById("notasks");
        let events = [];

        // if this event folder exists, iterate through it and save it to localStorage for ease of
        // transporting this info to/from the new-reminders page.
        if(snapshot.exists()){
            noTasks.style.display = "none";
            onValue(eventsRef, function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                const event = childSnapshot.val();
                if(event != null){
                    // saving all user data to localStorage eventObj.
                    events.push({
                        title: event.eventTitle,
                        date: event.eventDate,
                        start: event.eventStarttime,
                        end: event.eventEndtime,
                        note: event.eventNote,
                        edit: event.eventEdit,
                    });
                    localStorage.setItem("eventObj", JSON.stringify(events));
                }
              });
            });
            // reinitalize the displayed event info according to any data that was retrieved from DB.
            getEvents(todayDate);
            clickDays(month, year);
            markEvents(month, year);
        }
        else{
            // have "no tasks" prompt disappear if user has logged event info.
            noTasks.style.display = "block";
        }
    });
    }) 
    // catch section for any errors during their retrival process.
    .catch((error) => {
    console.error('Error getting user data:', error);
    });
}

// function to delete events, this will also delete from DB.
function deleteEvents(title, database){
    // references to user & their event info
    const userObj = JSON.parse(localStorage.getItem("user")) || [];
    const eventsRef = ref(database, "users/" + userObj.uid + "/events");

    if(localStorage.getItem("eventObj") != null){
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        for(let i = 0; i < obj.length; i++){
            var items = obj[i];
            // if the event item to delete is found, delete it from the localStorage obj using splice
            // and save this change.
            if(items.title == title){
                obj.splice(i,1);
                obj = JSON.stringify(obj);
                localStorage.setItem("eventObj", obj);
                // if the user has deleted their last event
                if(obj == null){
                    noTasks.style.display = "block";
                }
                // iterating through the user's event data in DB and searching for the event through the /event subfolders
                onValue(eventsRef, function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        const event = childSnapshot.val();

                        // if the event to delete is found, delete it from the DB
                        if(event.eventTitle === title){
                            var deleteRef =  ref(database, "users/" + userObj.uid + "/events" + "/" + childSnapshot.key);
                            remove(deleteRef)
                            .then(function() {
                                console.log("Remove succeeded.");
                              })
                              .catch(function(error) {
                                console.log("Remove failed: " + error.message);
                              });
                        }
                    });
                });
                // reload the page to reflect changes.
                location.reload();
            } 
        }
    }
}

// function to mark events on the calendar
function markEvents(month, year){
    const days = document.getElementsByClassName("day");
    if(localStorage.getItem("eventObj") != null){
        // parse through the eventObj and find each event's date and will mark the calendar if this event
        // falls on the current month that the calendar is displaying.
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        for(let i = 0; i < obj.length; i++){
            const event = obj[i];
            for(let i = 0; i < days.length; i++){
                let objDate = new Date(event.date + "T" + event.start);
                if((objDate.getDate() == days[i].textContent) && (objDate.getFullYear() == year) && (objDate.getMonth() == month)){
                    // add the "hasEvent" class if this day does not already have it & if it is not an inactive day (a day from the prev month)    
                    if(!days[i].classList.contains("hasEvent") && !days[i].classList.contains("inactive")){
                        days[i].className += " hasEvent";
                    }
                }
            }
        }
    }
}

// function to display current and upcoming events
function getEvents(todayDate){
    if(localStorage.getItem("eventObj") != null){
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        for(let i = 0; i < obj.length; i++){
            // saving all event data
            const event = obj[i];
            const inputTitle = event.title;
            const inputDate = event.date;
            const inputStartTime = event.start;
            const inputEndTime = event.end;
    
            // initalizing a date with the given times so it can be properly displayed
            const startDate = new Date(inputDate + "T" + inputStartTime);
            const endDate = new Date(inputDate + "T" + inputEndTime);
    
            // converting the time to 12hr time for readibilty.
            const startTimeStr = startDate.toLocaleTimeString('en-US',
                { hour12: true, hour: 'numeric', minute: 'numeric' });
            const endTimeStr = endDate.toLocaleTimeString('en-US',
                { hour12: true, hour: 'numeric', minute: 'numeric' });
    
            //check if the input date is the same as current, send to the today tab
            if ((startDate.getDate() == todayDate.getDate()) && (startDate.getMonth() == todayDate.getMonth()) && (startDate.getFullYear() == todayDate.getFullYear())) {
                const todayTask = document.getElementsByClassName("today-task");
                // updating HTML to display the event info
                todayTask[0].innerHTML += '<div class ="task"><div class="eventTitle" data-title=' + "'" + inputTitle + "'" +  ">" + inputTitle + " " +  "<span>" + (startDate.getMonth() + 1) + 
                "/" + (startDate.getDate()) +  "</span>" + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>";
            }
            // else it will send over to the "upcoming" tab
            else if ((startDate.getMonth() == todayDate.getMonth()) && (startDate.getFullYear() == todayDate.getFullYear()) && (startDate.getDate() > todayDate.getDate())){
                const upcomingTask = document.getElementsByClassName("upcoming-task");
                // updating HTML to display event info
                upcomingTask[0].innerHTML += '<div class ="task"><div class="eventTitle" data-title=' + "'" + inputTitle + "'" + ">" + inputTitle + " " +  "<span>"  + (startDate.getMonth() + 1) + 
                "/" + (startDate.getDate()) + "</span>"  + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>";
            }
            else{
                continue;
            }

        }
    }
}

// function to display the calendar
 function initCal(month, year, daysCont){
    // array for months
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // display the month and year above the calendar
    date.innerHTML = months[month] + " " + year; 
   
    // get the first and last date of the month, including the days on the calendar from the prev/next month
    let firstDay = new Date(year, month, 1).getDay();
    let lastDate= new Date(year, month + 1, 0).getDate();
    let lastDay = new Date(year, month, lastDate).getDay();
    let lastDatePrev = new Date(year, month, 0).getDate();
    
    // holder for any updates to the HTML
    let days = "";

    // set days from prev month to inactive
    for (let i = firstDay; i > 0; i--) {
        days += '<div class="day inactive">' + (lastDatePrev - i + 1) + '</div>';
    }

    // setting up days of the month, if today's day is encountered add necessary class for styling purposes.
    for (let i = 1; i <= lastDate; i++) {
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            days += '<div class ="day today">' + i + '</div>';
        }
        else {
            days += '<div class ="day">' + i + '</div>';
        }
    }

    // set days for the next month to be inactive.
    for(let i = lastDay; i < 6; i++){
        days += '<div class ="day inactive">' + (i - lastDay + 1) + '</div>';

    }
    // updating HTML
    daysCont.innerHTML = days;
 }

// function to make days of the month & event titles clickable and have a popup display with their info
 function clickDays(month, year){
    const days = document.getElementsByClassName("day");;
    if(localStorage.getItem("eventObj") != null){
        const obj = JSON.parse(localStorage.getItem("eventObj"))
        for(let i = 0; i < days.length; i++){
            // adding an event listener that will find days in the eventObj in order to display their data accordingly.
            days[i].addEventListener("click", function(){
                for(let j = 0; j < obj.length; j++){
                    let event = obj[j];
                    let objDate = new Date(event.date + "T" + event.start);
                    if((objDate.getDate() == days[i].textContent) && (objDate.getFullYear() == year) && (objDate.getMonth() == month)){
                        const popup = document.getElementsByClassName("popup")[0];
                        displayPopUp(popup, event.title, event.start, event.end, objDate, event.note);
                    }
                }
            });
        }

        // make event titles clickable
        const eventTitles = document.getElementsByClassName("eventTitle");
        let currentTitle= "";
        for(let i = 0; i < eventTitles.length; i++){
            eventTitles[i].addEventListener("click", function(){
                const eventPopUp = document.getElementsByClassName("event-popup")[0];
                // each event title has a data attribute that holds its name
                currentTitle = eventTitles[i].getAttribute("data-title");
                let obj = JSON.parse(localStorage.getItem("eventObj"));
                let note = "";
                // display the event's note to the popup as well.
                if(obj != null){
                    for(let i = 0; i < obj.length; i++){
                        if(obj[i].title === currentTitle){
                            note = obj[i].note;
                            break;
                        } 
                    }
                }
                displayEventPopUp(eventPopUp, eventTitles[i].textContent, note);
            });
        }
    }
 }

//  function to display popup that appears when a day of the month is clicked that has event.
 function displayPopUp(popup, title, start, end, date, note){
    // access to the necessary components on popup
    const overlay = document.getElementById("overlay");
    const body = document.getElementsByClassName("popup-body")[0];
    const popupTitle = document.getElementsByClassName("popup-title")[0];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(popup == null) return;

    // a filler date is used to attach to the event's start/end time
    const startDate = new Date("2023-07-26" + "T" + start);
    const endDate = new Date("2023-07-26" + "T" + end);

    // convert to 12hr time
    const startTimeStr = startDate.toLocaleTimeString('en-US',
        { hour12: true, hour: 'numeric', minute: 'numeric' });
    const endTimeStr = endDate.toLocaleTimeString('en-US',
        { hour12: true, hour: 'numeric', minute: 'numeric' });

    // setting up the popup's title amd body with the event info/
    popupTitle.textContent = months[date.getMonth()] + " " + date.getDate() + "th, " + date.getFullYear();
    body.innerHTML += "<br>Title: " + title + "<br>Time: " + startTimeStr + " - " + endTimeStr + "<br>Note: " + note;
    // adding class to indicate a popup is currently active.
    popup.classList.add("active");
    overlay.classList.add("active");
 }

//  function to display popup when event title is clicked.
// very similar to the previous except shows less info. 
 function displayEventPopUp(popup, text, note){
    const overlay = document.getElementById("overlay");
    const popupTitle = document.getElementsByClassName("event-popup-title")[0];
    const p = document.getElementById("event-text");
    if(popup == null) return;

    // display the event's title and note.
    popupTitle.textContent = text;
    p.textContent = note;
    popup.classList.add("active");
    overlay.classList.add("active");
 }

//  function to close popup after clicking day
 function closePopUp(popup){
    // removes the active class so popup and overlay is no longer visible.
    const overlay = document.getElementById("overlay");
    const body = document.getElementsByClassName("popup-body")[0];
    if(popup == null) return;
    popup.classList.remove("active");
    overlay.classList.remove("active");
    body.innerHTML="";
 }

//  function to close popup after clicking event title
 function closeEventPopUp(popup){
    const overlay = document.getElementById("overlay");
    if(popup == null) return;
    popup.classList.remove("active");
    overlay.classList.remove("active");
 }