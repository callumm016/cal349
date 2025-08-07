// Firebase SDK imports (for Vite/ES6 or use <script> tag if needed)
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const statusDisplay = document.getElementById("status");
const btnOpen = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");

// 🔄 Live update the status from Firebase
const statusRef = ref(db, "status");

onValue(statusRef, (snapshot) => {
  const status = snapshot.val();
  if (status) {
    statusDisplay.textContent = `Door is: ${status.toUpperCase()}`;
  } else {
    statusDisplay.textContent = "Status: Unknown";
  }
});

// 🚪 Send command to open or close
function sendCommand(command, button) {
  const commandRef = ref(db, "command");
  button.disabled = true;
  button.classList.add("pulsing");

  set(commandRef, command)
    .then(() => {
      console.log(`Command '${command}' sent.`);
    })
    .catch((error) => {
      console.error("Failed to send command:", error);
      statusDisplay.textContent = "COMMAND ERROR";
    })
    .finally(() => {
      setTimeout(() => {
        button.disabled = false;
        button.classList.remove("pulsing");
      }, 2000); // give ESP32 time to act
    });
}

// 🔘 Button event bindings
btnOpen.addEventListener("click", () => sendCommand("open", btnOpen));
btnClose.addEventListener("click", () => sendCommand("close", btnClose));





