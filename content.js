// SCRAPE AND FORMAT PRICE FROM POPULAR FASHION SITES
let price = document.getElementsByClassName('css-b9fpep'); // NIKE price span class
if (price.length == 0) price = document.getElementsByClassName('current-price'); // ASOS
if (price.length == 0) price = document.getElementsByClassName('product-price'); // ZARA - not working yet
if (price.length == 0) price = document.getElementsByClassName('price-sales'); // Uniqlo and Boohoo
if (price.length == 0)
	price = document.getElementsByClassName('price-discount'); // Shein
if (price.length == 0) price = document.getElementsByClassName('on-sale'); // Macy's sale items
if (price.length == 0) price = document.getElementsByClassName('price'); // Macy's non-sale and prettylittlething - not working
if (price.length == 0) price = document.getElementsByClassName('Z1WEo3w'); // Nordstrom
if (price.length == 0) price = document.getElementsByClassName('xk'); // Zappos
if (price.length == 0) price = document.getElementsByClassName('fabric-purchasable-product-component-simplified-price-sale-price'); // Victoria's secret sale
if (price.length == 0) price = document.getElementsByClassName('fabric-purchasable-product-component-simplified-price'); // Victoria's secret non-sale



// CURRENCY EXTRACTION

let currencyIDList = {
	AUD: ['AU$', 'A$'],
	BGN: ['лв.'],
	BRL: ['R$'],
	CAD: ['C$'],
	CHF: ['Fr.'],
	CNY: ['¥'],
	CZK: ['Kč'],
	DKK: ['Kr.'],
	EUR: ['€'],
	GBP: ['£'],
	HKD: ['HK$'],
	HRK: ['kn'],
	HUF: ['Ft'],
	IDR: ['Rp'],
	ILS: ['₪'],
	INR: ['₹'],
	ISK: ['Íkr', 'kr'],
	JPY: ['円'],
	KRW: ['₩'],
	MXN: ['Mex$'],
	MYR: ['RM'],
	NOK: ['kr'],
	NZD: ['NZ$'],
	PHP: ['₱'],
	PLN: ['zł'],
	RON: ['lei'],
	RUB: ['₽'],
	SEK: ['kr'],
	SGD: ['S$'],
	THB: ['฿'],
	TRY: ['₺'],
	ZAR: ['R'],
	USD: ['$']
};

const checkCurrencyCode = (priceText) => {
	return Object.keys(currencyIDList)
		.map((currencyCode) =>
			priceText.includes(currencyCode)
				? [currencyCode, currencyIDList[currencyCode][0]]
				: null
		)
		.filter(Boolean)[0];
};

const checkCurrencySymbol = (priceText) => {
	return Object.keys(currencyIDList)
		.map((currencyCode) => {
			return (
				currencyCode,
				currencyIDList[currencyCode]
					.map((symbol) =>
						priceText.includes(symbol) ? [currencyCode, symbol] : null
					)
					.filter(Boolean)[0]
			);
		})
		.filter(Boolean)[0];
};

const currencyDetails =
	checkCurrencyCode(price[0].innerText) ||
	checkCurrencySymbol(price[0].innerText);

let code = currencyDetails[0] || null;
let symbol = currencyDetails[1] || null;

const itemCost = parseFloat(
	price[0].innerText
		.replace(/[A-Z]/gi, '')
		.replace(code, '')
		.replace(symbol, '')
).toFixed(2);

// CONNECT CONTENT SCRIPT TO EXTENSION INFO
let zappyState = 'enabled';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.state === 'enabled') {
		document.body.parentNode.insertBefore(zappyBar, document.body.nextSibling);
		document.body.classList.add('newBody');
	} else if (message.state === 'disabled') {
		zappyBar.remove();
		document.body.classList.remove('newBody');
	} else if (message.request) {
		sendResponse({ state: zappyState });
	}
});

const sendState = (currentState) => {
	chrome.runtime.sendMessage({
		state: currentState
	});
};

//SCRAPE AND MATCH ITEM TYPE FROM PAGE TITLE
const title = document.title;

