// let imageNodes = document.getElementsByClassName('product-image');
// let pageArray = [...imageNodes];
// let images = pageArray.filter(item => {
//     return item.nodeName == "IMG";
// })
// console.log(images[0].src);

let price = document.getElementsByClassName('current-price');
console.log(price[0].innerText);

let material = document.getElementsByClassName('about-me');
console.log(material[0].innerText);

let header = document.createElement('header');
header.classList.add('sticky');
document.body.appendChild(header);

console.log('This should be the header:', document.body.header);
