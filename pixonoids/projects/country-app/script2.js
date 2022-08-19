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
darkToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  darkToggle
    .querySelector("svg")
    .setAttribute(
      "stroke-width",
      darkToggle.querySelector("svg").getAttribute("stroke-width") === "1"
        ? "3"
        : "1"
    );
});

let response = JSON.parse(window.localStorage.getItem("response"));
const GetResponse = async () => {
  await fetch(restApi + "all")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      localStorage.setItem("response", JSON.stringify(data));
      console.log("Data Saved in local Storage");
      response = JSON.parse(window.localStorage.getItem("response"));
      console.log(response);

    })
    .catch((err) => console.log(err))
}
if (response === null) {
  GetResponse();
} else {
  response = JSON.parse(window.localStorage.getItem("response"));
  console.log("fetched from local storage");
  console.log(response);
}

result.innerHTML = response
  .map(
    (country) =>
      `<div class="card" id=${country.cca3}>
            <img src=${country.flags.svg} class="flags" />
            <div class="card-body">
               <h3 class="name">${country.name.common}</h3>
               <p> Population: ${country.population} </p>
               <p> Region: ${country.region} </p>
               <p> Capital: ${country.capital} </p>
            </div>
        </div>`
  )
  .join("");

const SwitchRegion = (SwitchToRegion) => {
  result.innerHTML = response
    .filter(filterRegion => filterRegion.region === SwitchToRegion)
    .map(
      (country) =>
        `<div class="card" id=${country.cca3}>
    <img src=${country.flags.svg} class="flags" />
    <div class="card-body">
       <h3 class="name">${country.name.common}</h3>
       <p> Population: ${country.population} </p>
       <p> Region: ${country.region} </p>
       <p> Capital: ${country.capital} </p>
    </div>
</div>`
    )
    .join("");

}
regionList.forEach((region) => {

  region.addEventListener("click", (e) => {

    getSiblings(e.target).forEach((sibling) => sibling.classList.remove("active"));

    e.target.classList.add("active");

    SwitchRegion(e.target.dataset.region);

  });

});