// Get elements from html

var billInput = document.querySelector("#bill");
var peopleInput = document.querySelector("#people");
var error = document.querySelector(".people-error");
var tipBtns = document.querySelectorAll(".tip-btn");
var customInput = document.querySelector("#custom-tip");
var tipOutput = document.querySelector(".tip-per-person");
var totalOutput = document.querySelector(".total-per-person");
var resetBtn = document.querySelector("#reset");

// clear all inputs when page loads or user refresh

window.onload = function () {
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
};

// event listener and function for billInput

billInput.addEventListener("input", function () {
  bill = parseInt(billInput.value);
  resetBtn.style.opacity = "1";
  calculate();
});

// event listener and function for number of person input

peopleInput.addEventListener("input", function () {
  number = parseInt(peopleInput.value);
  resetBtn.style.opacity = "1";
  calculate();
});

// event listener and function for tip buttons click

tipBtns.forEach((tipBtn) => {
  tipBtn.addEventListener("click", handleClick);
});

function handleClick(event) {
  tipBtns.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
    if (event.target.value === tipBtn.value) {
      tipBtn.classList.add("active");
      tip = parseFloat(tipBtn.value);
    }
  });
  customInput.value = "";
  calculate();
}

// event listener and function for custom tip input

customInput.addEventListener("input", function () {
  tip = parseInt(customInput.value);
  resetBtn.style.opacity = "1";
  calculate();
});

// event listener and function for reset button

resetBtn.addEventListener("click", function () {
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  tipOutput.innerHTML = "0.00";
  totalOutput.innerHTML = "0.00";
  resetBtn.style.opacity = "0.2";
});

// Calculate tip and total amount function

function calculate() {
  if (number <= 0) {
    // check if number of people is less than or equal to 0 and show error, if true
    error.style.display = "block";
    peopleInput.style.border = "1px solid var(--color-error)";
  } else if (bill > 0 && number > 0 && tip > 0) {
    // check if all inputs are valid
    tipPerPerson = (bill * tip) / 100 / number; // tip amount per person
    totalPerPerson = (bill + (bill * tip) / 100) / number; // total amount per person

    tipOutput.innerHTML = tipPerPerson.toFixed(2); // display the tip amount per person in html
    totalOutput.innerHTML = totalPerPerson.toFixed(2); // display the total amount per person in html
    resetBtn.style.opacity = "1";
    error.style.display = "none";
    peopleInput.style.border = "";
  } else {
    // if any input is invalid, display zero for both outputs
    tipOutput.innerHTML = "0.00";
    totalOutput.innerHTML = "0.00";
  }
}
