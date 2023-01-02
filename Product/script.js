"use strict";

const img = document.querySelector(".pr-img img");
const title = document.querySelector(".title h2");
const des = document.querySelector(".des p");
const price = document.querySelector(".price div h3");
const loading = document.querySelector("#loading");
const color = document.querySelector(".color");
const size = document.querySelector(".size");
const quantity = document.querySelector(".quantity");
const count = document.querySelector("#count");
const addBtn = document.querySelector(".price button");

let activeColor = color.children[1].firstElementChild;
let activeSize = size.children[1].firstElementChild;
let fee;
let userId;
let productId;
let data;
let userData;

loading.classList.remove("hidden");
getData();

async function getData() {
	const url = new URL(window.location.href);
	productId = url.searchParams.get("id");
	userId = JSON.parse(localStorage.user).id;
	const userRes = await fetch(
		`https://63501a98df22c2af7b637037.mockapi.io/users/${userId}`
	);
	userData = await userRes.json();
	if (isInCart()) {
		addBtn.classList.remove("btn-active");
		addBtn.classList.add("btn-inactive");
	} else {
		addBtn.classList.add("btn-active");
		addBtn.classList.remove("btn-inactive");
	}
	const res = await fetch(
		`https://63501a98df22c2af7b637037.mockapi.io/shoes/${productId}`
	);
	data = await res.json();
	// console.log(data);
	img.src = data.image;
	title.textContent = data.title;
	des.textContent = data.description;
	price.textContent = ` $ ${data.price.toString().slice(0, 2)}.${data.price
		.toString()
		.slice(2, 4)}`;
	fee = Number(price.textContent.slice(2));
	// console.log(fee);
	loading.classList.add("hidden");
}

color.addEventListener("click", function (e) {
	if (e.target.closest(".show-color") !== null) {
		activeColor.firstElementChild.classList.add("hidden");
		e.target
			.closest(".show-color")
			.firstElementChild.classList.remove("hidden");
		activeColor = e.target.closest(".show-color");
	}
});

size.addEventListener("click", function (e) {
	if (e.target.closest(".show-size") !== null) {
		activeSize.classList.remove("active");
		e.target.closest(".show-size").classList.add("active");
		activeSize = e.target.closest(".show-size");
	}
});

quantity.addEventListener("click", function (e) {
	if (e.target.id === "plus") {
		count.textContent = Number(count.textContent) + 1;
		price.textContent = `$ ${(fee * Number(count.textContent)).toFixed(2)}`;
	} else if (e.target.id === "minus" && count.textContent !== "1") {
		count.textContent = Number(count.textContent) - 1;
		price.textContent = `$ ${(fee * Number(count.textContent)).toFixed(2)}`;
	}
});

addBtn.addEventListener("click", async function () {
	if (this.classList.contains("btn-active")) {
		loading.classList.remove("hidden");
		let arr = userData.cart;
		let obj = {
			id: data.id,
			color: window.getComputedStyle(activeColor).backgroundColor,
			size: activeSize.textContent,
			quantity: count.textContent,
		};
		arr.push(obj);
		await fetch(`https://63501a98df22c2af7b637037.mockapi.io/users/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				cart: arr,
			}),
		});
		addBtn.classList.remove("btn-active");
		addBtn.classList.add("btn-inactive");
		loading.classList.add("hidden");
	}
});

function isInCart() {
	for (let i = 0; i < userData.cart.length; i++) {
		if (userData.cart[i].id === productId) return true;
	}
	return false;
}
