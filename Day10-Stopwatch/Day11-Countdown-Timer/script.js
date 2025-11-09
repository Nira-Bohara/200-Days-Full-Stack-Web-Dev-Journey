let countdown;
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const message = document.getElementById("message");

startBtn.addEventListener("click", startCountdown);
resetBtn.addEventListener("click", resetCountdown);

function startCountdown() {
  let dateInput = document.getElementById("date").value;
  const timeInput = document.getElementById("time").value;

  // ✅ If no date selected, use today
  if (!dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    dateInput = `${year}-${month}-${day}`;
  }

  // ✅ Default time = current time + 1 minute (so it’s always in the future)
  let finalTime;
  if (!timeInput) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1); // +1 minute
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    finalTime = `${h}:${m}`;
  } else {
    finalTime = timeInput;
  }

  const targetDate = new Date(`${dateInput}T${finalTime}:00`);
  const nowTime = new Date();

  // ✅ If selected date/time is in the past, add 1 day automatically
  if (targetDate.getTime() <= nowTime.getTime()) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  message.textContent = "";
  clearInterval(countdown);

  countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(countdown);
      message.textContent = "⏰ Time's up!";
      updateDisplay(0, 0, 0, 0);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function updateDisplay(d, h, m, s) {
  daysEl.textContent = d.toString().padStart(2, "0");
  hoursEl.textContent = h.toString().padStart(2, "0");
  minutesEl.textContent = m.toString().padStart(2, "0");
  secondsEl.textContent = s.toString().padStart(2, "0");
}

function resetCountdown() {
  clearInterval(countdown);
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  updateDisplay(0, 0, 0, 0);
  message.textContent = "";
}
