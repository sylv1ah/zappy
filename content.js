let price = document.getElementsByClassName("css-b9fpep"); // NIKE price span class
if (price.length == 0) price = document.getElementsByClassName('current-price'); // ASOS 
if (price.length == 0) price = document.getElementsByClassName('product-price'); // ZARA - not working yet
if (price.length == 0) price = document.getElementsByClassName('price-sales'); // Uniqlo 
if (price.length == 0) price = document.getElementsByClassName('price-discount'); // Shein 
if (price.length == 0) price = document.getElementsByClassName('on-sale'); // Macy's sale items
if (price.length == 0) price = document.getElementsByClassName('price'); // Macy's non-sale
if (price.length == 0) price = document.getElementsByClassName('Z1WEo3w'); // Nordstrom

console.log(price[0].innerText);

const itemCost = parseFloat(price[0].innerText.replace(/[£$A-Z]/gi, "")).toFixed(2);
console.log("itemcost =", itemCost);


//COST PER WEAR
let costPW = document.createElement("div");

let costValue = document.createElement("span");
costValue.classList.add("cost-value", "text-format");
let perWear = document.createElement("span");
perWear.textContent = "Cost per wear: ";
perWear.classList.add("text-format");

costPW.appendChild(perWear);
costPW.appendChild(costValue);

const CPW = (itemCost, timeFrameValue, timeFrame, selectSeasons, lifetime) => {
  if (selectSeasons === 0 || timeFrame === 365) {
    selectSeasons = 4;
  }
  console.log('Seasons', selectSeasons);
  lifetimeDays = lifetime * 365;
  let wearAmount =
    lifetimeDays * (selectSeasons * 0.25) * (timeFrameValue / timeFrame);
  costValue.textContent = "£" + (itemCost / wearAmount).toFixed(2);
};

window.onload = () => {
  CPW(
    itemCost,
    slider.value,
    timeFrameObj[timeFrameSelect.value],
    selectSeasons,
    lifetimeSlider.value
  );
};

//SLIDER
let slider = document.createElement("input");

slider.type = "range";
slider.min = 1;
slider.max = 7;
slider.value = Math.round(slider.max / 2);
slider.timeframe = "week";
slider.classList.add("slider");


let usesPer = document.createElement("p");
usesPer.classList.add('text-format');

let useValue = document.createElement("span");
useValue.classList.add('use-value', 'text-format');
useValue.textContent = slider.value;

let averageWear = document.createElement("span");
averageWear.textContent = ' uses per ';

usesPer.appendChild(useValue);
usesPer.appendChild(averageWear);

const changeSliderValue = value => {
  useValue.textContent = slider.value;
  value == 1
    ? (averageWear.textContent = ' use per ')
    : (averageWear.textContent = ' uses per ');
};





slider.oninput = () => {
  changeSliderValue(slider.value);
  CPW(
    itemCost,
    slider.value,
    timeFrameObj[timeFrameSelect.value],
    selectSeasons,
    lifetimeSlider.value
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
timeFrameSelect.classList.add("text-format");

let usesPerTimeframe = document.createElement("div");
usesPerTimeframe.classList.add("uses-per-timeframe");
usesPerTimeframe.appendChild(usesPer);
usesPerTimeframe.appendChild(timeFrameSelect);

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
  seasonSelectorText.disabled = timeFrameSelect.value === 'year' ? true : false;

  if (seasonCheckboxes.style.display = "block" && timeFrameSelect.value === 'year') {
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
    lifetimeSlider.value
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
seasonSelectorText.classList.add("season-selector-text", "text-format");
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
  label.classList.add('text-format');
  input.onchange = () => {
    selectSeasons = document.querySelectorAll('input[type="checkbox"]:checked')
      .length;
    CPW(
      itemCost,
      slider.value,
      timeFrameObj[timeFrameSelect.value],
      selectSeasons,
      lifetimeSlider.value
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
lifetimeSlider.classList.add("lifetime-slider");

let lifetime = document.createElement("p");
lifetime.textContent = `for ${lifetimeSlider.value} years`;
lifetime.classList.add("text-format");

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
    lifetimeSlider.value
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

//APPEND EVERYTHING TO BAR
let zappyBar = document.createElement("div");
zappyBar.classList.add("sticky");
zappyBar.appendChild(slider);
zappyBar.appendChild(usesPerTimeframe);
zappyBar.appendChild(infoButton);
zappyBar.appendChild(seasonSelector);
zappyBar.appendChild(lifetimeSlider);
zappyBar.appendChild(lifetime);
zappyBar.appendChild(costPW);
zappyBar.appendChild(closeButton);

document.body.parentNode.insertBefore(zappyBar, document.body.nextSibling);
document.body.classList.add("newBody");