const itemLifetimes = {
  activewear: 34,
  anorak: 14,
  bikini: 12,
  blazer: 65,
  blouse: 65,
  boots: 35,
  boxers: 36,
  bra: 36,
  briefs: 36,
  cap: 24,
  cardigan: 54,
  coat: 54,
  dress: 3,
  'dressing gown': 37,
  gloves: 23,
  hat: 24,
  heels: 8,
  hoodie: 54,
  jacket: 54,
  jeans: 298,
  jumper: 54,
  jumpsuit: 4,
  kimono: 15,
  knickers: 36,
  leggings: 19,
  lingerie: 5,
  miniskirt: 38,
  nightwear: 40,
  overalls: 4,
  panties: 36,
  pants: 19,
  playsuit: 4,
  pyjamas: 40,
  raincoat: 14,
  sandals: 20,
  shirt: 95,
  shoes: 35,
  shorts: 46,
  skirt: 38,
  slippers: 20,
  sneakers: 91,
  stilettos: 8,
  stockings: 10,
  suit: 12,
  sweater: 54,
  sweatshirt: 54,
  swimwear: 12,
  'swimming costume': 12,
  'swimming trunks': 12,
  't-shirt': 95,
  thong: 36,
  tie: 23,
  tights: 10,
  top: 95,
  tracksuit: 34,
  trainers: 91,
  trouser: 19,
  underpants: 36,
  underwear: 36,
  vest: 36,
  workwear: 65
};

const itemArray = Object.keys(itemLifetimes);
const pageItemArray = itemArray.filter((word) =>
	title.toLowerCase().includes(word)
);
const pageItem = pageItemArray[0];
const weeklyItemUse = itemLifetimes[pageItem] / 104; // if data figure is number of uses over 2 years

//COST PER WEAR
let costPW = document.createElement('section');
costPW.classList.add('cost-PW');

let costValue = document.createElement('span');
costValue.classList.add('cost-value', 'text-format');

let perWear = document.createElement('span');
perWear.textContent = 'Cost per wear: ';
perWear.classList.add('text-format');

costPW.appendChild(perWear);
costPW.appendChild(costValue);

const CPW = (
	itemCost,
	timeFrameValue,
	timeFrame,
	selectSeasons,
	lifetime,
	newCurrency
) => {
<<<<<<< HEAD
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
=======
	if (selectSeasons === 0 || timeFrame === 365) {
		selectSeasons = 4;
	}
	lifetimeDays = lifetime * 365;
	let wearAmount =
		lifetimeDays * (selectSeasons * 0.25) * (timeFrameValue / timeFrame);
	let adjustedCost = itemCost / wearAmount;

	currencyConverterFunction(newCurrency, adjustedCost);
>>>>>>> master
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
let slider = document.createElement('input');

slider.type = 'range';
slider.min = 0;
slider.max = 7;
slider.step = 0.01;
slider.value = weeklyItemUse || Math.round(slider.max / 2);
slider.timeframe = 'week';
slider.classList.add('slider');

let usesPer = document.createElement('p');
usesPer.classList.add('text-format');

let useValue = document.createElement('span');
useValue.classList.add('use-value', 'text-format');
useValue.textContent = slider.value;

let averageWear = document.createElement('span');
averageWear.textContent = ' uses per ';

usesPer.appendChild(useValue);
usesPer.appendChild(averageWear);

const changeSliderValue = (value) => {
	slider.min = 1;
	slider.step = 1;
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
		lifetimeSlider.value,
		currencySelect.value
	);
};

//INFO BUTTON
const info = document.createElement('div');
info.classList.add('info-button');
const infoText = document.createElement('div');
infoText.classList.add('info-text');
infoText.textContent = `The default slider value is estimated using data from surveyed shoppers. Based on this data, a ${pageItem} is worn ${weeklyItemUse.toFixed(2)} times per ${slider.timeframe}.`;
info.appendChild(infoText);

const changeInfoText = (timeframe) => {
	switch (timeframe) {
		case 'month':
			infoValue = weeklyItemUse * 4;
			break;
		case 'year':
			infoValue = weeklyItemUse * 52;
			break;
		default:
			infoValue = weeklyItemUse;
	}
	return infoValue;
};

//TIME FRAME SELECT
let timeFrameObj = {
	week: 7,
	month: 30,
	year: 365
};

