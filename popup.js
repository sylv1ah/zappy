let toggleButton = document.getElementById("toggle");

// chrome.storage.sync.get("color", data => {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

toggleButton.onmousedown = () => {
  toggleButton.classList.toggle("clicked");
}

toggleButton.onmouseup = () => {
  toggleButton.classList.toggle("clicked");
}

toggleButton.onclick = () => {
  toggleButton.classList.toggle("disabled");
  toggleButton.classList.toggle("enabled");
  toggleButton.textContent = toggleButton.classList.contains("disabled") ? "Enable Zappy" : "Disable Zappy";

};
