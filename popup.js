let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", data => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = element => {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(tabs[0].id, {
      code:
        'document.getElementsByTagName("h1")[0].style.color = "' + color + '";'
    });
  });
};
