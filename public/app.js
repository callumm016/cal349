const statusDisplay = document.getElementById("status");
const openBtn = document.getElementById("btn-open");
const closeBtn = document.getElementById("btn-close");
const loader = document.createElement("span");
loader.className = "loader";
loader.style.marginLeft = "10px";

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

async function waitForStatus(targetState) {
  let retries = 30; // 30 x 500ms = 15s
  while (retries-- > 0) {
    const state = await getStatus();
    if (state === targetState) return true;
    await new Promise(res => setTimeout(res, 500));
  }
  return false;
}

async function triggerDoor(expectedState, button) {
  try {
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = ${expectedState === "OPEN" ? "Opening" : "Closing"}...;
    button.appendChild(loader);

    await fetch(`${ESP32_IP}/trigger`);
    const success = await waitForStatus(expectedState);

    if (!success) {
      button.textContent = "Timeout";
    } else {
      button.textContent = ${expectedState}ED;
    }

    await new Promise(res => setTimeout(res, 1500));
    button.textContent = originalText;
    button.disabled = false;
    loader.remove();
  } catch (err) {
    button.textContent = "Error";
    loader.remove();
  }
}

openBtn.addEventListener("click", () => triggerDoor("OPEN", openBtn));
closeBtn.addEventListener("click", () => triggerDoor("CLOSED", closeBtn));

// Run every 5 seconds
getStatus();
setInterval(getStatus, 5000);



