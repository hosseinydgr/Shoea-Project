"use strict";

const activeTab = document.querySelector("#active-tab");
const completedTab = document.querySelector("#completed-tab");
const activeOrders = document.querySelector(".active-orders");
const completedOrders = document.querySelector(".completed-orders");
const loading = document.querySelector("#loading");
const homeIcon = document.querySelector("#home-icon");
const cartIcon = document.querySelector("#cart-icon");
const navBar = document.querySelector(".nav-bar");
const searchIcon = document.querySelector("#search-icon");

loading.classList.remove("hidden");
navBar.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
getData();

async function getData() {
  const userRes = await fetch(
    `https://63501a98df22c2af7b637037.mockapi.io/users/${
      JSON.parse(localStorage.user).id
    }`
  );
  const userData = await userRes.json();
  // console.log(data);
  const now = Date.now();
  for (let i = 0; i < userData.orders.length; i++) {
    const shoeRes = await fetch(
      `https://63501a98df22c2af7b637037.mockapi.io/shoes/${userData.orders[i].id}`
    );
    const shoeData = await shoeRes.json();
    if (now - userData.orders[i].createdAt <= 5 * 60 * 1000) {
      const html = `
			<div id="" class="pro">
				<div class="img-container">
					<img src=${shoeData.image} alt="shoe-img" />
				</div>
				<div class="content">
					<h3 class="div1">${shoeData.title}</h3>
					<div class="div2">
						<div style="background-color: ${userData.orders[i].color}"></div>
						<p>| size = ${userData.orders[i].size} |</p>
						<p>Qty = ${userData.orders[i].quantity}</p>
					</div>
					<p class="label">In Delivery</p>
					<div class="div3">
						<p>$${(
              Number(
                shoeData.price.toString().slice(0, 2) +
                  "." +
                  shoeData.price.toString().slice(2, 4)
              ) * Number(userData.orders[i].quantity)
            ).toFixed(2)}</p>
						<button>Track Order</button>
					</div>
				</div>
			</div>`;
      activeOrders.insertAdjacentHTML("beforeend", html);
    } else {
      const html = `
			<div id="" class="pro">
				<div class="img-container">
					<img src=${shoeData.image} alt="shoe-img" />
				</div>
				<div class="content">
					<h3 class="div1">${shoeData.title}</h3>
					<div class="div2">
						<div style="background-color: ${userData.orders[i].color}"></div>
						<p>| size = ${userData.orders[i].size} |</p>
						<p>Qty = ${userData.orders[i].quantity}</p>
					</div>
					<p class="label">Completed</p>
					<div class="div3">
						<p>$${(
              Number(
                shoeData.price.toString().slice(0, 2) +
                  "." +
                  shoeData.price.toString().slice(2, 4)
              ) * Number(userData.orders[i].quantity)
            ).toFixed(2)}</p>
						<button>Leave Review</button>
					</div>
				</div>
			</div>`;
      completedOrders.insertAdjacentHTML("afterbegin", html);
    }
  }
  loading.classList.add("hidden");
}

activeTab.addEventListener("click", function () {
  activeTab.classList.add("focused");
  activeTab.classList.remove("not-focused");
  completedTab.classList.add("not-focused");
  completedTab.classList.remove("focused");
  completedOrders.classList.add("hidden");
  activeOrders.classList.remove("hidden");
});

completedTab.addEventListener("click", function () {
  activeTab.classList.remove("focused");
  activeTab.classList.add("not-focused");
  completedTab.classList.remove("not-focused");
  completedTab.classList.add("focused");
  completedOrders.classList.remove("hidden");
  activeOrders.classList.add("hidden");
});

homeIcon.addEventListener("click", function () {
  window.location = "./home.html";
});

cartIcon.addEventListener("click", function () {
  window.location = "./cart.html";
});

window.addEventListener("resize", function () {
  navBar.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
});

searchIcon.addEventListener("click", function () {
  window.location = "./search.html";
});
