/*
    File: dashboard.js

    A file which adds dynamic functionality to the Dashboard. 

    Features completed:
    - Mood tracker modal box. (no data collection yet)
    - 

    Features TODO:
    - When an emoji is selected, either:
        - ENLARGE emoji to show which emoji the user selected.
        - Fade other emojis that were not clicked.
    - Mood tracker data collection. (connect with Firebase)
    - Sync data recorded in Reminders to "Did you miss anything?" box.

*/

/*
    Functionality for Mood Tracker modal box.

        Part of the code is referenced from:
            https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
*/

// Get the modal box and Confirm button
var modal = document.getElementById("mood-tracker-modal-box");
var confirm_btn = document.getElementById("mood-confirm");

// Get individual emoji Moods
var angry = document.getElementById("angry-face");
var sad = document.getElementById("crying-face");
var worried = document.getElementById("worried-face");
var neutral = document.getElementById("neutral-face");
var smile = document.getElementById("smiling-face");
var happy = document.getElementById("happy-face");

// After selecting a Mood, make it shake to indicate selection
// angry.onclick = function() {
//     angry.setAttribute("id", "wiggle");

//     // Remove "wiggle" id from all other Moods if there was a previous selection.
//     sad.removeAttribute("id");
//     sad.setAttribute("id", "crying-face");
//     worried.removeAttribute("id");
//     worried.setAttribute("id", "worried-face");
//     neutral.removeAttribute("id");
//     neutral.setAttribute("id", "neutral-face");
//     smile.removeAttribute("id");
//     smile.setAttribute("id", "smiling-face");
//     happy.removeAttribute("id");
//     happy.setAttribute("id", "happy-face");
// }
// sad.onclick = function() {
//     sad.setAttribute("id", "wiggle");

//     // Remove "wiggle" id from all other Moods if there was a previous selection.
//     angry.removeAttribute("id");
//     angry.setAttribute("id", "angry-face");
//     worried.removeAttribute("id");
//     worried.setAttribute("id", "worried-face");
//     neutral.removeAttribute("id");
//     neutral.setAttribute("id", "neutral-face");
//     smile.removeAttribute("id");
//     smile.setAttribute("id", "smiling-face");
//     happy.removeAttribute("id");
//     happy.setAttribute("id", "happy-face");
// }
// worried.onclick = function() {
//     worried.setAttribute("id", "wiggle");

//     // Remove "wiggle" id from all other Moods if there was a previous selection.
//     sad.removeAttribute("id");
//     sad.setAttribute("id", "crying-face");
//     angry.removeAttribute("id");
//     angry.setAttribute("id", "angry-face");
//     neutral.removeAttribute("id");
//     neutral.setAttribute("id", "neutral-face");
//     smile.removeAttribute("id");
//     smile.setAttribute("id", "smiling-face");
//     happy.removeAttribute("id");
//     happy.setAttribute("id", "happy-face");
// }
// neutral.onclick = function() {
//     neutral.setAttribute("id", "wiggle");

//     // Remove "wiggle" id from all other Moods if there was a previous selection.
//     sad.removeAttribute("id");
//     sad.setAttribute("id", "crying-face");
//     worried.removeAttribute("id");
//     worried.setAttribute("id", "worried-face");
//     angry.removeAttribute("id");
//     angry.setAttribute("id", "angry-face");
//     smile.removeAttribute("id");
//     smile.setAttribute("id", "smiling-face");
//     happy.removeAttribute("id");
//     happy.setAttribute("id", "happy-face");
// }
// smile.onclick = function() {
//     angry.setAttribute("id", "wiggle");

//     // Remove "wiggle" id from all other Moods if there was a previous selection.
//     sad.removeAttribute("id");
//     sad.setAttribute("id", "crying-face");
//     worried.removeAttribute("id");
//     worried.setAttribute("id", "worried-face");
//     neutral.removeAttribute("id");
//     neutral.setAttribute("id", "neutral-face");
//     angry.removeAttribute("id");
//     angry.setAttribute("id", "angry-face");
//     happy.removeAttribute("id");
//     happy.setAttribute("id", "happy-face");
// }
// happy.onclick = function() {
//     happy.setAttribute("id", "wiggle");

//     // Remove "wiggle" id from all other Moods if there was a previous selection.
//     sad.removeAttribute("id");
//     sad.setAttribute("id", "crying-face");
//     worried.removeAttribute("id");
//     worried.setAttribute("id", "worried-face");
//     neutral.removeAttribute("id");
//     neutral.setAttribute("id", "neutral-face");
//     smile.removeAttribute("id");
//     smile.setAttribute("id", "smiling-face");
//     angry.removeAttribute("id");
//     angry.setAttribute("id", "angry-face");
// }


// After clicking the Confirm button, close the modal box
confirm_btn.onclick = function() {
    modal.style.display = "none";
}


/* */

