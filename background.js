chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { runningTotal, baseCurrency, newCurrency } = request;

  if (request.contentScriptQuery == "getConversion") {
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

let items = ["anorak",
  "apron",
  "baseball-cap",
  "belt",
  "bikini",
  "blazer",
  "blouse",
  "boots",
  "bow-tie",
  "boxers",
  "bra",
  "cardigan",
  "coat",
  "dress",
  "dressing-gown",
  "gloves",
  "hat",
  "high-heels",
  "jacket",
  "jeans",
  "jumpsuit",
  "jumper",
  "knickers",
  "leather-jacket",
  "leggings",
  "miniskirt",
  "nightie",
  "overalls",
  "overcoat",
  "pants",
  "pyjamas",
  "raincoat",
  "sandals",
  "scarf",
  "shirt",
  "shoelace",
  "shoes",
  "shorts",
  "skirt",
  "slippers",
  "socks",
  "stilettos",
  "stockings",
  "suit",
  "sweater",
  "sweatshirt",
  "swimming-costume",
  "swimming-trunks",
  "thong",
  "tie",
  "tights",
  "top",
  "tracksuit",
  "trainers",
  "trousers",
  "t-shirt",
  "underpants",
  "vest",
  "wellingtons"];

items.forEach(item => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules(
        [
          {
            conditions: [
              new chrome.declarativeContent.PageStateMatcher(
                {
                  pageUrl: { urlContains: item },
                }),
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
          }
        ]
      );
    });
  });
})


