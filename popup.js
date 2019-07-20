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
  if (toggleButton.classList.contains("disabled")) {
    sendState("disabled");
    toggleButton.textContent = "Enable Zappy";
  } else {
    sendState("enabled");
    toggleButton.textContent = "Disable Zappy";
  }
};

const sendState = (currentState) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      state: currentState
    });
  });
}