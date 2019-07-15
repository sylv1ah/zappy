let price = document.getElementsByClassName("current-price");
console.log(price[0].innerText);

let material = document.getElementsByClassName("about-me");
console.log(material[0].innerText);

const calculateCostPerWear = price => {
  let lifetimeUse = 2;
  const costPerWear = price / lifetimeUse;
  return costPerWear.toFixed(2);
};

const itemCost = parseInt(price[0].innerText.replace(/£/, ""));

const displayCostPW = document.createElement("p");
displayCostPW.innerText = `Cost per wear: £${calculateCostPerWear(itemCost)}`;
price[0].appendChild(displayCostPW);

//SLIDER
let slider = document.createElement("input");

slider.type = "range";
slider.min = 1;
slider.max = 7;
slider.value = Math.round(slider.max / 2);
slider.timeframe = 'week';
slider.classList.add("slider");

let averageWear = document.createElement("p");
averageWear.textContent = `${slider.value} uses per`;

const changeSliderValue = (value) => {
  return value == 1
    ? (averageWear.textContent = `${value} use per`)
    : (averageWear.textContent = `${value} uses per`);
}

slider.oninput = () => {
  changeSliderValue(slider.value);
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
  return (current === 'week')
    ? (target === 'month')
      ? value / 7 * 30
      : (target === 'year')
        ? value / 7 * 365
        : value
    : (current === 'month')
      ? (target === 'week')
        ? value / 30 * 7
        : (target === 'year')
          ? value / 30 * 365
          : value
      : (current === 'year')
        ? (target === 'week')
          ? value / 365 * 7
          : (target === 'month')
            ? value / 365 * 30
            : value
        : value;
}

timeFrameSelect.onchange = () => {
  slider.max = 10000;
  // We temporarily reassign the maximum value of the slider so it does not interfere with changing the slider's value.
  slider.value = Math.round(convertUses(slider.timeframe, timeFrameSelect.value, slider.value));
  slider.timeframe = timeFrameSelect.value;
  slider.max = timeFrameObj[timeFrameSelect.value];
  changeSliderValue(slider.value);
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

//COST PER WEAR
let costPW = document.createElement("div");
costPW.textContent = `Cost per wear: £${itemCost}`;

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
zappyBar.appendChild(averageWear);
zappyBar.appendChild(timeFrameSelect);
zappyBar.appendChild(infoButton);
zappyBar.appendChild(seasonSelector);
zappyBar.appendChild(costPW);
zappyBar.appendChild(closeButton);

document.body.parentNode.insertBefore(zappyBar, document.body.nextSibling);
document.body.classList.add("newBody");
