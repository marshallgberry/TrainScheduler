$( document ).ready(function() {
    
    var config = {
        apiKey: "AIzaSyAu6nOg2pXlYu-t88GBnqbGx2Yb5AjfrPU",
        authDomain: "bye-felicia-project.firebaseapp.com",
        databaseURL: "https://bye-felicia-project.firebaseio.com",
        projectId: "bye-felicia-project",
        storageBucket: "bye-felicia-project.appspot.com",
        messagingSenderId: "899350892197"
      };
      firebase.initializeApp(config)
    
      var database = firebase.database();

      database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        
          //assign firebase variables to snapshots
          var trainName = childSnapshot.val().name;
          var trainDest = childSnapshot.val().dest;
          var trainFirst = childSnapshot.val().first;
          var trainFreq = childSnapshot.val().freq;
      
          //train math (referenced "train predictions" in firebase activities)
              //assumptions
              var tFrequency = trainFreq;
              var firstTime = trainFirst;
              //first Time (pushed back 1 year to make sure it comes before current time)
              var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
              console.log(firstTimeConverted);
              //current Time
              var currentTime = moment();
              console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
              //difference between the times
              var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
              console.log("DIFFERENCE IN TIME: " + diffTime);
              //time apart (remainder)
              var tRemainder = diffTime % tFrequency;
              console.log(tRemainder);
              //minute Until Train
              var minAway = tFrequency - tRemainder;
              console.log("MINUTES TILL TRAIN: " + minAway);
              //next Train
              var trainNext = moment().add(minAway, "minutes").format("h:mm A");
              console.log("ARRIVAL TIME: " + trainNext);
      
        //append train data
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
       "</td><td>" + trainNext + "</td><td>" + minAway + "</td></tr>");
      }, function(errorObject){
        console.log("Error: " + errorObject.code)
      });
      
      //button for adding trains
      $("#add-train-btn").on("click", function(event) {
          event.preventDefault();
        
          
          //grabs user input
          var trainName = $("#train-name-input").val().trim();
          var trainDest = $("#dest-input").val().trim();
          var trainFirst = $("#first-train-input").val().trim();
          var trainFreq = $("#freq-input").val().trim();
          
          //creates local "temporary" object for holding train data
          var newTrain = {
            name: trainName,
            dest: trainDest,
            first: trainFirst,
            freq: trainFreq,
          };
        
          //push train info to firebase
          database.ref().push(newTrain);
      
          
          console.log("Train successfully added");


          //an unnecessary alert box
            var ALERT_TITLE = "Don't Stop Believin'";
            var ALERT_BUTTON_TEXT = "Please Stop";

                if(document.getElementById) {
                window.alert = function(txt) {
                createCustomAlert(txt);
          }
      }

      function createCustomAlert(txt) {
          d = document;

          if(d.getElementById("modalContainer")) return;

          mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
          mObj.id = "modalContainer";
          mObj.style.height = d.documentElement.scrollHeight + "px";

          alertObj = mObj.appendChild(d.createElement("div"));
          alertObj.id = "alertBox";
          if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
          alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
          alertObj.style.visiblity="visible";

          h1 = alertObj.appendChild(d.createElement("h1"));
          h1.appendChild(d.createTextNode(ALERT_TITLE));

          msg = alertObj.appendChild(d.createElement("p"));
          //msg.appendChild(d.createTextNode(txt));
          msg.innerHTML = txt;

          btn = alertObj.appendChild(d.createElement("a"));
          btn.id = "closeBtn";
          btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
          btn.href = "#";
          btn.focus();
          btn.onclick = function() { removeCustomAlert();return false; }

          alertObj.style.display = "block";

      }

      function removeCustomAlert() {
          document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
      }

          alert("");
        
          //clear text-boxes
          $("#train-name-input").val("");
          $("#dest-input").val("");
          $("#first-train-input").val("");
          $("#freq-input").val("");

        });
});