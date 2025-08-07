const statusDisplay = document.getElementById("status");
const triggerBtn = document.getElementById("trigger");

const ESP32_IP = "http://192.168.1.137"; // 🔁 Replace with public IP when ready

async function getStatus() {
  try {
    const res = await fetch(`${ESP32_IP}/status`);
    const txt = await res.text();
    statusDisplay.textContent = txt;
  } catch (err) {
    statusDisplay.textContent = "ERROR";
  }
}

async function triggerDoor() {
  try {
    triggerBtn.disabled = true;
    triggerBtn.textContent = "Triggering...";
    await fetch(`${ESP32_IP}/trigger`);
    await getStatus(); // Refresh after trigger
    triggerBtn.textContent = "Trigger Door";
    triggerBtn.disabled = false;
  } catch (err) {
    triggerBtn.textContent = "Failed!";
  }
}

triggerBtn.addEventListener("click", triggerDoor);

// Run every 5 seconds
getStatus();
setInterval(getStatus, 5000);


