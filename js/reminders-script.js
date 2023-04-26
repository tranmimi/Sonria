import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getDatabase, set, ref, get, onValue} from  "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
$(document).ready(function(){

    const firebaseConfig = {
    apiKey: "AIzaSyBFeeclMvlSO3wSWm7UoGcanmgjQGrj9gg",
    authDomain: "sonria-e68e7.firebaseapp.com",
    projectId: "sonria-e68e7",
    storageBucket: "sonria-e68e7.appspot.com",
    messagingSenderId: "770936446305",
    appId: "1:770936446305:web:8142c0a0996628d1c63920",
    measurementId: "G-GJJBX8J37X"
  };

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const database = getDatabase(app);
    // localStorage.clear();

    const calender = document.querySelector(".calender");
    const date = document.getElementById("date");
    const daysCont = document.querySelector(".days");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const displayDate = document.querySelector(".today-date");

    let todayDate = new Date();
    let month = todayDate.getMonth();
    let year = todayDate.getFullYear();
    let day = todayDate.getDate();

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // date = month + year;
    // console.log(date);
    displayDate.innerHTML =  months[month] + " " + day + "th " + year;

    // getUserData(database);
    initCal(month, year, daysCont);
    getEvents(todayDate);
    clickDays(month, year);
    markEvents(month, year);

    //getting user info from login 
    // let userObj = JSON.parse(localStorage.getItem("user")) || [];

    // let eventsRef = ref(database, "users/" + userObj.uid + "/events");
    // onValue(eventsRef, function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       const eventId = childSnapshot.key;
    //       const event = childSnapshot.val();
    //       console.log(eventId, event);
    //     //   if (event.hasOwnProperty('event')) {
    //     //     const nestedEvent = event.event;
    //     //     console.log(nestedEvent);
    //     //   }
    //     });
    //   });



    //DATABASE
    //Saving to database the eventObj entries by iterating through each
    // let eventObj = JSON.parse(localStorage.getItem("eventObj"));
    // let userRef = ref(database, "users/" + userObj.uid);
    // console.log(eventObj);
    // if(eventObj != null){
    //     for(let i = 0; i < eventObj.length; i++){
    //         let eventStr = "/event" + i;
    //         //creating new subfolder called "events" that contain "event+index" entries
    //         set(ref(database, 'users/' + userObj.uid + "/events" + eventStr), {
    //             eventTitle: eventObj[i].title,
    //             eventDate: eventObj[i].date,
    //             eventStarttime: eventObj[i].start,
    //             eventEndtime: eventObj[i].end,
    //             eventNote: eventObj[i].note,
    //             eventEdit: eventObj[i].edit,
    //             // profile_picture: imageUrl
    //         }).then(() => {
    //             // Data saved successfully!
    //             // alert("user created successfully");
    //         })
    //         .catch((error) => {
    //             // The write failed...
    //             alert("error in saving event data");
    //         });
    //     }
       
    // }

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
        }
        initCal(month, year, daysCont);
        clickDays(month, year);
        markEvents(month, year);
        // getEvents(todayDate, month, year);

    });

    const closePopUpBtn = document.getElementsByClassName("close-button")[0];
    closePopUpBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("popup")[0];
        closePopUp(popup);
    });
    
    const eventTitles = document.getElementsByClassName("eventTitle");
    var currentTitle = "";

    for(let i = 0; i < eventTitles.length; i++){
        eventTitles[i].addEventListener("click", function(){
            const eventPopUp = document.getElementsByClassName("event-popup")[0];
            currentTitle = eventTitles[i].getAttribute("data-title");
            let obj = JSON.parse(localStorage.getItem("eventObj"));
            let note = "";
            if(obj != null){
                for(let i = 0; i < obj.length; i++){
                    // currentTitle = eventTitles[i].getAttribute("data-title");
                    if(obj[i].title === currentTitle){
                        note = obj[i].note;
                        break;
                    } 
                }
            }
            // console.log(currentTitle);
            displayEventPopUp(eventPopUp, eventTitles[i].textContent, note);
        });
    }

    const closeEventPopUpBtn = document.getElementsByClassName("event-close-button")[0];
    closeEventPopUpBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("event-popup")[0];
        closeEventPopUp(popup);
    });

    const eventEditBtn = document.getElementById("edit-btn");
    eventEditBtn.addEventListener("click", function(){
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        if(obj != null){
            for(let i = 0; i < obj.length; i++){
                // currentTitle = eventTitles[i].getAttribute("data-title");
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

    const eventDeleteBtn = document.getElementById("delete-btn");
    eventDeleteBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("event-popup")[0];
        deleteEvents(currentTitle,todayDate, month, year);
        closeEventPopUp(popup);
    });

    const eventExitBtn = document.getElementById("exit-btn");
    eventExitBtn.addEventListener("click", function(){
        const popup = document.getElementsByClassName("event-popup")[0];
        closeEventPopUp(popup);
    });
});

