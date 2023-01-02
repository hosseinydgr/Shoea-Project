"use strict";

const input = document.querySelector(".header input");
const searchIcon = document.querySelector(".header #search-icon");
const searchHistory = document.querySelector(".search-history");
const results = document.querySelector(".results");
const loading = document.querySelector("#loading");
const showProducts = document.querySelector(".show-products");
const showHistory = document.querySelector(".show-history");
const searchPhrase = document.querySelector("#search-phrase");
const numberFound = document.querySelector("#number-found");
const navBar = document.querySelector(".nav-bar");
const cartIcon = document.querySelector("#cart-icon");
const ordersIcon = document.querySelector("#orders-icon");
const homeIcon = document.querySelector("#home-icon");
const clearAll = document.querySelector("#clear-all");

let proData;
let userData;

loading.classList.remove("hidden");
navBar.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
getData();

async function getData() {
  const userRes = await fetch(
    `https://63501a98df22c2af7b637037.mockapi.io/users/${
      JSON.parse(localStorage.user).id
    }`
  );
  userData = await userRes.json();

  const proRes = await fetch(
    `https://63501a98df22c2af7b637037.mockapi.io/shoes`
  );
  proData = await proRes.json();

  input.click();
  // loading.classList.add("hidden");
  // console.log(userData, proData);
}

// async function getUserData() {
// 	const userRes = await fetch(
// 		`https://63501a98df22c2af7b637037.mockapi.io/users/${
// 			JSON.parse(localStorage.user).id
// 		}`
// 	);
// 	userData = await userRes.json();
// }

function renderProducts() {
  for (let i = 0; i < proData.length; i++) {
    if (proData[i].title.toLowerCase().includes(input.value.toLowerCase())) {
      let html = `
        <div id="pp${i}" class="pp">
            <div class="ppic">
                <img src = ${proData[i].image}/>
            </div>
            <h3>${proData[i].title}</h3>
            <p>$ ${proData[i].price.toString().slice(0, 2)}.${proData[i].price
        .toString()
        .slice(2, 4)}</p>
        </div>`;
      showProducts.insertAdjacentHTML("beforeend", html);
    }
  }
  numberFound.textContent = showProducts.childElementCount;
  searchPhrase.textContent = input.value;
  loading.classList.add("hidden");
}

async function renderHistory() {
  // const userRes = await fetch(
  // 	`https://63501a98df22c2af7b637037.mockapi.io/users/${
  // 		JSON.parse(localStorage.user).id
  // 	}`
  // );
  // userData = await userRes.json();

  for (let i = 0; i < userData.searchHistory.length; i++) {
    let html = `
    <div class="history" id="h${i}">
        <p>${userData.searchHistory[i]}</p>
        <button>&Cross;</button>
    </div>`;
    showHistory.insertAdjacentHTML("afterbegin", html);
  }
  input.focus();
  loading.classList.add("hidden");
}

searchIcon.addEventListener("click", async function () {
  if (results.classList.contains("hidden") && input.value !== "") {
    showProducts.innerHTML = "";
    loading.classList.remove("hidden");
    results.classList.remove("hidden");
    searchHistory.classList.add("hidden");
    if (userData.searchHistory.includes(input.value)) {
      userData.searchHistory.splice(
        userData.searchHistory.indexOf(input.value),
        1
      );
    }
    userData.searchHistory.push(input.value);
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
          searchHistory: userData.searchHistory,
        }),
      }
    );

    renderProducts();
  }
});

input.addEventListener("click", function () {
  if (!results.classList.contains("hidden")) {
    loading.classList.remove("hidden");
    results.classList.add("hidden");
    searchHistory.classList.remove("hidden");
    showHistory.innerHTML = "";
    renderHistory();
  }
});

showHistory.addEventListener("click", async function (e) {
  if (e.target.tagName === "BUTTON") {
    loading.classList.remove("hidden");
    userData.searchHistory.splice(e.target.parentElement.id.at(-1), 1);
    e.target.parentElement.remove();
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
          searchHistory: userData.searchHistory,
        }),
      }
    );
    loading.classList.add("hidden");
  }

  if (e.target.tagName === "P") {
    input.value = e.target.textContent;
    searchIcon.click();
  }
});

showProducts.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("ppic") ||
    e.target.tagName === "IMG" ||
    e.target.tagName === "H3"
  ) {
    window.open(
      `./product.html?id=${Number(e.target.closest(".pp").id.slice(2)) + 1}`
    );
  }
});

clearAll.addEventListener("click", async function () {
  loading.classList.remove("hidden");
  showHistory.innerHTML = "";
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
        searchHistory: [],
      }),
    }
  );
  loading.classList.add("hidden");
});

cartIcon.addEventListener("click", function () {
  window.location = "./cart.html";
});

ordersIcon.addEventListener("click", function () {
  window.location = "./orders.html";
});

homeIcon.addEventListener("click", function () {
  window.location = "./home.html";
});

window.addEventListener("resize", function () {
  navBar.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
});
