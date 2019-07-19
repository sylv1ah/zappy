chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: "#3aa757" }, () => {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { runningTotal, baseCurrency, newCurrency } = request;
  if (request.contentScriptQuery == "getConversion") {
    console.log("runningTotal:", runningTotal);
    console.log("baseCurrency:", baseCurrency);
    console.log("newCurrency:", newCurrency);
    let url = `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${baseCurrency}&to=${newCurrency}&amount=${runningTotal}`;
    console.log("URL:", url);
    fetch(url, {
      headers: {
        "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
        "X-RapidAPI-Key": "443ad39d7emshd5a159e64a17efcp114583jsndaf97a539a59"
      }
    })
      .then(r => r.json())
      .then(result => {
        console.log("this is the result:", result.rates);
        sendResponse({ res: result.rates });
      })
      .catch(err => console.log(err));
    return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.contentScriptQuery == "getCurrencyList") {
    fetch(request.url, {
      headers: {
        "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
        "X-RapidAPI-Key": "443ad39d7emshd5a159e64a17efcp114583jsndaf97a539a59"
      }
    })
      .then(r => r.json())
      .then(result => {
        console.log(
          "currencies in background.js fetch:",
          Object.keys(result.currencies)
        );
        sendResponse({ res: result.currencies });
      })
      .catch(err => console.log(err));
    return true;
  }
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
//   if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
// });

// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(
//     response
//   ) {
//     console.log(response.farewell);
//   });
// });

// function sendDetails(sendData) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       {
//         greeting: sendData
//       },
//       function(response) {
//         console.log(
//           "The response from the content script: " + response.response
//         ); //You have to choose which part of the response you want to display ie. response.response
//       }
//     );
//   });
// }
