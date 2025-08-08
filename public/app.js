// ===== Firebase SDK imports =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyDqssj5Comk-OkqWSGb7uc83jFtd9FNAMU",
  authDomain: "garage-door-project-7c1b1.firebaseapp.com",
  databaseURL: "https://garage-door-project-7c1b1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "garage-door-project-7c1b1",
  storageBucket: "garage-door-project-7c1b1.appspot.com",
  messagingSenderId: "231163361892",
  appId: "1:231163361892:web:2b17f3b0cb48fdb5fcfd71"
};

// ===== Init Firebase =====
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===== Get HTML elements =====
const statusDisplay = document.getElementById("status");
const btnOpen = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");

// ===== Guard: ensure HTML matches IDs =====
if (!statusDisplay || !btnOpen || !btnClose) {
  console.error("❌ Missing #status, #btn-open, or #btn-close in HTML");
}

// ===== Live update door status =====
onValue(ref(db, "status"), (snapshot) => {
  const val = snapshot.val();
  if (val) {
    statusDisplay.textContent = `Door: ${String(val).toUpperCase()}`;
  } else {
    statusDisplay.textContent = "Status: Unknown";
  }
});

// ===== Send command to Firebase =====
async function sendCommand(cmd) {
  try {
    await set(ref(db, "command"), cmd);
    console.log(`✅ Command '${cmd}' sent to Firebase`);
  } catch (err) {
    console.error("❌ Error sending command:", err);
    statusDisplay.textContent = "COMMAND ERROR";
  }
}

// ===== Button bindings =====
btnOpen.addEventListener("click", () => sendCommand("open"));
btnClose.addEventListener("click", () => sendCommand("close"));