var Cal = function(divId) {
    //Store div id
    this.divId = divId;
    // Days of week, starting on Sunday
    this.DaysOfWeek = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
    // Months, stating on January
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    // Set the current month, year
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
   
  };
  // Goes to next month
  Cal.prototype.nextMonth = function() {
    if ( this.currMonth == 11 ) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    }
    else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
  };
  // Goes to previous month
  Cal.prototype.previousMonth = function() {
    if ( this.currMonth == 0 ) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    }
    else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
  };
  // Show current month
  Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
  };
  // Show month (year, month)
  Cal.prototype.showMonth = function(y, m) {
    var d = new Date()
    // First day of the week in the selected month
    , firstDayOfMonth = new Date(y, m, 1).getDay()
    // Last day of the selected month
    , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
    // Last day of the previous month
    , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table>';
    // Write selected month and year
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
    // Write the header of the days of the week
    html += '<tr class="days">';
    for(var i=0; i < this.DaysOfWeek.length;i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
   
    // Write the days
    var i=1;
    do {
      var dow = new Date(y, m, i).getDay();
      // If Sunday, start new row
      if ( dow == 0 ) {
        html += '<tr>';
      }
      // If not Sunday but first day of the month
      // it will write the last days from the previous month
      else if ( i == 1 ) {
        html += '<tr>';
        var k = lastDayOfLastMonth - firstDayOfMonth+1;
        for(var j=0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
      // Write the current day in the loop
      var chk = new Date();
      var chkY = chk.getFullYear();
      var chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        html += '<td class="today">' + i + '</td>';
      } else {
        html += '<td class="normal">' + i + '</td>';
      }
      // If Saturday, closes the row
      if ( dow == 6 ) {
        html += '</tr>';
      }
      // If not Saturday, but last day of the selected month
      // it will write the next few days from the next month
      else if ( i == lastDateOfMonth ) {
        var k=1;
        for(dow; dow < 6; dow++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
      i++;
    }while(i <= lastDateOfMonth);
    // Closes table
    html += '</table>';
    // Write HTML to the div
    document.getElementById(this.divId).innerHTML = html;
  };
  // On Load of the window
  window.onload = function() {
    // Start calendar
    var c = new Cal("divCal");			
    c.showcurr();
    // Bind next and previous button clicks
    getId('btnNext').onclick = function() {
      c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
      c.previousMonth();
    };
  }
  // Get element by id
  function getId(id) {
    return document.getElementById(id);
  }


/* */
$(document).ready(function(){
  const calender = document.querySelector(".calender");
  date = document.querySelector(".date");
  daysCont = document.querySelector(".days");
  prev = document.querySelector(".prev");
  next = document.querySelector(".next");
  displayDate = document.querySelector(".today-date");

  let todayDate = new Date();
  let month = todayDate.getMonth();
  let year = todayDate.getFullYear();
  let day = todayDate.getDate();

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // date = month + year;
  // console.log(date);

 
  
  initCal(month, year, daysCont);

  $(".prev").click(function(){
      // console.log("prev");
      month--;
      if(month < 0 || month > 11){
          todayDate = new Date(year, month, new Date().getDate());
          year = date.getFullYear();
          month = date.getMonth();
      }
      else{
          todayDate = new Date();
      }
      initCal(month, year, daysCont);

  });
  $(".next").click(function(){
      //        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
      month++;
      if(month < 0 || month > 11){
          todayDate = new Date(year, month, new Date().getDate());
          year = todayDate.getFullYear();
          month = todayDate.getMonth();
      }
      else{
          todayDate = new Date();
          console.log(todayDate);
      }
      initCal(month, year, daysCont);

  });
});

// function newPage(){

// }
function initCal(month, year, daysCont){
  // const firstDay = new Date(year, month, 1);
  // const lastDay = new Date(year, month + 1, 0);
  // const prevLastDay = new Date (year, month, 0);
  // const prevDays = prevLastDay.getDate();
  // const lastDayDate= lastDay.getDate();
  // const day = firstDay.getDate();
  // const nextDays = 7 - lastDay.getDay() - 1; 
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  date.innerHTML = months[month] + " " + year; 
  // // console.log(prevDays);
  // let days = "";
  
  // for(let i = day; i > 0; i--){
  //     days += '<div class="day prev-date">' + (prevDays - i + 1) + '</div>';
  //     // console.log(days);

  // }
  // for(let i = 1; i <lastDayDate; i++){
  //     if(i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
  //         days += '<div class ="day today">' + i  + '</div>';
  //     }
  //     else{
  //         days += '<div class ="day">' + i  + '</div>';
  //     }
  // }
  // daysCont.innerHTML = days;
  let firstDay = new Date(year, month, 1).getDay();
  let lastDate= new Date(year, month + 1, 0).getDate();
  let lastDay = new Date(year, month, lastDate).getDay();
  let lastDatePrev = new Date(year, month, 0).getDate();

  let days = "";

  for (let i = firstDay; i > 0; i--) {
      days += '<div class="day inactive">' + (lastDatePrev - i + 1) + '</div>';
      // console.log(days);

  }
  for (let i = 1; i <= lastDate; i++) {
      if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
          days += '<div class ="day today">' + i + '</div>';
      }
      else {
          days += '<div class ="day">' + i + '</div>';
      }
  }
  for(let i = lastDay; i < 6; i++){
      days += '<div class ="day inactive">' + (i - lastDay + 1) + '</div>';

  }
  daysCont.innerHTML = days;
}

  
