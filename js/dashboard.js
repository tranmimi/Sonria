/*
    File: dashboard.js

    A file which adds dynamic functionality to the Dashboard. 
*/

/*
    Functionality for Mood Tracker modal box.

        Part of the code is referenced from:
            https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
*/

// Get the Modal Box and Confirm button
var modal = document.getElementById("mood-tracker-modal-box");
var second_modal = document.getElementById("second-mood-tracker-modal-box");
var second_modal_content = document.getElementById("second-mood-tracker-content");
var confirm_btn = document.getElementById("mood-confirm");
var second_confirm_btn = document.getElementById("second-mood-confirm");

// Get individual emoji Moods
var angry = document.getElementById("angry-face");
var sad = document.getElementById("crying-face");
var worried = document.getElementById("worried-face");
var neutral = document.getElementById("neutral-face");
var smile = document.getElementById("smiling-face");
var happy = document.getElementById("happy-face");

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

for (let i = 1; i <= lastDateofMonth; i++) { let isToday=i===date.getDate() && currMonth===new Date().getMonth() && currYear===new Date().getFullYear() ? "active today-mood" : "" ; liTag +=`<li class="${isToday} other-day" id="day${i}">${i}</li>`;
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
            });
        }
    })

    // Change any other day's Mood
    // This code causes every day the user logged a Mood on (that isn't the current day) to have the same Mood even if different Moods were logged for different days.
    // I'm not sure how to fix it. Hardcoding everything results in the same issue. For whatever reason, the click() function is holding onto the IDs of all previously
    // clicked-on days. I have no idea how to fix that.

    $(".other-day").click(function(e) {
        let day_id = "#" + this.id;
        console.log(day_id);
        second_modal.style.display = "block";
        second_modal_content.style.display = "block";
        $(".emoji-this-day").click(function(e) {
            var selected_mood = this.id;
            second_confirm_btn.disabled = false;
            if(second_confirm_btn.disabled === false) {
                $("#second-mood-confirm").click(function(e) {
                    second_modal.style.display = "none";
                    second_modal_content.style.display = "none";
                    // Replace today's date with selected Mood
                    console.log(day_id);
                    switch(selected_mood) {
                        case "angry-face":
                            $(day_id).html('<img src="../img/🦆 emoji _pouting face_.png" style="height:40px;width:40px;">');
                            // $("#day1").html('<img src="../img/🦆 emoji _pouting face_.png" style="height:40px;width:40px;">');
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
                });
            }
        })
    })

});

