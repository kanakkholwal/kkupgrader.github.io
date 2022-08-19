"use strict";

const title = document.title;
const filter = document.getElementById("filter");
let regionList = Array.from(document.querySelectorAll("#region-list>li"));
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
// Object to Array
const ObjectToArray = (obj) =>
  Object.keys(obj).map((key) => [Number(key), obj[key]]);

const childOfChildOfObject = (obj) => Object.values(Object.values(obj))[0];
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
let dataFetched = false;

const GetResponse = async () => {
  await fetch(restApi + "all")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      localStorage.setItem("response", JSON.stringify(data));
      console.log("Data Saved in local Storage");
      response = JSON.parse(window.localStorage.getItem("response"));
      console.log(response);
      dataFetched = true;
      console.log("Data Fetched !!!");
      StartApp();


    })
    .catch((err) => console.log(err))
}
if (response === null) {
  GetResponse();
} else {
  response = JSON.parse(window.localStorage.getItem("response"));
  console.log("fetched from local storage");
  console.log(response);
  dataFetched = true;
  console.log("Data Fetched !!!");
  StartApp();
}

function StartApp() {
  // Defaults Add all Data
  const defaultData = () => {
    document.title = title;
    result.innerHTML = response
      .map(
        (country) =>
          `<div class="card" id=${country.cca3}>
          <img src=${country.flags.svg} class="flags" alt=${country.name.common} />
          <div class="card-body">
             <h3 class="name">${country.name.common}</h3>
             <p> Population: ${country.population} </p>
             <p> Region: ${country.region} </p>
             <p> Capital: ${country.capital} </p>
          </div>
      </div>`
      )
      .join("");
    handle.classList.remove("active");

  }

  defaultData();
  //  CanViewData
  const CanViewData = () => {
    let countries = document.querySelectorAll(".card");
    countries.forEach((card) => {
      card.addEventListener("click", (e) => {
        if (card.contains(e.target)) {
          getSiblings(card).forEach((sibling) => {
            sibling.classList.remove("open");
          });
          // console.log(card);
          card.classList.add("open");
          setTimeout(() => {
            SetCurrentCountry(card.id);
          }, 100);
        }

      });
    });
  }
  CanViewData();
  //  Switch Region
  const SwitchRegion = (SwitchToRegion) => {
    if (SwitchToRegion !== "WorldWide") {
      result.innerHTML = response
        .filter(filterRegion => filterRegion.region === SwitchToRegion)
        .map(
          (country) =>
            `<div class="card" id=${country.cca3}>
      <img src=${country.flags.svg} class="flags"  alt=${country.name.common}/>
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
    else {
      result.innerHTML = response
        .map(
          (country) =>
            `<div class="card" id=${country.cca3}>
        <img src=${country.flags.svg} class="flags"  alt=${country.name.common}/>
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
    filter.value = SwitchToRegion;
    CanViewData();
    handle.classList.remove("active");

  }
  regionList.forEach((region) => {
    region.addEventListener("click", (e) => {
      getSiblings(e.target).forEach((sibling) => { sibling.classList.remove("active"), sibling.classList.remove("hidden") });
      e.target.classList.add("active");
      SwitchRegion(e.target.dataset.region);
    });

  });
  // searchCountry
  search.addEventListener("input", (e) => {
    if (e.target.value.length === 0) {
      defaultData();
    } else {
      document.title = `${e.target.value} || Searching in ${title}`;

      // Debounce the search
      setTimeout(() => {
        result.innerHTML = response
          .filter((searchCountry) => searchCountry.name.common.toLowerCase().includes(e.target.value.toLowerCase()) || searchCountry.name.official.toLowerCase().includes(e.target.value.toLowerCase()) || searchCountry.cca3.toLowerCase().includes(e.target.value.toLowerCase()))
          .map(
            (country) =>
              `<div class="card" id=${country.cca3}>
        <img src=${country.flags.svg} class="flags"  alt=${country.name.common}/>
        <div class="card-body">
        <h3 class="name">${country.name.common}</h3>
                 <p> Population: ${country.population} </p>
                 <p> Region: ${country.region} </p>
                 <p> Capital: ${country.capital} </p>
                 </div>
                 </div>`
          )
          .join("");
        CanViewData();

      }, 500);

    }
  });
  // Open Country Data
  function borderCountries(borders, data) {
    if (borders === null || borders === undefined) {
      return "No Border Countries.";
    }
    else {

      let BorderedCountries = {};

      Object.values(borders).forEach((each) => {
        Object.assign(
          BorderedCountries,
          Object.filter(data, (country) => country.cca3 === each)
        );
      });
      BorderedCountries = ObjectToArray(BorderedCountries);
      // console.log(typeof BorderedCountries);
      // console.log(BorderedCountries);


      return BorderedCountries.map((array) => {
        array.shift();
        // console.log(childOfChildOfObject(array).name.common);
        return `<span id="${childOfChildOfObject(array).cca3}">${childOfChildOfObject(array).name.common}</span>`;
      }).join('');
    }
  }
  const SetCurrentCountry = (cardId) => {

    let currentCountry = response.filter((country) => country.cca3 === cardId)[0];
    document.title = `${currentCountry.name.common} -- ${title}`;

    // console.log(currentCountry.cca3);
    handle.classList.add("active");
    result.innerHTML =
      ` <div class="country-info">
       <div class="country-image">
          <img src=${currentCountry.flags.svg} class="country-flag"  alt=${currentCountry.name.common}/>
       </div>
       <div class="country-details">  
          <h3> 
             ${currentCountry.name.common}
          </h3>
          <p>
            <span>
               <strong>Native Name :</strong>
                 ${Object.values(currentCountry.name.nativeName)[0].common}
           </span>
           <span>
                <strong>Top Level Domain :</strong>
                  ${currentCountry.tld}
           </span> 
          </p>
         <p>
           <span>
            <strong>Population :</strong>
              ${currentCountry.population}
           </span>
           <span>
            <strong>Currencies :</strong>
              ${Object.values(currentCountry.currencies)[0].name}
           </span>  
         </p>
         <p>
           <span>
            <strong>Region :</strong>
              ${currentCountry.region} 
           </span>
           <span>
            <strong>Languages :</strong>
              ${Object.values(currentCountry.languages)
        .map((language) => `${language}`)
        .join(",")}
           </span> 
         </p>
         <p>
           <span>
            <strong>Sub Region :</strong>
              ${currentCountry.subregion} 
            </span> 
         </p>
         <p>
            <span>
             <strong> Capital :</strong>
               ${currentCountry.capital}
            </span>
         </p>
         <div class="border-details">
            
              <strong>Border Countries </strong> :
               ${borderCountries(currentCountry.borders, response)} 
         </div>
  
        </div>
      </div>
    `;
    document.querySelectorAll(".border-details>span").forEach((gotoCountry) => {
      gotoCountry.addEventListener("click", (e) => {
        if (gotoCountry.contains(e.target)) {
          getSiblings(gotoCountry).forEach((sibling) => {
            sibling.classList.remove("open");
          });
          // console.log(card);
          gotoCountry.classList.add("open");
          setTimeout(() => {
            SetCurrentCountry(gotoCountry.id);
          }, 100);
        }

      });
    })
  }
  // Back To Home Button
  back.addEventListener("click", () => {
    defaultData();
    CanViewData();
  });
  document.querySelector(".nav-title").addEventListener("click", () => {
    defaultData();
    CanViewData();
  });

  // Pagination
  const Pagination = () => {
    defaultData();
    CanViewData();
    let limit = 25;
const pagination = document.getElementById("pagination");
    var cards = document.querySelectorAll(".card");
    console.log("Cards: " + cards.length/limit+ " " + pagination);
    
  }
  Pagination();
}