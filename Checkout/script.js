"use strict";

const mainContainer = document.querySelector(".main-container");
const chooseAddressCont = document.querySelector(".choose-address-cont");
const shippingTypeCont = document.querySelector(".shipping-type-cont");
const choosePaymentCont = document.querySelector(".choose-payment-cont");
const orders = document.querySelector(".orders");
const loading = document.querySelector("#loading");
const amountElem = document.querySelector("#amount");
const shippingConstElem = document.querySelector("#shipping-cost");
const totalElem = document.querySelector("#total");
const editIcon = document.querySelector("#edit-icon");
const backBtn = document.querySelector(".back");
const addBackBtn = document.querySelector(".add-back");
const payBackBtn = document.querySelector(".pay-back");
const shipBackBtn = document.querySelector(".ship-back");
const addApplyBtn = document.querySelector("#add-apply-btn");
const shipApplyBtn = document.querySelector("#ship-apply-btn");
const payApplyBtn = document.querySelector("#pay-apply-btn");
const shipping = document.querySelector(".shipping");
const chosenAddressFull = document.querySelector(
  ".address .chosen-address div .add :nth-child(2)"
);
const chosenAddressTitle = document.querySelector(
  ".address .chosen-address div .add :nth-child(1)"
);
const addPromoBtn = document.querySelector("#add-promo-btn");
const promoInput = document.querySelector("#promo-input");
const promo1 = document.querySelector("#promo1");
const promo2 = document.querySelector("#promo2");
const promo = document.querySelector(".promo");
const promoCostCont = document.querySelector(".promo-const-cont");
const promoCost = document.querySelector("#promo-cost");
const goToPaymentBtn = document.querySelector(".go-to-payment-btn");
const modalBg = document.querySelector("#bg");
const modal = document.querySelector(".modal");
const goToOrders = document.querySelector("#go-to-orders");
const wrongCode = document.querySelector("#wrong-code");

let activeAddress = document.querySelector(".add-address");
let activeShipping = document.querySelectorAll(
  ".shipping-type-cont .ship-type"
)[1];
let activePayment = document.querySelectorAll(
  ".choose-payment-cont .pay-type"
)[0];
let amountValue;
let cartArr;

loading.classList.remove("hidden");
getData();

async function getData() {
  const url = new URL(window.location.href);
  cartArr = JSON.parse(url.searchParams.get("cart"));
  amountValue = Number(url.searchParams.get("amount"));
  amountElem.textContent = `$${amountValue}`;
  totalElem.textContent = `$${amountValue}`;
  // console.log(totalPrice);
  // console.log(cart);
  for (let i = 0; i < cartArr.length; i++) {
    const res = await fetch(
      `https://63501a98df22c2af7b637037.mockapi.io/shoes/${cartArr[i].id}`
    );
    const data = await res.json();
    const html = `
<div id="pro${i + 1}" class="pro">
  <div class="img-container">
    <img src=${data.image} alt="shoe-img" />
  </div>
  <div class="content">
    <div class="div1">
      <h3>${data.title}</h3>
    </div>
    <div class="div2">
      <div style="background-color: ${cartArr[i].color}"></div>
      <p>size = ${cartArr[i].size}</p>
    </div>
    <div class="div3">
      <p>$${(
        Number(
          `${data.price.toString().slice(0, 2)}.${data.price
            .toString()
            .slice(2, 4)}`
        ) * cartArr[i].quantity
      ).toFixed(2)}</p>
      <div>
        <p class="count">${cartArr[i].quantity}</p>
      </div>
    </div>
  </div>
</div>
  `;
    orders.insertAdjacentHTML("beforeend", html);
    const proTitle = orders.querySelector(`#pro${i + 1} .content .div1 h3`);
    if (proTitle.textContent.length > 20) {
      proTitle.textContent = proTitle.textContent.slice(0, 17) + "...";
    }
  }
  loading.classList.add("hidden");
}

editIcon.addEventListener("click", function () {
  mainContainer.classList.add("hidden");
  chooseAddressCont.classList.remove("hidden");
});

shipping.children[1].addEventListener("click", function () {
  mainContainer.classList.add("hidden");
  shippingTypeCont.classList.remove("hidden");
});

shipping.addEventListener("click", function (e) {
  if (e.target.classList.contains("ship-edit")) {
    shipping.children[1].click();
  }
});

addPromoBtn.addEventListener("click", function (e) {
  if (promoInput.value === "promo1") {
    promoInput.classList.add("hidden");
    addPromoBtn.classList.add("hidden");
    promo1.classList.remove("hidden");
    promoCostCont.id = "";
    promoCost.textContent = `- $${(amountValue * 0.3).toFixed(2)}`;
    totalElem.textContent = `$${(
      Number(totalElem.textContent.slice(1)) -
      Number((amountValue * 0.3).toFixed(2))
    ).toFixed(2)}`;
  } else if (promoInput.value === "promo2") {
    promoInput.classList.add("hidden");
    addPromoBtn.classList.add("hidden");
    promo2.classList.remove("hidden");
    promoCostCont.id = "";
    promoCost.textContent = `- $${(amountValue * 0.25).toFixed(2)}`;
    totalElem.textContent = `$${(
      Number(totalElem.textContent.slice(1)) -
      Number((amountValue * 0.25).toFixed(2))
    ).toFixed(2)}`;
  } else if (promoInput.value === "") {
    wrongCode.textContent = "Please Type Something in the Box.";
    wrongCode.classList.remove("hidden");
  } else {
    wrongCode.textContent = "❌ Invalid Code";
    wrongCode.classList.remove("hidden");
  }
});

