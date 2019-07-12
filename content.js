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

let header = document.createElement("div");
header.classList.add("sticky");
document.body.parentNode.insertBefore(header, document.body.nextSibling);
document.body.classList.add("newBody");

let headerItem = document.createElement("div");
headerItem.innerText = `Item cost: £${itemCost}, Cost per wear: £${calculateCostPerWear(
  itemCost
)}`;
header.appendChild(headerItem);

let closeButton = document.createElement("button");
closeButton.innerText = "close";
closeButton.addEventListener("click", () => {
  header.remove();
  document.body.classList.remove("newBody");
});
header.appendChild(closeButton);

console.log("This should be the header:", document.body.header);