let timeFrameSelect = document.createElement('select');
timeFrameSelect.id = 'timeFrameSelect';
timeFrameSelect.classList.add('text-format');

let usesPerTimeframe = document.createElement('section');
usesPerTimeframe.classList.add('uses-per-timeframe');
usesPerTimeframe.appendChild(slider);
usesPerTimeframe.appendChild(usesPer);
usesPerTimeframe.appendChild(timeFrameSelect);
usesPerTimeframe.appendChild(info);

const convertUses = (current, target, value) => {
	return current === 'week'
		? target === 'month'
			? (value / 7) * 30
			: target === 'year'
			? (value / 7) * 365
			: value
		: current === 'month'
		? target === 'week'
			? (value / 30) * 7
			: target === 'year'
			? (value / 30) * 365
			: value
		: current === 'year'
		? target === 'week'
			? (value / 365) * 7
			: target === 'month'
			? (value / 365) * 30
			: value
		: value;
};

timeFrameSelect.onchange = () => {
<<<<<<< HEAD
  if (timeFrameSelect.value === 'year') {
    seasonSelectorText.disabled = true;
    seasonSelectorText.classList.add('disabled');
  } else {
    seasonSelectorText.disabled = false;
    seasonSelectorText.classList.remove('disabled');
  }

  if (
    (seasonCheckboxes.style.display =
      'block' && timeFrameSelect.value === 'year')
  ) {
    seasonCheckboxes.style.display = 'none';
  }

  //disable select options for seasons
  slider.max = 10000;
  // We temporarily reassign the maximum value of the slider so it does not interfere with changing the slider's value.
  slider.value = Math.round(
    convertUses(slider.timeframe, timeFrameSelect.value, slider.value)
  );
  infoText.textContent = `The default slider value is estimated using data from surveyed shoppers. Based on this data, a ${pageItem} is worn ${convertUses(slider.timeframe, timeFrameSelect.value, weeklyItemUse).toFixed(2)} times per ${timeFrameSelect.value}.`;
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

=======
	seasonSelectorText.disabled = timeFrameSelect.value === 'year' ? true : false;

	if (
		(seasonCheckboxes.style.display =
			'block' && timeFrameSelect.value === 'year')
	) {
		seasonCheckboxes.style.display = 'none';
	}

	//disable select options for seasons
	slider.max = 10000;
	// We temporarily reassign the maximum value of the slider so it does not interfere with changing the slider's value.
	slider.value = Math.round(
		convertUses(slider.timeframe, timeFrameSelect.value, slider.value)
	);
	infoText.textContent = `The default slider value is estimated using data from surveyed shoppers. Based on this data, a ${pageItem} is worn ${changeInfoText(timeFrameSelect.value).toFixed(2)} times per ${timeFrameSelect.value}.`;
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
>>>>>>> master
};

Object.keys(timeFrameObj).map((key) => {
	option = document.createElement('option');
	option.value = key;
	option.text = key;
	timeFrameSelect.appendChild(option);
});

//SEASON CHECKBOXES
let seasons = ['spring', 'summer', 'autumn', 'winter'];
let selectSeasons = 0;
let seasonSelector = document.createElement('section');
seasonSelector.classList.add('season-selector');
let seasonSelectorText = document.createElement('button');
seasonSelectorText.classList.add('season-selector-text', 'text-format');
seasonSelectorText.textContent = 'Seasons:';
seasonSelector.appendChild(seasonSelectorText);
let seasonCheckboxes = document.createElement('div');
seasonCheckboxes.classList.add('season-checkboxes');
seasonSelector.appendChild(seasonCheckboxes);

