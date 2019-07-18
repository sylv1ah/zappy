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
  console.log("OG item cost:", request.itemCost);
  const { itemCost, baseCurrency, newCurrency } = request;
  let url = `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=GBP&to=USD&amount=${itemCost}`;
  fetch(url, {
    headers: {
      "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
      "X-RapidAPI-Key": "443ad39d7emshd5a159e64a17efcp114583jsndaf97a539a59"
    }
  })
    .then(r => r.json())
    .then(result => {
      console.log("this is the result:", result.rates.USD.rate_for_amount);
    })
    .catch(err => console.log(err));
});
