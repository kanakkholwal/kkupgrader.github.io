const filter = document.getElementById("filter");
const regionList = Array.from(document.querySelectorAll("#region-list>li"));
const result = document.getElementById("result");
const search = document.getElementById("search");
const darkToggle = document.getElementById("dark-mode");
const restApi = "https://restcountries.com/v3.1/";
const getSiblings = (TargetNode) =>
  [...TargetNode.parentNode.children].filter(
    (siblings) => siblings !== TargetNode
  );

const defaultLength = 20;
// filter.parentElement.addEventListener("click", function (e) {
//   filter.classList.toggle("active");
// });

const loader = () => {
  result.innerHTML = '<div class="loader"></div>';
};
loader();
const GetResponse = async (Token, quantity) => {
  loader();
  await fetch(restApi + Token)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = data
        .slice(0, quantity)
        .map(
          (country) =>
            `<div class="card">
            <img src=${country.flags.svg} class="flags" />
            <div class="card-body">
               <h3>${country.name.common}</h3>
               <p> Population: ${country.population} </p>
               <p> Region: ${country.region} </p>
               <p> Capital: ${country.capital} </p>
            </div>
        </div>`
        )
        .join("");
    })

    .catch((err) => console.log(err));
};
const SwitchRegion = (region) => {
  filter.value = regionList.find((r) =>
    r.classList.contains("active")
  ).innerHTML;
  GetResponse("region/" + region, defaultLength);
};


GetResponse("all", defaultLength);

search.addEventListener("input", (e) => {
  if (search.value.length === 0) {
    GetResponse("all", defaultLength);

  } else {
    setTimeout(() => {
      console.log(restApi + "name/" + e.target.value);
      GetResponse("name/" + e.target.value, defaultLength);
    }, 500);
  }
});

regionList.forEach((region) => {
  region.addEventListener("click", (e) => {
    getSiblings(e.target).forEach((sibling) => {
      sibling.classList.remove("active");
    });
    e.target.classList.add("active");
    SwitchRegion(e.target.getAttribute("data-region"));
  });
});
darkToggle.addEventListener("click" , function () {
  document.body.classList.toggle("dark");
  darkToggle.querySelector("svg").setAttribute("stroke-width",darkToggle.querySelector("svg").getAttribute("stroke-width") === "1" ? "3" : "1");
})