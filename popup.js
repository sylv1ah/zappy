let toggleButton = document.getElementById("toggle");

// handle messages between popup and content

const handleStateMessage = (state) => {
  if (state === 'disabled') {
    toggleButton.classList.add('disabled');
    toggleButton.classList.remove('enabled');
    console.log(toggleButton.classList)
    sendState("disabled");
    toggleButton.textContent = "Enable Zappy";
  } else if (state === 'enabled') {
    toggleButton.classList.add('enabled');
    toggleButton.classList.remove('disabled');
    sendState("enabled");
    toggleButton.textContent = "Disable Zappy";
  }
}

const askState = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      request: 'request'
    }, (response) => {
      handleStateMessage(response.state)
      console.log('this is askState');
    });
  });
}

askState();

chrome.runtime.onMessage.addListener((message) => {
  handleStateMessage(message.state);
  console.log('this is the listener')
});

const sendState = (currentState) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      state: currentState
    });
  });
}

// handle click of popup button

toggleButton.onclick = () => {
  if (toggleButton.classList.contains('disabled')) {
    toggleButton.classList.remove('disabled');
    toggleButton.classList.add('enabled');
    console.log(toggleButton.classList);
    sendState("enabled");
    toggleButton.textContent = "Disable Zappy";
  } else if (toggleButton.classList.contains('enabled')) {
    toggleButton.classList.add('disabled');
    toggleButton.classList.remove('enabled');
    sendState("disabled");
    toggleButton.textContent = "Enable Zappy";
  }
};

