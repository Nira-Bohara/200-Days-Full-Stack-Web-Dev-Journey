let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = "00:00:00.00";
});
