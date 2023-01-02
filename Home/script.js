"use strict";

const userName = document.querySelector("#user-name");
const userAvatar = document.querySelector("#user-avatar");
const showProducts = document.querySelector(".show-products");
const showBrands = document.querySelector(".show-brands");
const loading = document.querySelector("#loading");
const seeAll = document.querySelector("#see-all");
const cartIcon = document.querySelector("#cart-icon");
const ordersIcon = document.querySelector("#orders-icon");
const navBar = document.querySelector(".nav-bar");
const searchInput = document.querySelector("#search-input");

let activeBrand = "";
let arr;
let data;

loading.classList.remove("hidden");
navBar.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
userName.textContent = JSON.parse(localStorage.user).name;
userAvatar.src = JSON.parse(localStorage.user).avatar;
getData();

async function getData() {
	const res = await fetch("https://63501a98df22c2af7b637037.mockapi.io/shoes");
	data = await res.json();
	// console.log(data);
	document.querySelector("#b0").click();
	loading.classList.add("hidden");
}

showBrands.addEventListener("click", function (e) {
	if (!e.target.classList.contains("show-brands") && e.target !== activeBrand) {
		if (activeBrand !== "") activeBrand.classList.remove("active");
		e.target.classList.add("active");
		activeBrand = e.target;

		if (e.target.id !== "b0") {
			arr = [];
			while (arr.length < 6) {
				let rand = Math.floor(
					Math.random() * 10 + (Number(e.target.id.at(-1)) - 1) * 10
				);
				if (!arr.includes(rand)) {
					arr.push(rand);
				}
			}
			// console.log(arr);
		} else {
			arr = [];
			while (arr.length < 6) {
				let rand = Math.floor(Math.random() * 90);
				if (!arr.includes(rand)) {
					arr.push(rand);
				}
			}
			// console.log(arr);
		}
		for (let i = 0; i < 6; i++) {
			const pp = showProducts.querySelector(`#pp${i}`);
			pp.querySelector("img").src = data[arr[i]].image;
			pp.querySelector("h3").textContent = data[arr[i]].title;
			pp.querySelector("p").textContent = ` $ ${data[arr[i]].price
				.toString()
				.slice(0, 2)}.${data[arr[i]].price.toString().slice(2, 4)}`;
		}
	}
});

showProducts.addEventListener("click", function (e) {
	if (
		e.target.classList.contains("ppic") ||
		e.target.tagName === "IMG" ||
		e.target.tagName === "H3"
	) {
		window.open(
			`../Product/index.html?id=${
				Number(arr[e.target.closest(".pp").id.at(-1)]) + 1
			}`
		);
	}
});

seeAll.addEventListener("click", function () {
	window.location = `../All/index.html?id=${activeBrand.id.at(-1)}&name=${
		activeBrand.textContent
	}`;
});

cartIcon.addEventListener("click", function () {
	window.location = "../Cart/index.html";
});

ordersIcon.addEventListener("click", function () {
	window.location = "../Orders/index.html";
});

searchInput.addEventListener("click", function () {
	window.location = "../Search/index.html";
});

window.addEventListener("resize", function () {
	navBar.style.left = `${(document.documentElement.clientWidth - 360) / 2}px`;
});
