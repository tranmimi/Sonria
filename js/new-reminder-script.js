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
    form.addEventListener("submit", function(e){
        e.preventDefault();
        const titleVal = title.value;
        const inputDateVal = inputDate.value;
        const startTimeVal = startTime.value;
        const endTimeVal = endTime.value;

        // localStorage.setItem("input-title", titleVal);
        // localStorage.setItem("input-date", inputDateVal);
        // localStorage.setItem("input-starttime", startTimeVal);
        // localStorage.setItem("input-endtime", endTimeVal);
        //change to json
        //yt vid 45:21
        // let eventArr = [];
        // var eventArr = [
        //     {
        //         title: titleVal,
        //         date: inputDateVal,
        //         start: startTimeVal,
        //         end: endTimeVal
        //     }
        // ];
    
        let eventHistory = JSON.parse(localStorage.getItem("eventObj")) || [];
        // eventHistory = JSON.parse(eventHistory);
        if(!(eventHistory instanceof Array)){
            eventHistory = [eventHistory];
        }
        eventHistory.push({
                    title: titleVal,
                    date: inputDateVal,
                    start: startTimeVal,
                    end: endTimeVal
                });
        // getEvents();
        // console.log(eventArr);
        // saveEvents();

        // localStorage.setItem("eventObj", JSON.stringify({title: titleVal, date: inputDateVal, start: startTimeVal, end:endTimeVal}));

        localStorage.setItem("eventObj", JSON.stringify(eventHistory));
        window.location.href = "../pages/reminders.html";
        
    });
    
    initCal(month, year, daysCont);

    // $(".submit-btn").click(function(){
    //     // console.log("hello");
    //     window.location.href = "../pages/reminders.html";
    // });
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

    });
});
// function getEvents(){
//     if(localStorage.getItem("eventObj") === null){
//         return;
//     }   
//     eventArr.push(...JSON.parse(localStorage.getItem("eventObj")));
// }
// function saveEvents(){
//     localStorage.setItem("eventObj", JSON.stringify(eventArr));
// }

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