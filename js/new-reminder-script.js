$.validator.addMethod("compareTimes", function(value, element){
   let start = new Date("2001-01-01" + "T" +  $("#start-time").val());
   console.log(start);
    let end = new Date("2001-01-01"+ "T" + $("#end-time").val());
   console.log(end);
   if(start && end){
    return  start < end;
   }
   return true;
}, "The start time must occur before the end time.");
$.validator.addMethod("compareTitles", function(value, element){
    if(localStorage.getItem("eventObj") != null){
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        for(let i = 0; i < obj.length; i++){
            if(obj[i].title === value){
                return false;
            }
        }
    } 
    return true;
}, "Event names must be unique.");
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
    // displayDate.innerHTML =  months[month] + " " + day + "th " + year;

    const form = document.getElementById("form");
    const title = document.getElementById("input-title");
    const inputDate = document.getElementById("input-date");
    const startTime = document.getElementById("start-time");
    const endTime = document.getElementById("end-time");
    const note = document.getElementById("input-note");

    // let editBool = JSON.parse(localStorage.getItem("editBool"));
    // if(editBool != null){
    //     if(editBool == "true"){
    //         console.log("true");
    //     }
    // }
    editEvents(title, inputDate, startTime, endTime, note);
    $("#form").validate({
        rules: {
            "input-title":{
                required: true,
                compareTitles:true
            },
            "input-date":{
                required: true
            },
            "start-time":{
                required:true,
                // compareTimes:true
            },
            "end-time":{
                required:true,
                compareTimes:true
            }
        },
        messages: {
            "input-title":{
                required: "Please enter a title."
            },
            "input-date":{
                required: "Please enter a date."
            },
            "start-time":{
                required:"Please enter a start time."
            },
            "end-time":{
                required:"Please enter an end time."
            }
        }
    });

    form.addEventListener("submit", function(e){
        e.preventDefault();
        if($("#form").valid()){
            // getting all form vals
            const titleVal = title.value;
            const inputDateVal = inputDate.value;
            const startTimeVal = startTime.value;
            const endTimeVal = endTime.value;
            const noteVal = note.value;

            // checking for ant pre-existing event entries w/ get() & transforming it into an array
            let eventHistory = JSON.parse(localStorage.getItem("eventObj")) || [];
            if(!(eventHistory instanceof Array)){
                eventHistory = [eventHistory];
            }
            //pushing current form vals into array
            eventHistory.push({
                        title: titleVal,
                        date: inputDateVal,
                        start: startTimeVal,
                        end: endTimeVal,
                        edit: "false",
                        note: noteVal
            });
           //saving the array with the new event entry to the eventObj w/ set()
            localStorage.setItem("eventObj", JSON.stringify(eventHistory));
            window.location.href = "../pages/reminders.html";
        }   
    });
    
    initCal(month, year, daysCont);
    clickDays(month, year);
    markEvents(month, year);

    $(".prev").click(function(){
        // console.log("prev");
        month--;
        if(month < 0 || month > 11){
            todayDate = new Date(year, month, new Date().getDate());
            year = todayDate.getFullYear();
            month = todayDate.getMonth();
        }
        else{
            todayDate = new Date();
        }
        initCal(month, year, daysCont);
        clickDays(month, year);
        markEvents(month, year);

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
        }
        initCal(month, year, daysCont);
        clickDays(month, year);
        markEvents(month, year);

    });
    const closePopUpBtn = document.getElementsByClassName("close-button")[0];
    closePopUpBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("popup")[0];
        closePopUp(popup);
    });
});

 function initCal(month, year, daysCont){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    date.innerHTML = months[month] + " " + year; 
    let firstDay = new Date(year, month, 1).getDay();
    let lastDate= new Date(year, month + 1, 0).getDate();
    let lastDay = new Date(year, month, lastDate).getDay();
    let lastDatePrev = new Date(year, month, 0).getDate();

    let days = "";

    for (let i = firstDay; i > 0; i--) {
        days += '<div class="day inactive">' + (lastDatePrev - i + 1) + '</div>';
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
 function editEvents(title, inputDate, startTime, endTime, note){
    if(localStorage.getItem("eventObj") != null){
        //retrieving eventObj and iterating through it
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        for(let i = 0; i < obj.length; i++){
            if(obj[i].edit === "true"){
                console.log("edit");
                //have form prefilled for editting
                title.value = obj[i].title;
                inputDate.value = obj[i].date;
                startTime.value = obj[i].start;
                endTime.value = obj[i].end;
                note.value = obj[i].note;
                obj[i].edit = "false";
                //delete old entry to replace with new changes
                obj.splice(i,1);
            } 
        }
        obj = JSON.stringify(obj);
        localStorage.setItem("eventObj", obj);
    }
}

function markEvents(month, year){
    const days = document.getElementsByClassName("day");
    if(localStorage.getItem("eventObj") != null){
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        for(let i = 0; i < obj.length; i++){
            const event = obj[i];
            for(let i = 0; i < days.length; i++){
                let objDate = new Date(event.date + "T" + event.start);
                if((objDate.getDate() == days[i].textContent) && (objDate.getFullYear() == year) && (objDate.getMonth() == month)){
                    // console.log("has event logged");
                    // alert("Title: " + event.title + " Time: " + event.start + " - " + event.end);
                    if(!days[i].classList.contains("hasEvent") && !days[i].classList.contains("inactive")){
                        days[i].className += " hasEvent";
                    }
                }
            }
        }
    }
}

function clickDays(month, year){
    const days = document.getElementsByClassName("day");;
    if(localStorage.getItem("eventObj") != null){
        const obj = JSON.parse(localStorage.getItem("eventObj"))
        for(let i = 0; i < days.length; i++){
            days[i].addEventListener("click", function(){
                // console.log("clicked day");
                for(let j = 0; j < obj.length; j++){
                    let event = obj[j];
                    let objDate = new Date(event.date + "T" + event.start);
                    if((objDate.getDate() == days[i].textContent) && (objDate.getFullYear() == year) && (objDate.getMonth() == month)){
                        // console.log("has event logged");
                        // alert("Title: " + event.title + " Time: " + event.start + " - " + event.end);
                        const popup = document.getElementsByClassName("popup")[0];
                        displayPopUp(popup, event.title, event.start, event.end, objDate, event.note);
                    }
                }
            });
        }
    }
 }

 function displayPopUp(popup, title, start, end, date, note){
    const overlay = document.getElementById("overlay");
    const body = document.getElementsByClassName("popup-body")[0];
    const popupTitle = document.getElementsByClassName("popup-title")[0];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(popup == null) return;

    const startDate = new Date("2023-07-26" + "T" + start);
    const endDate = new Date("2023-07-26" + "T" + end);

    const startTimeStr = startDate.toLocaleTimeString('en-US',
        { hour12: true, hour: 'numeric', minute: 'numeric' });
    const endTimeStr = endDate.toLocaleTimeString('en-US',
        { hour12: true, hour: 'numeric', minute: 'numeric' });

    popupTitle.textContent = months[date.getMonth()] + " " + date.getDate() + "th, " + date.getFullYear();
    body.innerHTML += "<br>Title: " + title + "<br>Time: " + startTimeStr + " - " + endTimeStr + "<br>Note: " + note;
    popup.classList.add("active");
    overlay.classList.add("active");
 }

 function closePopUp(popup){
    const overlay = document.getElementById("overlay");
    const body = document.getElementsByClassName("popup-body")[0];
    if(popup == null) return;
    popup.classList.remove("active");
    overlay.classList.remove("active");
    body.innerHTML="";
 }
