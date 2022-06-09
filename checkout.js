let cart = document.querySelector("#count");
cart.innerText = JSON.parse(localStorage.getItem("cart")).length;

let cartData = JSON.parse(localStorage.getItem("cart"));

let h2 = document.createElement("h2");
h2.innerText = "Checkout";
document.body.appendChild(h2);

let mainSec = document.createElement("div");
mainSec.className = "mainsec";
document.body.appendChild(mainSec);

let leftSec = document.createElement("div");
leftSec.className = "leftsec";
mainSec.appendChild(leftSec);

cartData.sort((a, b) => {
  return a.id - b.id;
});

// console.log("sorted", cartData);
// console.log(cartData.length);
// console.log(localStorage.length);
let totalqty = 0;
let grandTotal = 0;
// console.log(cartData);

for (let i = 0; i < cartData.length; i++) {
  for (let j = i + 1; j < cartData.length; j++) {
    if (cartData[i].id === localStorage[j].id) {
      cartData[i].price += cartData[i].price;
      cartData.splice(j, 1);
      i--;
    }
  }
}

// console.log(cartData.price);

cartData.map((data, i) => {
  //   console.log(data.id);
  console.log(cartData[data.id] === cartData[data.id + 1]);
  let checkoutBox = document.createElement("div");
  checkoutBox.className = "checkoutbox";

  let checkoutImg = document.createElement("img");
  checkoutImg.src = data.preview;

  let checkoutDesc = document.createElement("div");
  checkoutDesc.className = "checkoutdesc";

  let h4 = document.createElement("h4");
  h4.innerText = data.name;

  let qty = document.createElement("span");
  qty.innerText = totalqty;

  let amount = document.createElement("h5");
  amount.innerText = data.price;

  grandTotal += data.price;

  checkoutBox.appendChild(checkoutImg);
  checkoutDesc.appendChild(h4);
  checkoutDesc.appendChild(qty);
  checkoutDesc.appendChild(amount);
  checkoutBox.appendChild(checkoutDesc);
  leftSec.appendChild(checkoutBox);
});

let rightSec = document.createElement("div");
rightSec.className = "rightsec";

let amountHeading = document.createElement("h2");
amountHeading.innerText = "Total Amout";

rightSec.appendChild(amountHeading);
rightSec.append(grandTotal);
mainSec.appendChild(rightSec);
