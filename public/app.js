// Firebase SDK imports
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
const db  = getDatabase(app);

const statusDisplay = document.getElementById("status");
const btnOpen  = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");

// Live update the status from Firebase
const statusRef = ref(db, "status");
onValue(statusRef, (snapshot) => {
  const status = snapshot.val();
  if (status) {
    statusDisplay.textContent = Door is: ${String(status).toUpperCase()};
  } else {
    statusDisplay.textContent = "Status: Unknown";
  }
});

// Send command to open or close
async function sendCommand(command, button) {
  try {
    button.disabled = true;
    button.classList.add("pulsing");
    await set(ref(db, "command"), command);
    console.log(`Command '${command}' sent.`);
  } catch (err) {
    console.error("Failed to send command:", err);
    statusDisplay.textContent = "COMMAND ERROR";
  } finally {
    setTimeout(() => {
      button.disabled = false;
      button.classList.remove("pulsing");
    }, 2000); // give ESP32 time to act/clear
  }
}

// Button event bindings
btnOpen.addEventListener("click", () => sendCommand("open", btnOpen));
btnClose.addEventListener("click", () => sendCommand("close", btnClose));





