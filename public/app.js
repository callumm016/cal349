// ✅ JavaScript: app.js
const statusDisplay = document.getElementById("status");
const openBtn = document.getElementById("btn-open");
const closeBtn = document.getElementById("btn-close");

const ESP32_IP = "http://192.168.1.137"; // Replace with public IP when ready

async function getStatus() {
  try {
    const res = await fetch(`${ESP32_IP}/status`);
    const txt = await res.text();
    statusDisplay.textContent = txt;
    return txt;
  } catch (err) {
    statusDisplay.textContent = "ERROR";
    return "ERROR";
  }
}

async function triggerDoor(targetState) {
  const btn = targetState === "OPEN" ? openBtn : closeBtn;
  btn.disabled = true;
  btn.textContent = targetState === "OPEN" ? "Opening..." : "Closing...";
  btn.classList.add("loading");

  try {
    await fetch(`${ESP32_IP}/trigger`);

    // Wait until the reed reports the desired state or timeout after 15s
    const timeout = Date.now() + 15000;
    let state;
    do {
      await new Promise(r => setTimeout(r, 1000));
      state = await getStatus();
    } while (state !== targetState && Date.now() < timeout);

  } catch (err) {
    console.error("Trigger failed:", err);
  }

  btn.textContent = targetState === "OPEN" ? "Open" : "Close";
  btn.disabled = false;
  btn.classList.remove("loading");
}

openBtn.addEventListener("click", () => triggerDoor("OPEN"));
closeBtn.addEventListener("click", () => triggerDoor("CLOSED"));

getStatus();
setInterval(getStatus, 5000);


