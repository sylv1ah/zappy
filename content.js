let price = document.getElementsByClassName("css-b9fpep"); // NIKE price span class
if (price.length == 0) price = document.getElementsByClassName("current-price"); // ASOS
if (price.length == 0) price = document.getElementsByClassName("product-price"); // ZARA - not working yet
if (price.length == 0) price = document.getElementsByClassName("price-sales"); // Uniqlo
if (price.length == 0)
  price = document.getElementsByClassName("price-discount"); // Shein
if (price.length == 0) price = document.getElementsByClassName("on-sale"); // Macy's sale items
if (price.length == 0) price = document.getElementsByClassName("price"); // Macy's non-sale
if (price.length == 0) price = document.getElementsByClassName("Z1WEo3w"); // Nordstrom

// Currency Extraction

let currencyIDList = {
  "USD": '$',
  "GBP": '£',
  "AUD": '$',
  "BGN": 'лв.',
  "BRL": 'R$',
  "CAD": 'C$',
  "CHF": 'Fr.',
  "CNY": '¥',
  "CZK": 'Kč',
  "DKK": 'Kr.',
  "EUR": '€',
  "GBP": "£",
  "HKD": 'HK$',
  "HRK": 'kn',
  "HUF": 'Ft',
  "IDR": 'Rp',
  "ILS": '₪',
  "INR": '₹',
  "ISK": 'Íkr/kr',
  "JPY": '円',
  "KRW": '₩',
  "MXN": 'Mex$',
  "MYR": 'RM',
  "NOK": 'kr',
  "NZD": '$',
  "PHP": '₱',
  "PLN": 'zł',
  "RON": 'lei',
  "RUB": '₽',
  "SEK": 'kr',
  "SGD": 'S$',
  "THB": '฿',
  "TRY": '₺',
  "ZAR": 'R'
}

const checkCurrencyCode = (priceText) => {
  return Object.keys(currencyIDList)
    .map(currencyCode => priceText.includes(currencyCode) ? [currencyCode, currencyIDList[currencyCode]] : null)
    .filter(Boolean)[0];
}

const checkCurrencySymbol = (priceText) => {
  return Object.keys(currencyIDList)
    .map(currencyCode => priceText.includes(currencyIDList[currencyCode]) ? [currencyCode, currencyIDList[currencyCode]] : null)
    .filter(Boolean)[0];
  // Need to deal with edge cases, multiple dollars
}

const currencyDetails = checkCurrencyCode(price[0].innerText) || checkCurrencySymbol(price[0].innerText);

let code = currencyDetails[0] || null;
let symbol = currencyDetails[1] || null;

const itemCost = parseFloat((price[0].innerText)
  .replace(/[A-Z]/gi, "")
  .replace(code, "")
  .replace(symbol, ""))
  .toFixed(2);

console.log('Currency Details:', currencyDetails);
console.log('Stripped Item Cost:', itemCost);


//COST PER WEAR
let costPW = document.createElement("div");

const CPW = (
  itemCost,
  timeFrameValue,
  timeFrame,
  selectSeasons,
  lifetime,
  newCurrency
) => {
  if (selectSeasons === 0 || timeFrame === 365) {
    selectSeasons = 4;
  }
  lifetimeDays = lifetime * 365;
  let wearAmount =
    lifetimeDays * (selectSeasons * 0.25) * (timeFrameValue / timeFrame);
  let adjustedCost = itemCost / wearAmount;

  currencyConverterFunction(
    newCurrency,
    adjustedCost
  );

};

window.onload = () => {
  CPW(
    itemCost,
    slider.value,
    timeFrameObj[timeFrameSelect.value],
    selectSeasons,
    lifetimeSlider.value,
    currencySelect.value
  );
  sendMessageToBackground();
};

//SLIDER
let slider = document.createElement("input");

slider.type = "range";
slider.min = 1;
slider.max = 7;
slider.value = Math.round(slider.max / 2);
slider.timeframe = "week";
slider.classList.add("slider");

let averageWear = document.createElement("p");
averageWear.textContent = `${slider.value} uses per`;

const changeSliderValue = value => {
  return value == 1
    ? (averageWear.textContent = `${value} use per`)
    : (averageWear.textContent = `${value} uses per`);
};

slider.oninput = () => {
  changeSliderValue(slider.value);
  CPW(
    itemCost,
    slider.value,
    timeFrameObj[timeFrameSelect.value],
    selectSeasons,
    lifetimeSlider.value,
    currencySelect.value
  );
};

//TIME FRAME SELECT
let timeFrameObj = {
  week: 7,
  month: 30,
  year: 365
};

let timeFrameSelect = document.createElement("select");
timeFrameSelect.id = "timeFrameSelect";

const convertUses = (current, target, value) => {
  return current === "week"
    ? target === "month"
      ? (value / 7) * 30
      : target === "year"
        ? (value / 7) * 365
        : value
    : current === "month"
      ? target === "week"
        ? (value / 30) * 7
        : target === "year"
          ? (value / 30) * 365
          : value
      : current === "year"
        ? target === "week"
          ? (value / 365) * 7
          : target === "month"
            ? (value / 365) * 30
            : value
        : value;
};

timeFrameSelect.onchange = () => {
  seasonSelectorText.disabled = timeFrameSelect.value === "year" ? true : false;

  if (
    (seasonCheckboxes.style.display =
      "block" && timeFrameSelect.value === "year")
  ) {
    seasonCheckboxes.style.display = "none";
  }

  //disable select options for seasons
  slider.max = 10000;
  // We temporarily reassign the maximum value of the slider so it does not interfere with changing the slider's value.
  slider.value = Math.round(
    convertUses(slider.timeframe, timeFrameSelect.value, slider.value)
  );
  slider.timeframe = timeFrameSelect.value;
  slider.max = timeFrameObj[timeFrameSelect.value];
  changeSliderValue(slider.value);
  CPW(
    itemCost,
    slider.value,
    timeFrameObj[timeFrameSelect.value],
    selectSeasons,
    lifetimeSlider.value,
    currencySelect.value
  );
};