promoInput.addEventListener("click", function () {
  wrongCode.classList.add("hidden");
});

promo.addEventListener("click", function (e) {
  if (e.target.classList.contains("clear-promo")) {
    promoInput.classList.remove("hidden");
    promoInput.value = "";
    addPromoBtn.classList.remove("hidden");
    e.target.closest(".active-promo").classList.add("hidden");
    promoCostCont.id = "hidden";
    if (e.target.id.at(-1) === "1") {
      totalElem.textContent = `$${(
        Number(totalElem.textContent.slice(1)) +
        Number((amountValue * 0.3).toFixed(2))
      ).toFixed(2)}`;
    } else {
      totalElem.textContent = `$${(
        Number(totalElem.textContent.slice(1)) +
        Number((amountValue * 0.25).toFixed(2))
      ).toFixed(2)}`;
    }
  }
});

goToPaymentBtn.addEventListener("click", function () {
  if (shippingConstElem.textContent !== "0") {
    mainContainer.classList.add("hidden");
    choosePaymentCont.classList.remove("hidden");
  } else {
    alert("Choose Shipping Type.");
  }
});

backBtn.addEventListener("click", function () {
  window.location = "./cart.html";
});

// ---------------------------------------------------------------------------

chooseAddressCont.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("outer-point") ||
    e.target.classList.contains("inner-point")
  ) {
    if (e.target.closest(".add-address") !== activeAddress) {
      activeAddress.querySelector(".inner-point").classList.add("hidden");
      e.target.querySelector(".inner-point").classList.remove("hidden");
      activeAddress = e.target.closest(".add-address");
    }
  }
});

addBackBtn.addEventListener("click", function () {
  mainContainer.classList.remove("hidden");
  chooseAddressCont.classList.add("hidden");
});

addApplyBtn.addEventListener("click", function () {
  chosenAddressTitle.textContent = activeAddress.querySelector(
    ".add-add :nth-child(1)"
  ).textContent;
  chosenAddressFull.textContent = activeAddress.querySelector(
    ".add-add :nth-child(2)"
  ).textContent;

  mainContainer.classList.remove("hidden");
  chooseAddressCont.classList.add("hidden");
});

// -----------------------------------------------------------------------------

shippingTypeCont.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("ship-outer-point") ||
    e.target.classList.contains("ship-inner-point")
  ) {
    if (e.target.closest(".ship-type") !== activeShipping) {
      activeShipping.querySelector(".ship-inner-point").classList.add("hidden");
      e.target.querySelector(".ship-inner-point").classList.remove("hidden");
      activeShipping = e.target.closest(".ship-type");
    }
  }
});

shipBackBtn.addEventListener("click", function () {
  mainContainer.classList.remove("hidden");
  shippingTypeCont.classList.add("hidden");
});

shipApplyBtn.addEventListener("click", function () {
  shipping.children[1].id = "hidden";
  for (let i = 2; i < 6; i++) {
    shipping.children[i].classList.add("hidden");
  }
  shipping.children[Number(activeShipping.id.at(-1)) + 1].classList.remove(
    "hidden"
  );

  if (activeShipping.id.at(-1) === "1") {
    shippingConstElem.textContent = "$10";
    totalElem.textContent = `$${(
      Number(totalElem.textContent.slice(1)) + 10
    ).toFixed(2)}`;
  } else if (activeShipping.id.at(-1) === "2") {
    shippingConstElem.textContent = "$15";
    totalElem.textContent = `$${(
      Number(totalElem.textContent.slice(1)) + 15
    ).toFixed(2)}`;
  } else if (activeShipping.id.at(-1) === "3") {
    shippingConstElem.textContent = "$20";
    totalElem.textContent = `$${(
      Number(totalElem.textContent.slice(1)) + 20
    ).toFixed(2)}`;
  } else {
    shippingConstElem.textContent = "$30";
    totalElem.textContent = `$${(
      Number(totalElem.textContent.slice(1)) + 30
    ).toFixed(2)}`;
  }

  mainContainer.classList.remove("hidden");
  shippingTypeCont.classList.add("hidden");
});

// ------------------------------------------------------------------------------------------

choosePaymentCont.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("pay-outer-point") ||
    e.target.classList.contains("pay-inner-point")
  ) {
    if (e.target.closest(".pay-type") !== activePayment) {
      activePayment.querySelector(".pay-inner-point").classList.add("hidden");
      e.target.querySelector(".pay-inner-point").classList.remove("hidden");
      activePayment = e.target.closest(".pay-type");
    }
  }
});

payBackBtn.addEventListener("click", function () {
  mainContainer.classList.remove("hidden");
  choosePaymentCont.classList.add("hidden");
});

payApplyBtn.addEventListener("click", async function () {
  loading.classList.remove("hidden");

  const userRes = await fetch(
    `https://63501a98df22c2af7b637037.mockapi.io/users/${
      JSON.parse(localStorage.user).id
    }`
  );
  const userData = await userRes.json();
  let arr = userData.orders;

  for (let i = 0; i < cartArr.length; i++) {
    cartArr[i].createdAt = Date.now();
    arr.push(cartArr[i]);
  }
  await fetch(
    `https://63501a98df22c2af7b637037.mockapi.io/users/${
      JSON.parse(localStorage.user).id
    }`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        orders: arr,
        cart: [],
      }),
    }
  );
  loading.classList.add("hidden");
  modal.classList.remove("hidden");
  modal.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
  modalBg.classList.remove("hidden");
});

goToOrders.addEventListener("click", function () {
  window.location = "./orders.html";
});

window.addEventListener("resize", function () {
  modal.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
});
