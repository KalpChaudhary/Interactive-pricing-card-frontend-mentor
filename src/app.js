"use strict";

const inputSlider = document.querySelector("#slider");
const progressBar = document.querySelector(".progressBar");
const progressBtn = document.querySelector(".progressBtn");

const pageViews = document.querySelector(".pageViews");
const priceBox = document.querySelector("#priceBox");

const toggleSwitch = document.querySelector(".switch");
const myCheck = document.querySelector("#myCheck");

const discount = document.querySelector(".discount");

const values = [10, 50, 100, 500, 1000];
const cost = [8, 12, 16, 24, 36];
let rangeVal = 2;
let checked = false;

inputSlider.oninput = function () {
  rangeVal = this.value;

  let percent = rangeVal * 25;

  updateProgress(percent);
  updatePageViews(rangeVal);

  checked
    ? updateCostPerViewsYearly(rangeVal)
    : updateCostPerViewsMonthly(rangeVal);
};

//? Updating progress bar/btn on selecting views
const updateProgress = function (percent) {
  progressBar.style.width = `${percent}%`;
  progressBtn.style.left = `${percent}%`;
};

//?Updating pageviews on slide
const updatePageViews = function (val) {
  pageViews.innerHTML =
    values[val] >= 1000
      ? `${values[val] / 1000}M pageviews`
      : `${values[val]}k pageviews`;
};

//? If checked is false them update monthly subscriptions cost
const updateCostPerViewsMonthly = function (val) {
  checked = false;
  const markup = `
  <h1>$${cost[val].toFixed(2)} <span class="time-period">/month</span></h1>
  `;
  priceBox.innerHTML = "";
  priceBox.insertAdjacentHTML("afterbegin", markup);
};

//? If checked is true them update yearly subscriptions cost

const updateCostPerViewsYearly = function (val) {
  checked = true;
  const markup = `
  <h1>$${(cost[val] - cost[val] * 0.25).toFixed(
    2
  )} <span class="time-period">/month</span></h1>
  `;
  priceBox.innerHTML = "";
  priceBox.insertAdjacentHTML("afterbegin", markup);
};

//? toggle checked
//* Call both monthly and yearly functions so price will be changed as user toggle

myCheck.addEventListener("change", function (e) {
  e.target.checked
    ? updateCostPerViewsYearly(rangeVal)
    : updateCostPerViewsMonthly(rangeVal);
});

//? Change text when price card is at its max length
const updateDiscountText = function () {
  discount.innerHTML = window.screen.width >= 670 ? "-25% discount" : "-25%";
};

//? Listen to window size changes and call updateDiscountText fn
window.addEventListener("resize", updateDiscountText);

//? We also need to call updateDiscountText fn so even user reloads the page it shoud change the text .
const init = function () {
  updateDiscountText();
};

init();
