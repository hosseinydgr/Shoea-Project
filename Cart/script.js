"use strict";

const products = document.querySelector(".products");
const loading = document.querySelector("#loading");
const modal = document.querySelector(".modal");
const overlay = document.querySelector("#bg");
const modalImg = document.querySelector("#modal-shoe-img");
const modalTitle = document.querySelector("#modal-shoe-title");
const modalSize = document.querySelector("#modal-shoe-size");
const modalPrice = document.querySelector("#modal-shoe-price");
const modalCount = document.querySelector("#modal-shoe-count");
const modalColor = document.querySelector("#modal-shoe-color");
const cancel = document.querySelector("#cancel");
const okBtn = document.querySelector("#ok");
const totalPriceElem = document.querySelector("#total-price");
const ordersIcon = document.querySelector("#orders-icon");
const homeIcon = document.querySelector("#home-icon");
const checkoutBtn = document.querySelector("#checkout-btn");
const navBar = document.querySelector(".nav-bar");
const checkout = document.querySelector("#checkout");
const searchIcon = document.querySelector("#search-icon");

let totalPriceValue = 0;
let userData;
let modalId;
let fees = [];
let prices;

loading.classList.remove("hidden");
navBar.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
checkout.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;

getData();

async function getData() {
  const userRes = await fetch(
    `https://63501a98df22c2af7b637037.mockapi.io/users/${
      JSON.parse(localStorage.user).id
    }`
  );
  userData = await userRes.json();
  // console.log(data.cart);
  for (let i = 0; i < userData.cart.length; i++) {
    const proRes = await fetch(
      `https://63501a98df22c2af7b637037.mockapi.io/shoes/${userData.cart[i].id}`
    );
    const proData = await proRes.json();
    fees.push(
      Number(
        `${proData.price.toString().slice(0, 2)}.${proData.price
          .toString()
          .slice(2, 4)}`
      )
    );
    const html = `				
		<div id="pro${i + 1}" class="pro">
			<div class="img-container">
				<img src=${proData.image} alt="shoe-img" />
			</div>
			<div class="content">
				<div class="div1">
					<h3>${proData.title}</h3>
					<img src="./Assets/trash-icon.png" alt="trash-icon" class="trash" />
				</div>
				<div class="div2">
					<div style = "background-color: ${userData.cart[i].color};"></div>
					<p>size = ${userData.cart[i].size}</p>
				</div>
				<div class="div3">
					<p class="prices">$${(
            Number(
              proData.price.toString().slice(0, 2) +
                "." +
                proData.price.toString().slice(2, 4)
            ) * Number(userData.cart[i].quantity)
          ).toFixed(2)}</p>
					<div class="qnt">
						<p class="minus">&mdash;</p>
						<p class="count">${userData.cart[i].quantity}</p>
						<p class="plus">&plus;</p>
					</div>
				</div>
			</div>
		</div>`;
    products.insertAdjacentHTML("beforeend", html);
    totalPriceValue += Number(
      products
        .querySelector(`#pro${i + 1} .content .div3 > p`)
        .textContent.slice(1)
    );
    const proTitle = products.querySelector(`#pro${i + 1} .content .div1 h3`);
    if (proTitle.textContent.length > 18) {
      proTitle.textContent = proTitle.textContent.slice(0, 15) + "...";
    }
  }
  totalPriceElem.textContent = totalPriceValue.toFixed(2);
  loading.classList.add("hidden");
}

products.addEventListener("click", async function (e) {
  if (e.target.classList.contains("trash")) {
    modalImg.src =
      e.target.closest(".pro").firstElementChild.firstElementChild.src;
    modalTitle.textContent = e.target.previousElementSibling.textContent;
    modalSize.textContent =
      e.target.parentElement.nextElementSibling.children[1].textContent.slice(
        7
      );
    modalPrice.textContent =
      e.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.textContent;
    modalCount.textContent = e.target
      .closest(".pro")
      .querySelector(".count").textContent;
    modalColor.style.backgroundColor =
      e.target.parentElement.nextElementSibling.firstElementChild.style.backgroundColor;

    modalId = Number(e.target.closest(".pro").id.at(-1)) - 1;
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
  }

  if (e.target.classList.contains("plus")) {
    loading.classList.remove("hidden");
    e.target.previousElementSibling.textContent =
      Number(e.target.previousElementSibling.textContent) + 1;
    e.target.parentElement.previousElementSibling.textContent = `$${(
      fees[Number(e.target.closest(".pro").id.at(-1)) - 1] *
      Number(e.target.previousElementSibling.textContent)
    ).toFixed(2)}`;

    userData.cart[Number(e.target.closest(".pro").id.at(-1)) - 1].quantity =
      Number(
        userData.cart[Number(e.target.closest(".pro").id.at(-1)) - 1].quantity
      ) + 1;
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
          cart: userData.cart,
        }),
      }
    );

    prices = document.querySelectorAll(".prices");
    totalPriceValue = 0;
    for (let i = 0; i < prices.length; i++) {
      totalPriceValue += Number(prices[i].textContent.slice(1));
    }
    totalPriceElem.textContent = totalPriceValue.toFixed(2);

    loading.classList.add("hidden");
  } else if (
    e.target.classList.contains("minus") &&
    e.target.nextElementSibling.textContent !== "1"
  ) {
    loading.classList.remove("hidden");
    e.target.nextElementSibling.textContent =
      Number(e.target.nextElementSibling.textContent) - 1;
    e.target.parentElement.previousElementSibling.textContent = `$${(
      fees[Number(e.target.closest(".pro").id.at(-1)) - 1] *
      Number(e.target.nextElementSibling.textContent)
    ).toFixed(2)}`;

    userData.cart[Number(e.target.closest(".pro").id.at(-1)) - 1].quantity =
      Number(
        userData.cart[Number(e.target.closest(".pro").id.at(-1)) - 1].quantity
      ) - 1;
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
          cart: userData.cart,
        }),
      }
    );

    prices = document.querySelectorAll(".prices");
    totalPriceValue = 0;
    for (let i = 0; i < prices.length; i++) {
      totalPriceValue += Number(prices[i].textContent.slice(1));
    }
    totalPriceElem.textContent = totalPriceValue.toFixed(2);

    loading.classList.add("hidden");
  }
});

cancel.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

okBtn.addEventListener("click", async function () {
  userData.cart.splice(modalId, 1);
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
        cart: userData.cart,
      }),
    }
  );
  location.reload();
  // document.querySelector(`#pro${modalId + 1}`).remove();
  // overlay.classList.add("hidden");
  // modal.classList.add("hidden");
});

homeIcon.addEventListener("click", function () {
  window.location = "./home.html";
});

ordersIcon.addEventListener("click", function () {
  window.location = "./orders.html";
});

checkoutBtn.addEventListener("click", function () {
  if (totalPriceElem.textContent !== "0.00") {
    window.location = `./checkout.html?amount=${totalPriceValue.toFixed(
      2
    )}&cart=${JSON.stringify(userData.cart)}`;
  }
});

window.addEventListener("resize", function () {
  navBar.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
  checkout.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
});

searchIcon.addEventListener("click", function () {
  window.location = "./search.html";
});
