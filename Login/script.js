"use strict";

const signInBtn = document.querySelector(".main-container button");
const email = document.querySelector(".main-container #email");
const password = document.querySelector(".main-container #password");
const remember = document.querySelector(".main-container #remember");
const loading = document.querySelector("#loading");
const failure = document.querySelector("#failure");
const page1 = document.querySelector(".page1-cont");
const page2 = document.querySelector(".page2-cont");
const page3 = document.querySelector(".page3-cont");
const page4 = document.querySelector(".page4-cont");
const page5 = document.querySelector(".page5-cont");
const mainCont = document.querySelector(".main-container");
const nextBtn1 = document.querySelector("#next-btn1");
const nextBtn2 = document.querySelector("#next-btn2");
const nextBtn3 = document.querySelector("#next-btn3");

let success;

setTimeout(() => {
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
  setTimeout(() => {
    page2.classList.add("hidden");
    page3.classList.remove("hidden");
  }, 5000);
}, 3000);

nextBtn1.addEventListener("click", function () {
  page3.classList.add("hidden");
  page4.classList.remove("hidden");
});

nextBtn2.addEventListener("click", function () {
  page4.classList.add("hidden");
  page5.classList.remove("hidden");
});

nextBtn3.addEventListener("click", function () {
  page5.classList.add("hidden");
  mainCont.classList.remove("hidden");
});

if (localStorage.auto !== undefined) {
  const obj = JSON.parse(localStorage.auto);
  email.value = obj.email;
  password.value = obj.password;
  signInBtn.classList.remove("btn-inactive");
  signInBtn.classList.add("btn-active");
}

signInBtn.addEventListener("click", async function () {
  if (!this.classList.contains("btn-inactive")) {
    success = false;
    loading.classList.remove("hidden");
    const res = await fetch(
      "https://63501a98df22c2af7b637037.mockapi.io/users"
    );
    const data = await res.json();
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].email === email.value &&
        data[i].password === password.value
      ) {
        if (remember.checked) {
          localStorage.setItem(
            "auto",
            JSON.stringify({ email: email.value, password: password.value })
          );
        }
        success = true;
        localStorage.setItem("user", JSON.stringify(data[i]));
        loading.classList.add("hidden");
        window.location = "../home.html";
      }
    }
    if (!success) {
      loading.classList.add("hidden");
      failure.classList.remove("hidden");
      setTimeout(() => {
        failure.classList.add("hidden");
      }, 2000);
    }
    // console.log("Not Registered!!!");
    // console.log(localStorage);
  }
});

email.addEventListener("input", btnActivation);
password.addEventListener("input", btnActivation);

function btnActivation() {
  if (
    (email.value === "" || password.value === "") &&
    signInBtn.classList.contains("btn-active")
  ) {
    signInBtn.classList.add("btn-inactive");
    signInBtn.classList.remove("btn-active");
  } else if (
    email.value !== "" &&
    password.value !== "" &&
    signInBtn.classList.contains("btn-inactive")
  ) {
    signInBtn.classList.remove("btn-inactive");
    signInBtn.classList.add("btn-active");
  }
}