// function newPage(){

// }
function getUserData(database){
    let userObj = JSON.parse(localStorage.getItem("user")) || [];
    let userRef = ref(database, "users/" + userObj.uid);
    // Get the user's data from the database
    get(userRef)
    .then((snapshot) => {
        // if (snapshot.hasChild("events")) {
        //     snapshot.forEach((entries) => {
        //         let entry = entries.val();
        //         console.log(entry)
        //     }
        //     );}
    const userData = snapshot.val();
    const displayName = userData.displayName;
    // Display the user's name in the UI
    var greeting = document.getElementById("greeting");
    greeting.textContent = "Hi, " + displayName + "!";

    
    })
    .catch((error) => {
    console.error('Error getting user data:', error);
    });
}
function deleteEvents(title, todayDate, month, year){
    if(localStorage.getItem("eventObj") != null){
        let obj = JSON.parse(localStorage.getItem("eventObj"));
        for(let i = 0; i < obj.length; i++){
            var items = obj[i];
            // console.log(obj[i]);
            if(items.title == title){
                obj.splice(i,1);
                obj = JSON.stringify(obj);
                localStorage.setItem("eventObj", obj);
                location.reload();
            } 

        }
    }
}
function markEvents(month, year){

    // let obj = localStorage.getItem("eventObj") || [];
    // obj = JSON.parse(obj);
    // let obj = JSON.parse(localStorage.getItem("eventObj"));
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
function getEvents(todayDate){

    if(localStorage.getItem("eventObj") != null){
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
                todayTask[0].innerHTML += '<div class ="task"><div class="eventTitle" data-title=' + "'" + inputTitle + "'" +  ">" + inputTitle + " " +  "<span>" + (startDate.getMonth() + 1) + 
                "/" + (startDate.getDate()) +  "</span>" + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>";
            }
            else if ((startDate.getMonth() == todayDate.getMonth()) && (startDate.getFullYear() == todayDate.getFullYear()) && (startDate.getDate() > todayDate.getDate())){
                const upcomingTask = document.getElementsByClassName("upcoming-task");
                upcomingTask[0].innerHTML += '<div class ="task"><div class="eventTitle" data-title=' + "'" + inputTitle + "'" + ">" + inputTitle + " " +  "<span>"  + (startDate.getMonth() + 1) + 
                "/" + (startDate.getDate()) + "</span>"  + '</div>' + "<div class='task-time' id='eventTime'>" + startTimeStr + " - " + endTimeStr + "</div>";
            }
            else{
                continue;
            }

        }
        // if(obj.length != null){
            
        // }
    

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

 function displayEventPopUp(popup, text, note){
    const overlay = document.getElementById("overlay");
    const body = document.getElementsByClassName("event-popup-body")[0];
    const popupTitle = document.getElementsByClassName("event-popup-title")[0];
    const p = document.getElementById("event-text");
    // const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(popup == null) return;

    // const startDate = new Date("2023-07-26" + "T" + start);
    // const endDate = new Date("2023-07-26" + "T" + end);

    // const startTimeStr = startDate.toLocaleTimeString('en-US',
    //     { hour12: true, hour: 'numeric', minute: 'numeric' });
    // const endTimeStr = endDate.toLocaleTimeString('en-US',
    //     { hour12: true, hour: 'numeric', minute: 'numeric' });

    popupTitle.textContent = text;
    p.textContent = note;
    // body.textContent += "Would you like to edit this event?"
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

 function closeEventPopUp(popup){
    const overlay = document.getElementById("overlay");
    const body = document.getElementsByClassName("event-popup-body")[0];
    if(popup == null) return;
    popup.classList.remove("active");
    overlay.classList.remove("active");
    // body.textContent="";
 }