<<<<<<< HEAD
seasons.map(season => {
  input = document.createElement("input");
  label = document.createElement("label");
  label.classList.add('text-format');
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
=======
seasons.map((season) => {
	input = document.createElement('input');
	label = document.createElement('label');
	input.type = 'checkbox';
	input.name = 'season';
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
	checkbox = document.createElement('div');
	checkbox.appendChild(input);
	checkbox.appendChild(label);
	seasonCheckboxes.appendChild(checkbox);
>>>>>>> master
});

let expanded = false;

seasonSelectorText.addEventListener('click', () => {
	if (!expanded) {
		seasonCheckboxes.style.display = 'block';
		expanded = true;
	} else {
		seasonCheckboxes.style.display = 'none';
		expanded = false;
	}
});

//LIFETIME SLIDER

let lifetimeSlider = document.createElement('input');

lifetimeSlider.type = 'range';
lifetimeSlider.min = 1;
lifetimeSlider.max = 10;
lifetimeSlider.value = Math.round(lifetimeSlider.max / 2);
lifetimeSlider.classList.add('slider');
lifetimeSlider.classList.add('lifetime-slider');

let lifetimeText = document.createElement('p');
lifetimeText.classList.add('text-format');

let lifetimeFor = document.createElement('span');
lifetimeFor.textContent = 'for ';
let lifetimeValue = document.createElement('span');
lifetimeValue.textContent = lifetimeSlider.value;
lifetimeValue.classList.add('text-value');
let lifetimeYears = document.createElement('span');
lifetimeYears.textContent = ' years';
lifetimeYears.classList.add('lifetimeYears');

lifetimeText.appendChild(lifetimeFor);
lifetimeText.appendChild(lifetimeValue);
lifetimeText.appendChild(lifetimeYears);

let lifetime = document.createElement('section');
lifetime.appendChild(lifetimeSlider);
lifetime.appendChild(lifetimeText);
lifetime.classList.add('lifetime');

const changeLifetimeSliderValue = (value) => {
	lifetimeValue.textContent = value;
	if (value == 1) {
		lifetimeYears.textContent = ` year`;
	} else {
		lifetimeYears.textContent = ` years`;
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
let closeButton = document.createElement('button');
closeButton.innerText = '✕';
closeButton.classList.add('close');
closeButton.addEventListener('click', () => {
	zappyBar.remove();
	document.body.classList.remove('newBody');
	sendState('disabled');
	zappyState = 'disabled';
});

//CURRENCY SELECT
let currencySelect = document.createElement('select');
currencySelect.classList.add('currencySelect');
let currencyCodeList = Object.keys(currencyIDList);

currencyCodeList.map((currency) => {
	option = document.createElement('option');
	option.value = currency;
	option.text = currency;
	currencySelect.appendChild(option);
});

currencySelect.selectedIndex = currencyCodeList.indexOf(code);

//CURRENCY CONVERT
let baseCurrency = code;

let currencyConverterFunction = (selectedCurrency, runningTotal) => {
	return chrome.runtime.sendMessage(
		{
			contentScriptQuery: 'getConversion',
			runningTotal: runningTotal,
			baseCurrency: baseCurrency,
			newCurrency: selectedCurrency
		},
		(response) => {
			let convertedCost = parseFloat(
				response.res[selectedCurrency].rate_for_amount
			);
			costValue.textContent = `${symbol} ${convertedCost.toFixed(2)}`;
		}
	);
};

let convertTo = document.createElement('p');
convertTo.classList.add('text-format');
convertTo.textContent = 'Convert to:';

currencySelect.onchange = () => {
	let newCurrency = currencySelect.value;
	symbol = currencyIDList[newCurrency][0];

	CPW(
		itemCost,
		slider.value,
		timeFrameObj[timeFrameSelect.value],
		selectSeasons,
		lifetimeSlider.value,
		currencySelect.value
	);
};

let conversion = document.createElement('section');
conversion.classList.add('conversion');
conversion.appendChild(convertTo);
conversion.appendChild(currencySelect);

let yearlyUse = document.createElement('section');
yearlyUse.classList.add('yearly-use');
yearlyUse.appendChild(seasonSelector);
yearlyUse.appendChild(lifetime);

let costSection = document.createElement('section');
costSection.classList.add('cost-section');
costSection.appendChild(costPW);
costSection.appendChild(conversion);

//APPEND EVERYTHING TO BAR
let zappyBar = document.createElement('header');
zappyBar.classList.add('sticky');
zappyBar.appendChild(usesPerTimeframe);
zappyBar.appendChild(yearlyUse);
zappyBar.appendChild(costSection);
zappyBar.appendChild(closeButton);

document.body.parentNode.insertBefore(zappyBar, document.body.nextSibling);
document.body.classList.add('newBody');
