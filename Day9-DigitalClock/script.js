// Function to update clock every second
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour format to 12-hour
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Add leading zeros
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Display time
  clock.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Theme Toggle
const toggleTheme = document.getElementById('toggleTheme');
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('light');
});
