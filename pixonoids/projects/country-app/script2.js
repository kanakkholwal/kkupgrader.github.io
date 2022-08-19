"use strict";

const filter = document.getElementById("filter");
const regionList = Array.from(document.querySelectorAll("#region-list>li"));
const result = document.getElementById("result");
const handle = document.getElementById("handles");
const search = document.getElementById("search");
const back = document.getElementById("back");
const darkToggle = document.getElementById("dark-mode");
const restApi = "https://restcountries.com/v3.1/";
const getSiblings = (TargetNode) =>
  [...TargetNode.parentNode.children].filter(
    (siblings) => siblings !== TargetNode
  );
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});
const defaultLength = 20;
filter.parentElement.addEventListener("click", function () {
  filter.classList.toggle("active");
});
back.addEventListener("click", function () {
  handle.classList.remove("active");
});

const loader = () => {
  result.innerHTML = '<div class="loader"></div>';
};
loader();
let response = {};
console.log("response");

const GetResponse = async () => {
  await fetch(restApi + "all")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      localStorage.setItem("response", JSON.stringify(data));
      console.log("Data Saved in local Storage");
    })
    .catch((err) => console.log(err));
};
if (response === {}) {
  GetResponse();
} else {
  response = JSON.parse(window.localStorage.getItem("response"));
  console.log("fetched from local storage");
  console.log(response);
}

// response.map((country) => console.log(country));
