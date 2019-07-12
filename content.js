let price = document.getElementsByClassName('current-price');
console.log(price[0].innerText);

let material = document.getElementsByClassName('about-me');
console.log(material[0].innerText);

const calculateCostPerWear = price => {
    let lifetimeUse = 2;
    const costPerWear = price / lifetimeUse;
    return costPerWear.toFixed(2);
}

const itemCost = parseInt(price[0].innerText.replace(/£/, ""));

const displayCostPW = document.createElement('p');
displayCostPW.innerText = `Cost per wear: £${calculateCostPerWear(itemCost)}`;
price[0].appendChild(displayCostPW);

let slider = document.createElement('input');

slider.type = 'range';
slider.min = 1;
slider.max = 100;
slider.value = 50;
slider.classList.add('slider');

let averageWear = document.createElement('p');
averageWear.textContent = `Average number of wears: ${slider.value}`;

slider.oninput = () => {
    averageWear.textContent = `Average number of wears: ${slider.value}`;
}


let zappyBar = document.createElement('div');
zappyBar.appendChild(averageWear);
zappyBar.appendChild(slider);

zappyBar.classList.add('sticky');

document.body.insertBefore(zappyBar, document.body.firstChild);