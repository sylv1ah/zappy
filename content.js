let price = document.getElementsByClassName('current-price');
console.log(price[0].innerText);

let material = document.getElementsByClassName('about-me');
console.log(material[0].innerText);

const calculateCostPerWear = price => {
    let lifetimeUse = 2;
    const costPerWear = price / lifetimeUse;
    return costPerWear.toFixed(2);
}

const itemCost = parseInt(price[0].innerText.replace(/£/,""));

const displayCostPW = document.createElement('p');
displayCostPW.innerText = `Cost per wear: £${calculateCostPerWear(itemCost)}`;
price[0].appendChild(displayCostPW);
