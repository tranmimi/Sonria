/*
    File: dashboard.js

    A file which adds dynamic functionality to the Dashboard. 

    TODO: Fix how localStorage data is retrieved. Currently, today's Mood isn't saved in localStorage and 
            saved Moods on other days will only reappear after a browser refresh if a day on the
            Calendar is clicked on.
*/

// Get the Modal Box and Confirm button
var modal = document.getElementById("mood-tracker-modal-box");
var confirm_btn = document.getElementById("mood-confirm");

/*
    For the Mood Tracker Calendar
        Code referenced and modified from https://gosnippets.com/snippets/dynamic-calendar-with-pure-css-and-javascript
*/
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

const renderCalendar = () => {
let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
let liTag = "";

for (let i = firstDayofMonth; i > 0; i--) {
liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
}

for (let i = 1; i <= lastDateofMonth; i++) { let isToday=i===date.getDate() && currMonth===new Date().getMonth() && currYear===new Date().getFullYear() ? "active today-mood" : "" ; liTag +=`<li class="${isToday} not-today" id="day${i}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { liTag +=`<li class="inactive">${i - lastDayofMonth + 1}</li>`
        }
        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;
        }
        renderCalendar();

        prevNextIcon.forEach(icon => {
        icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth> 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
            } else {
            date = new Date();
            }
            renderCalendar();
            });
            });

// Stores all logged Moods in localStorage
function saveMoodOfADay(user_mood, day_id) {
    let mood_img;

    // Get local image path of selected mood based on user_mood 
    switch(user_mood) {
        case "angry-face":
           mood_img = '<img src="../img/🦆 emoji _pouting face_.png" style="height:40px;width:40px;">';
            break;
        case "crying-face":
            mood_img = '<img src="../img/🦆 emoji _loudly crying face_.png" style="height:40px;width:40px;">';
            break;
        case "worried-face":
            mood_img = '<img src="../img/🦆 emoji _worried face_.png" style="height:40px;width:40px;">';
            break;
        case "neutral-face":
            mood_img = '<img src="../img/🦆 emoji _neutral face_.png" style="height:40px;width:40px;">';
            break;
        case "smiling-face":
            mood_img = '<img src="../img/🦆 emoji _slightly smiling face_.png" style="height:40px;width:40px;">';
            break;
        case "happy-face":
            mood_img = '<img src="../img/🦆 emoji _smiling face with open mouth and smiling eyes_.png" style="height:40px;width:40px;">';
            break;
    }

    // Save data in a mood_date_obj
    const mood_date_obj = {
        mood_id: user_mood,
        mood_img: mood_img,
        day_id: day_id
    }

    // const print = JSON.stringify(mood_date_obj);
    // alert(print); 

    // Save mood_date_obj into localStorage and call a function display the saved Moods
    window.localStorage.setItem(day_id, JSON.stringify(mood_date_obj));
    displaySavedMoods();
}

// Display all saved Moods on the appropriate days
function displaySavedMoods() {
    // Retrieve each key in localStorage and parse each key's mood_img data in order to display it on the page
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let obj = JSON.parse(localStorage.getItem(key))
;       $(obj.day_id).html(obj.mood_img);
    }
    
}

$(document).ready(function() {
  // Retrieve the id of the selected Mood
  // Enable Confirm button after selection
  // Make Confirm button close the modal box

    $(".emoji-today").click(function(e) {
        var selected_mood = this.id;
        //console.log(selected_mood);
        confirm_btn.disabled = false;
        if(confirm_btn.disabled === false) {
            $("#mood-confirm").click(function(event) {
                modal.style.display = "none";
                // Replace today's date with selected Mood
                switch(selected_mood) {
                    case "angry-face":
                        $(".today-mood").html('<img src="../img/🦆 emoji _pouting face_.png" style="height:40px;width:40px;">');
                        break;
                    case "crying-face":
                        $(".today-mood").html('<img src="../img/🦆 emoji _loudly crying face_.png" style="height:40px;width:40px;">');
                        break;
                    case "worried-face":
                        $(".today-mood").html('<img src="../img/🦆 emoji _worried face_.png" style="height:40px;width:40px;">');
                        break;
                    case "neutral-face":
                        $(".today-mood").html('<img src="../img/🦆 emoji _neutral face_.png" style="height:40px;width:40px;">');
                        break;
                    case "smiling-face":
                        $(".today-mood").html('<img src="../img/🦆 emoji _slightly smiling face_.png" style="height:40px;width:40px;">');
                        break;
                    case "happy-face":
                        $(".today-mood").html('<img src="../img/🦆 emoji _smiling face with open mouth and smiling eyes_.png" style="height:40px;width:40px;">');
                        break;
                }
                // saveMoodOfADay(selected_mood, day_id); // Need to save today's Mood -> figure out later
            });
        }
    })

    // Change a day's Mood IF it is one of the days of the current month and isn't today
    $(".not-today").click(function(e) {
        // Retrieve selected day's ID
        var day_id = "#" + this.id;

        // Create and insert Mood Tracker Modal Box into body of Dashboard page
        $("<div id='second-mood-tracker-modal-box'><div id='second-mood-tracker-content'><h2>How did you feel on this day?</h2><ul id='emoji-lineup'><li><button class='emoji-this-day' id='angry-face'><img src='../img/🦆 emoji _pouting face_.png'></button></li><li><button class='emoji-this-day' id='crying-face'><img src='../img/🦆 emoji _loudly crying face_.png'></button></li><li><button class='emoji-this-day' id='worried-face'><img src='../img/🦆 emoji _worried face_.png'></button></li><li><button class='emoji-this-day' id='neutral-face'><img src='../img/🦆 emoji _neutral face_.png'></button></li><li><button class='emoji-this-day' id='smiling-face'><img src='../img/🦆 emoji _slightly smiling face_.png'></button></li><li><button class='emoji-this-day' id='happy-face'><img src='../img/🦆 emoji _smiling face with open mouth and smiling eyes_.png'></button></li></ul><button class='normal-btn' id='second-mood-confirm' disabled>Confirm</button></div></div>")
        .insertAfter(".main-area");

        // Retrieve selected Mood and display it on the Calendar 
        $(".emoji-this-day").click(function(e) {
            var selected_mood = this.id;
            var second_confirm_btn = document.getElementById("second-mood-confirm");
            second_confirm_btn.disabled = false;
            if(second_confirm_btn.disabled === false) {
                $("#second-mood-confirm").click(function(e) {
                    var second_modal = document.getElementById("second-mood-tracker-modal-box");
                    second_modal.remove();
                    switch(selected_mood) {
                        case "angry-face":
                            $(day_id).html('<img src="../img/🦆 emoji _pouting face_.png" style="height:40px;width:40px;">');
                            break;
                        case "crying-face":
                            $(day_id).html('<img src="../img/🦆 emoji _loudly crying face_.png" style="height:40px;width:40px;">');
                            break;
                        case "worried-face":
                            $(day_id).html('<img src="../img/🦆 emoji _worried face_.png" style="height:40px;width:40px;">');
                            break;
                        case "neutral-face":
                            $(day_id).html('<img src="../img/🦆 emoji _neutral face_.png" style="height:40px;width:40px;">');
                            break;
                        case "smiling-face":
                            $(day_id).html('<img src="../img/🦆 emoji _slightly smiling face_.png" style="height:40px;width:40px;">');
                            break;
                        case "happy-face":
                            $(day_id).html('<img src="../img/🦆 emoji _smiling face with open mouth and smiling eyes_.png" style="height:40px;width:40px;">');
                            break;
                    }

                    // Save the selected Mood and day in localStorage for future user sessions
                    saveMoodOfADay(selected_mood, day_id);
                });
            }
        })
    })
});
