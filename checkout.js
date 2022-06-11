let cart = document.querySelector("#count");

let cartData = JSON.parse(localStorage.getItem("cart"));

let mainSec = document.createElement("div");
mainSec.className = "mainsec";
let sectionOuter = document.querySelector(".sectionouter");

let h2 = document.createElement("h2");
h2.innerText = "Checkout";

const totalItems = document.createElement("h4");
totalItems.innerText = "Total Items: " + cartData.length;

let leftSec = document.createElement("div");
leftSec.className = "leftsec";

// cartData.sort((a, b) => {
//   return a.id - b.id;
// });

const localData = JSON.parse(localStorage.getItem("cart"));
let totalCartitems = 0;
if (JSON.parse(localStorage.getItem("cart")) !== null) {
  for (let i = 0; i < localData.length; i++) {
    totalCartitems += localData[i].quantity;
  }
}
if (JSON.parse(localStorage.getItem("cart")) == null) {
  const cartEmpty = document.createElement("h2");
  cartEmpty.className = "cartempty";
  cartEmpty.innerText =
    "Your cart is empty! \n Please add some items to your cart.";
  sectionOuter.appendChild(cartEmpty);
  cart.innerText = 0;
} else {
  cart.innerText = totalCartitems;
  sectionOuter.appendChild(h2);
  sectionOuter.appendChild(totalItems);
  mainSec.appendChild(leftSec);
  sectionOuter.appendChild(mainSec);
  let grandTotal = 0;
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
    qty.innerText = "x" + data.quantity;

    let amount = document.createElement("h5");
    amount.innerText = "Amount: Rs " + data.price;

    grandTotal += data.price * data.quantity;

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

  let buttonOuter = document.createElement("div");
  buttonOuter.className = "placeorderbtnouter";

  let placeorderBtn = document.createElement("button");
  placeorderBtn.id = "placeorderbtn";
  placeorderBtn.innerText = "Place Order";

  let br = document.createElement("br");

  rightSec.appendChild(amountHeading);
  rightSec.append("Rs. " + grandTotal);
  buttonOuter.appendChild(placeorderBtn);
  rightSec.appendChild(buttonOuter);
  mainSec.appendChild(rightSec);
  placeorderBtn.addEventListener("click", function () {
    console.log(JSON.parse(localStorage.getItem("cart")));
    fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(localStorage.getItem("cart")),
      // body: JSON.stringify({
      //   createdAt: "2022-05-24T15:22:18.473Z",
      //   name: "Thelma Bogisich IVasdfasdfasdf",
      //   avatar:
      //     "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/402.jpg",
      //   id: "100",
      //   "[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]":
      //     "",
      // }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
      });
  });
}
