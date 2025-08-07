// app.js v4
console.log("app.js v4 loaded");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

// Guard: make sure elements exist
if (!statusDisplay!btnClose) {
  console.error("Missing #status, #btn-open, or #btn-close in HTML");
}

// Live status listener
onValue(ref(db, "status"), (snap) => {
  const val = snap.val();
  statusDisplay.textContent = val
    ? Door is: ${String(val).toUpperCase()}
    : "Status: Unknown";
});

// Send command helper
async function sendCommand(cmd, buttonEl) {
  try {
    buttonEl?.classList.add("pulsing");
    buttonEl.disabled = true;
    await set(ref(db, "command"), cmd);
    console.log(`Command '${cmd}' sent`);
  } catch (err) {
    console.error("Error sending command:", err);
    statusDisplay.textContent = "COMMAND ERROR";
  } finally {
    setTimeout(() => {
      buttonEl.disabled = false;
      buttonEl.classList.remove("pulsing");
    }, 1200);
  }
}

btnOpen.addEventListener("click", () => sendCommand("open", btnOpen));
btnClose.addEventListener("click", () => sendCommand("close", btnClose));




