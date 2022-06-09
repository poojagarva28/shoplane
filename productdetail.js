let productID = window.location.search.replace(/\D/g, "");
// console.log(productID);

let productData = fetch(
  `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productID}`
);
let cartItem;

if (localStorage.getItem("cart") == null || localStorage.getItem == "") {
  cartItem = [];
} else {
  cartItem = JSON.parse(localStorage.getItem("cart"));
}

let container = document.createElement("div");
container.className = "container";

const mainContent = document.querySelector("#maincontent");
mainContent.prepend(container);

let leftsec = document.createElement("div");
leftsec.className = "leftsec";

let rightsec = document.createElement("div");
rightsec.className = "rightsec";

container.appendChild(leftsec);
container.appendChild(rightsec);

// left section
let leftImgContainer = document.createElement("div");
let imgPrev = document.createElement("img");

leftImgContainer.className = "leftimgcontainer";
leftImgContainer.appendChild(imgPrev);

let h2 = document.createElement("h2");
let brand = document.createElement("h3");
let priceLabel = document.createElement("h3");
let price = document.createElement("span");
let descriptionLabel = document.createElement("h3");
let description = document.createElement("p");
let previewLabel = document.createElement("h3");
let button = document.createElement("button");

let count = 0;
productData
  .then((resp) => resp.json())
  .then((productData, i) => {
    //fetching content
    // right section

    // console.log(productData);

    h2.innerText = productData.name;
    brand.innerText = productData.brand;
    priceLabel.innerText = `Price: Rs `;
    price.innerText = productData.price;
    priceLabel.append(price);
    descriptionLabel.innerText = "Description";
    description.innerText = productData.description;
    description.classList.add("description");
    previewLabel.innerText = "Product Preview";
    button.id = "addtocart";
    button.innerText = "Add to Cart";
    rightsec.appendChild(h2);
    rightsec.appendChild(brand);
    rightsec.append(priceLabel);
    rightsec.appendChild(descriptionLabel);
    rightsec.appendChild(description);
    rightsec.appendChild(previewLabel);

    let imgContainer = document.createElement("div");
    imgContainer.className = "imgcontainer";

    // fetching preview images
    productData.photos.map((p, i) => {
      let imgBox = document.createElement("div");
      imgBox.className = "imgbox";
      let previewPhoto = document.createElement("img");
      previewPhoto.src = p;
      previewPhoto.id = i; // getting id to check first image
      previewPhoto.alt = "Image";
      imgBox.appendChild(previewPhoto);
      imgContainer.appendChild(imgBox);

      // active first preview image
      if (i == 0) {
        previewPhoto.classList.add("active"); // add active class to first item
        imgPrev.src = previewPhoto.src; // preview first active item to preview section
      }
      previewPhoto.addEventListener("click", () => {
        var activeEle = document.querySelector(".active"); // getting active class
        activeEle.classList.remove("active"); // remove active class
        previewPhoto.classList.add("active"); // add active class to clicked item
        imgPrev.src = previewPhoto.src; // preview active image
      });
    });
    leftsec.appendChild(leftImgContainer);
    rightsec.appendChild(imgContainer);
    rightsec.appendChild(button);
    let cart = document.querySelector("#count");
    // cart.innerText = `count: ${count}`;
    productData.qty = count;
    // var army = ["Marcos", "DeltaForce", "Seals", "SWAT", "HeadHunters"];

    // if (army.indexOf("Marcos") !== -1) {
    //   alert("Yes, the value exists!");
    // } else {
    //   alert("No, the value is absent.");
    // }

    button.addEventListener("click", () => {
      // console.log(JSON.parse(localStorage.getItem("cart")));
      // console.log(productData);
      // console.log(
      //   JSON.parse(localStorage.getItem("cart")).includes(productData)
      // );
      cartItem.push(productData);
      console.log(productData);

      count++;
      //   console.log(cartItem);
      localStorage.setItem("cart", JSON.stringify(cartItem));
      cart.innerText = JSON.parse(localStorage.getItem("cart")).length;
      //   productData.qty = count;
      console.log(JSON.parse(localStorage.getItem("cart")));
    });
    cart.innerText = JSON.parse(localStorage.getItem("cart")).length;
  })
  .catch((e) => {
    console.log(e);
  });
