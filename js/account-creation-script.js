// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFeeclMvlSO3wSWm7UoGcanmgjQGrj9gg",
    authDomain: "sonria-e68e7.firebaseapp.com",
    projectId: "sonria-e68e7",
    storageBucket: "sonria-e68e7.appspot.com",
    messagingSenderId: "770936446305",
    appId: "1:770936446305:web:8142c0a0996628d1c63920",
    measurementId: "G-GJJBX8J37X"
  };    
  


$(document).ready(function(){
  $("#form").validate({
    rules: {
      "input-email":{
        required: true,
        email: true
      },
      "confirm-email":{
        required: true,
        email: true,
        equalTo: "#input-email"
      },
      "input-firstname":{
        required: true,
        minlength: 2
      },
      "input-lastname":{
        required: true,
        minlength: 2
      },
      "input-username":{
        required: true,
        minlength: 6
  
      },
      "input-password":{
        required: true,
        minlength: 7
      },
      "confirm-password":{
        required: true,
        equalTo: "#input-password",
      }
    },
    messages: {
      "confirm-email":{
        equalTo: "Emails do not match."
      },
      "confirm-password":{
        equalTo: "Passwords do not match."
      }
    }
  });
  // const btn = document.getElementById("submit-btn");
  // btn.addEventListener("click", function(e){
  //   e.preventDefault();
  //   if($("#form").valid()){
  //     console.log("valid");
  //   }
  //   else{
  //     console.log("invalid");
  //   }
  // });
});