
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
    displayDate.innerHTML =  months[month] + " " + day + "th " + year;


    initCal(month, year, daysCont);
    clickDays(month, year);
    markEvents(month, year);

    // const inputTitle = localStorage.getItem("input-title");
    // const inputDate = localStorage.getItem("input-date");
    // const inputStartTime = localStorage.getItem("input-starttime");
    // const inputEndTime = localStorage.getItem("input-endtime");

    // const startDate =  new Date(inputDate + "T" + inputStartTime + "Z");
    // const endDate =  new Date(inputDate + "T" + inputEndTime + "Z");

    // const startTimeStr = startDate.toLocaleTimeString('en-US',
    // {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});
    // const endTimeStr = endDate.toLocaleTimeString('en-US',
    // {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});

    // //check if the input date is the same as current (today)
    // if(startDate.getDate() == todayDate.getDate()){
    //     const todayTask = document.getElementsByClassName("today-task");
    //     todayTask[0].innerHTML += '<div class ="task"><div id="eventTitle">' + inputTitle + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>"

    //     // document.getElementById("eventTitle").textContent = inputTitle;
    //     // document.getElementById("eventTime").textContent = startTimeStr + " - " + endTimeStr;
    // }
    // else{
    //     const upcomingTask = document.getElementsByClassName("upcoming-task");
    //     upcomingTask[0].innerHTML += '<div class ="task"><div id="eventTitle">' + inputTitle + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>"
    // }
    // console.log(JSON.parse(localStorage.getItem("eventObj")));
    // const eventObj = JSON.parse(localStorage.getItem("eventObj"));
    // if(JSON.stringify(eventObj) !== "{}"){

    // }

    
    
    getEvents(todayDate, month, year);


    $(".btn").click(function(){
        // console.log("hello");
        window.location.href = "../pages/new-reminder.html";
    });
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
        clickDays(month, year);
        markEvents(month, year);
        // getEvents(todayDate, month, year);

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
        clickDays(month, year);
        markEvents(month, year);
        // getEvents(todayDate, month, year);

    });
});

// function newPage(){

// }
function markEvents(month, year){

    let obj = JSON.parse(localStorage.getItem("eventObj"));
    const days = document.getElementsByClassName("day");
    for(let i = 0; i < obj.length; i++){
        const event = obj[i];
        for(let i = 0; i < days.length; i++){
            let objDate = new Date(event.date + "T" + event.start);
            if((objDate.getDate() == days[i].textContent) && (objDate.getFullYear() == year) && (objDate.getMonth() == month)){
                // console.log("has event logged");
                // alert("Title: " + event.title + " Time: " + event.start + " - " + event.end);
                if(!days[i].classList.contains("hasEvent")){
                    days[i].className += " hasEvent";
                }
            }
        }
    }

}
function getEvents(todayDate, month, year){

    let obj = JSON.parse(localStorage.getItem("eventObj"));
    for(let i = 0; i < obj.length; i++){
        const event = obj[i];
        // console.log(obj[i]);
        const inputTitle = event.title;
        const inputDate = event.date;
        console.log("input" + inputDate);
        const inputStartTime = event.start;
        const inputEndTime = event.end;

        const startDate = new Date(inputDate + "T" + inputStartTime);
        console.log("start" + startDate);
        console.log("starttime" + inputStartTime);

        const endDate = new Date(inputDate + "T" + inputEndTime);

        const startTimeStr = startDate.toLocaleTimeString('en-US',
            { hour12: true, hour: 'numeric', minute: 'numeric' });
        const endTimeStr = endDate.toLocaleTimeString('en-US',
            { hour12: true, hour: 'numeric', minute: 'numeric' });

        //check if the input date is the same as current (today)

        if ((startDate.getDate() == todayDate.getDate()) && (startDate.getMonth() == todayDate.getMonth()) && (startDate.getFullYear() == todayDate.getFullYear())) {
            const todayTask = document.getElementsByClassName("today-task");
            todayTask[0].innerHTML += '<div class ="task"><div id="eventTitle">' + inputTitle + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>";
        }
        // else {
        //     const upcomingTask = document.getElementsByClassName("upcoming-task");
        //     upcomingTask[0].innerHTML += '<div class ="task"><div id="eventTitle">' + inputTitle + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>"
        // }
        else if ((startDate.getMonth() == todayDate.getMonth()) && (startDate.getFullYear() == todayDate.getFullYear()) && (startDate.getDate() > todayDate.getDate())){
            const upcomingTask = document.getElementsByClassName("upcoming-task");
            upcomingTask[0].innerHTML += '<div class ="task"><div id="eventTitle">' + inputTitle + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>";
        }
        else{
            continue;
        }

        // const days = document.getElementsByClassName("day");
        // for(let i = 0; i < days.length; i++){
        //     let objDate = new Date(event.date + "T" + event.start);
        //     if((objDate.getDate() == days[i].textContent) && (objDate.getFullYear() == year) && (objDate.getMonth() == month)){
        //         // console.log("has event logged");
        //         // alert("Title: " + event.title + " Time: " + event.start + " - " + event.end);
        //         if(!days[i].classList.contains("hasEvent")){
        //             days[i].className += " hasEvent";
        //         }
        //     }
        // }

    }
    // const event = JSON.parse(localStorage.getItem("eventObj"));

    // const inputTitle = event.title;
    // const inputDate = event.date;
    // console.log("input" + inputDate);
    // const inputStartTime = event.start;
    // const inputEndTime = event.end;

    // const startDate =  new Date(inputDate + "T" + inputStartTime);
    // console.log("start" + startDate);
    // console.log("starttime" + inputStartTime);

    // const endDate =  new Date(inputDate + "T" + inputEndTime);

    // const startTimeStr = startDate.toLocaleTimeString('en-US',
    // {hour12:true,hour:'numeric',minute:'numeric'});
    // const endTimeStr = endDate.toLocaleTimeString('en-US',
    // {hour12:true,hour:'numeric',minute:'numeric'});

    // //check if the input date is the same as current (today)

    // if(startDate.getDate() == todayDate.getDate()){
    //     const todayTask = document.getElementsByClassName("today-task");
    //     todayTask[0].innerHTML += '<div class ="task"><div id="eventTitle">' + inputTitle + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>"
    // }
    // else{
    //     const upcomingTask = document.getElementsByClassName("upcoming-task");
    //     upcomingTask[0].innerHTML += '<div class ="task"><div id="eventTitle">' + inputTitle + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>"
    // }
}

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

 function clickDays(month, year){
    const days = document.getElementsByClassName("day");
    const obj = JSON.parse(localStorage.getItem("eventObj"));
   
    for(let i = 0; i < days.length; i++){
        days[i].addEventListener("click", function(){
            // console.log("clicked day");
            for(let j = 0; j < obj.length; j++){
                let event = obj[j];
                let objDate = new Date(event.date + "T" + event.start);
                if((objDate.getDate() == days[i].textContent) && (objDate.getFullYear() == year) && (objDate.getMonth() == month)){
                    console.log("has event logged");
                    alert("Title: " + event.title + " Time: " + event.start + " - " + event.end);
                    // if(!days[i].classList.contains("hasEvent")){
                    //     days[i].className += " hasEvent";
                    // }
                }
            }
        });
    }

 }