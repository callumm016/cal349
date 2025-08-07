const statusDisplay = document.getElementById("status");
const btnOpen = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");

const ESP32_IP = "http://192.168.1.137"; // Replace with public IP later

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

async function waitForStatus(expectedState) {
  let retries = 30;
  while (retries-- > 0) {
    const current = await getStatus();
    if (current === expectedState) return true;
    await new Promise(res => setTimeout(res, 500));
  }
  return false;
}

async function triggerDoor(expectedState, button) {
  try {
    button.disabled = true;
    button.classList.add("pulsing");
    await fetch(`${ESP32_IP}/trigger`);
    await waitForStatus(expectedState);
  } catch (err) {
    statusDisplay.textContent = "ERROR";
  } finally {
    button.disabled = false;
    button.classList.remove("pulsing");
  }
}

btnOpen.addEventListener("click", () => triggerDoor("OPEN", btnOpen));
btnClose.addEventListener("click", () => triggerDoor("CLOSED", btnClose));

getStatus();
setInterval(getStatus, 5000);




