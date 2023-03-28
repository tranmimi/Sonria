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

   
    
    initCal(month, year, daysCont);

    $(".submit-btn").click(function(){
        // console.log("hello");
        window.location.href = "../../Reminders/reminders.html";
    });
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