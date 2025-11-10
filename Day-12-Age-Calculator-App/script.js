document.getElementById('calculate').addEventListener('click', () => {
  const dob = document.getElementById('dob').value;
  const result = document.getElementById('result');

  if (!dob) {
    result.innerHTML = "⚠️ Please select your birth date!";
    return;
  }

  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  result.innerHTML = `🎉 You are ${years} years, ${months} months, and ${days} days old!`;
});
