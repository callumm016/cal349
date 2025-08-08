import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDqssj5Comk-OkqWSGb7uc83jFtd9FNAMU",
  authDomain: "garage-door-project-7c1b1.firebaseapp.com",
  databaseURL: "https://garage-door-project-7c1b1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "garage-door-project-7c1b1",
  storageBucket: "garage-door-project-7c1b1.appspot.com",
  messagingSenderId: "231163361892",
  appId: "1:231163361892:web:2b17f3b0cb48fdb5fcfd71"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get HTML elements
const statusDisplay = document.getElementById("status");
const btnOpen = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");

// Check if elements exist
if (!statusDisplaybtnClose!) {
  console.error("Missing required HTML elements");
}

// Listen for door status changes
onValue(ref(db, "status"), function(snapshot) {
  const val = snapshot.val();
  if (val !== null && val !== undefined) {
    statusDisplay.textContent = "Door is: " + String(val).toUpperCase();
  } else {
    statusDisplay.textContent = "Status: Unknown";
  }
});

// Send open/close command
function sendCommand(cmd) {
  set(ref(db, "command"), cmd)
    .then(function() {
      console.log("Command '" + cmd + "' sent.");
    })
    .catch(function(error) {
      console.error("Error sending command:", error);
    });
}

// Button click events
btnOpen.addEventListener("click", function() { sendCommand("open"); });
btnClose.addEventListener("click", function() { sendCommand("close"); });




