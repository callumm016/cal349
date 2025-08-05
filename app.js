const statusText = document.getElementById('status');
const openBtn = document.getElementById('btn-open');
const closeBtn = document.getElementById('btn-close');

// Replace with your real values:
const botToken = "8477643453:AAH8B5bNChTMIwar7FBndzA8Iw_vDm5MbsM";
const chatId = "6370665213";

function sendTelegramCommand(command) {
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: command
    })
  })
  .then(response => response.json())
  .then(data => console.log("Telegram response:", data))
  .catch(error => console.error("Telegram error:", error));
}

function stopPulsing() {
  openBtn.classList.remove('pulsing');
  closeBtn.classList.remove('pulsing');
}

openBtn.addEventListener('click', () => {
  stopPulsing();
  openBtn.classList.add('pulsing');
  statusText.textContent = 'Door is Opening...';
  statusText.style.color = 'red';
  sendTelegramCommand("open");
});

closeBtn.addEventListener('click', () => {
  stopPulsing();
  closeBtn.classList.add('pulsing');
  statusText.textContent = 'Door is Closing...';
  statusText.style.color = 'orange';
  sendTelegramCommand("close");

  setTimeout(() => {
    stopPulsing();
    statusText.textContent = 'Door is Closed';
    statusText.style.color = 'green';
  }, 3000);
});


