const qrText = document.getElementById("qrText");
const qrBox = document.getElementById("qrBox");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", () => {
  const text = qrText.value.trim();

  if (text === "") {
    alert("Please enter text or URL!");
    return;
  }

  qrBox.innerHTML = "";

  QRCode.toDataURL(text, { width: 200, margin: 2 }, (err, url) => {
    if (err) return console.error(err);

    const img = document.createElement("img");
    img.src = url;
    qrBox.appendChild(img);

    downloadBtn.href = url;
    downloadBtn.style.display = "block";
  });
});
