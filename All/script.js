"use strict";

const products = document.querySelector(".show-products");
const loading = document.querySelector("#loading");
const brand = document.querySelector("#brand");
const back = document.querySelector(".back");

loading.classList.remove("hidden");
getData();

async function getData() {
	const url = new URL(window.location.href);
	const id = Number(url.searchParams.get("id"));
	brand.textContent = url.searchParams.get("name");
	const res = await fetch("https://63501a98df22c2af7b637037.mockapi.io/shoes");
	const data = await res.json();
	if (id !== 0) {
		for (let i = (id - 1) * 10; i < id * 10; i++) {
			const html = `				
        <div id="p${i + 1}" class="p">
            <div class="pic"><img src=${data[i].image}/></div>
            <h3>${data[i].title}</h3>
            <p>$ ${data[i].price.toString().slice(0, 2)}.${data[i].price
				.toString()
				.slice(2, 4)}</p>
        </div>`;
			products.insertAdjacentHTML("beforeend", html);
		}
	} else {
		for (let i = 0; i < 90; i++) {
			const html = `				
        <div id="p${i + 1}" class="p">
            <div class="pic"><img src=${data[i].image}/></div>
            <h3>${data[i].title}</h3>
            <p>$ ${data[i].price.toString().slice(0, 2)}.${data[i].price
				.toString()
				.slice(2, 4)}</p>
        </div>`;
			products.insertAdjacentHTML("beforeend", html);
		}
	}
	loading.classList.add("hidden");
}

products.addEventListener("click", function (e) {
	if (
		e.target.classList.contains("pic") ||
		e.target.tagName === "IMG" ||
		e.target.tagName === "H3"
	) {
		window.open(
			`../Product/index.html?id=${e.target.closest(".p").id.slice(1)}`
		);
	}
});

back.addEventListener("click", function () {
	window.location = "../Home/index.html";
});