Object.keys(timeFrameObj).map(key => {
  option = document.createElement("option");
  option.value = key;
  option.text = key;
  timeFrameSelect.appendChild(option);
});

//INFO BUTTON
let infoButton = document.createElement("button");
infoButton.textContent = "i";
infoButton.classList.add("info-button");

//SEASON CHECKBOXES
let seasons = ["spring", "summer", "autumn", "winter"];
let selectSeasons = 0;
let seasonSelector = document.createElement("div");
seasonSelector.classList.add("season-selector");
let seasonSelectorText = document.createElement("button");
seasonSelectorText.classList.add("season-selector-text");
seasonSelectorText.textContent = "Choose seasons:";
seasonSelector.appendChild(seasonSelectorText);
let seasonCheckboxes = document.createElement("div");
seasonCheckboxes.classList.add("season-checkboxes");
seasonSelector.appendChild(seasonCheckboxes);

seasons.map(season => {
  input = document.createElement("input");
  label = document.createElement("label");
  input.type = "checkbox";
  input.name = "season";
  input.id = season;
  input.value = season;
  input.onchange = () => {
    selectSeasons = document.querySelectorAll('input[type="checkbox"]:checked')
      .length;
    CPW(
      itemCost,
      slider.value,
      timeFrameObj[timeFrameSelect.value],
      selectSeasons,
      lifetimeSlider.value,
      currencySelect.value
    );
  };
  label.htmlFor = season;
  label.textContent = season;
  checkbox = document.createElement("div");
  checkbox.appendChild(input);
  checkbox.appendChild(label);
  seasonCheckboxes.appendChild(checkbox);
});

let expanded = false;

seasonSelectorText.addEventListener("click", () => {
  if (!expanded) {
    seasonCheckboxes.style.display = "block";
    expanded = true;
  } else {
    seasonCheckboxes.style.display = "none";
    expanded = false;
  }
});

//LIFETIME SLIDER

let lifetimeSlider = document.createElement("input");

lifetimeSlider.type = "range";
lifetimeSlider.min = 1;
lifetimeSlider.max = 5;
lifetimeSlider.value = Math.round(lifetimeSlider.max / 2);
lifetimeSlider.classList.add("slider");

let lifetime = document.createElement("p");
lifetime.textContent = `for ${lifetimeSlider.value} years`;

const changeLifetimeSliderValue = value => {
  if (value == 1) {
    lifetime.textContent = `for ${value} year`;
  } else if (value == 5) {
    lifetime.textContent = `for ${value}+ years`;
  } else {
    lifetime.textContent = `for ${value} years`;
  }
};

lifetimeSlider.oninput = () => {
  changeLifetimeSliderValue(lifetimeSlider.value);
  CPW(
    itemCost,
    slider.value,
    timeFrameObj[timeFrameSelect.value],
    selectSeasons,
    lifetimeSlider.value,
    currencySelect.value
  );
};

//CLOSE BUTTON
let closeButton = document.createElement("button");
closeButton.innerText = "✕";
closeButton.classList.add("close");
closeButton.addEventListener("click", () => {
  zappyBar.remove();
  document.body.classList.remove("newBody");
});

//CURRENCY SELECT
let currencySelect = document.createElement("select");
// let currencyList = ["GBP"];

let sendMessageToBackground = () => {
  chrome.runtime.sendMessage(
    {
      contentScriptQuery: "getCurrencyList",
      url: "https://currency-converter5.p.rapidapi.com/currency/list"
    },
    response => {
      console.log("currencies in content.js:", response.res);
      currencyList.push(Object.keys(response.res));
    }
  );
};

let currencyList = [
  "GBP",
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR"
];

currencyList.map(currency => {
  option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  currencySelect.appendChild(option);
});

//CURRENCY CONVERT
let baseCurrency = "GBP";
//change this depending on page scrape

let currencyConverterFunction = (selectedCurrency, runningTotal) => {
  return chrome.runtime.sendMessage(
    {
      contentScriptQuery: "getConversion",
      runningTotal: runningTotal,
      baseCurrency: baseCurrency,
      newCurrency: selectedCurrency
    },
    response => {
      let convertedCost = parseFloat(response.res[selectedCurrency].rate_for_amount);
      costPW.textContent = `Cost per wear: ${(convertedCost.toLocaleString('en-GB', { style: 'currency', currency: selectedCurrency, currencyDisplay: 'symbol' }))}`;
    }
  );
};

currencySelect.onchange = () => {
  let newCurrency = currencySelect.value;
  console.log("new currency:", newCurrency);
  //   currencyConverterFunction(newCurrency);

  CPW(
    itemCost,
    slider.value,
    timeFrameObj[timeFrameSelect.value],
    selectSeasons,
    lifetimeSlider.value,
    currencySelect.value
  );
};

//APPEND EVERYTHING TO BAR
let zappyBar = document.createElement("div");
zappyBar.classList.add("sticky");
zappyBar.appendChild(slider);
zappyBar.appendChild(averageWear);
zappyBar.appendChild(timeFrameSelect);
zappyBar.appendChild(infoButton);
zappyBar.appendChild(seasonSelector);
zappyBar.appendChild(lifetimeSlider);
zappyBar.appendChild(lifetime);
zappyBar.appendChild(costPW);
zappyBar.appendChild(currencySelect);
zappyBar.appendChild(closeButton);

document.body.parentNode.insertBefore(zappyBar, document.body.nextSibling);
document.body.classList.add("newBody");
