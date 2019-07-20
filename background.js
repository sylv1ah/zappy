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

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher(
          {
            pageUrl: { urlContains: `${items.forEach(item => item)}` },
          })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

