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
// Object Filter
// predicate is a function returns boolean value
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});
// Object to Array
const ObjectToArray = (obj) =>
  Object.keys(obj).map((key) => [Number(key), obj[key]]);

const childOfChildOfObject = (obj) => Object.values(Object.values(obj))[0];

function borderCountries(borders, data) {
  if (borders === null || borders === undefined) {
    return "No Border Countries.";
  }
  else {
F
    let BorderedCountries = {};

    Object.values(borders).forEach((each) => {
      Object.assign(
        BorderedCountries,
        Object.filter(data, (country) => country.cca3 === each)
      );
    });
    BorderedCountries = ObjectToArray(BorderedCountries);
    console.log(typeof BorderedCountries);
    console.log(BorderedCountries);


    return BorderedCountries.map((array) => {
      array.shift();
      console.log(childOfChildOfObject(array).name.common);
      return childOfChildOfObject(array).name.common;
    });
  }
}
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
const GetResponse = async (Token, quantity) => {
  loader();
  handle.classList.remove("active");
  await fetch(restApi + Token)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let fetchedData = data;
      let requiredData = fetchedData.slice(0, quantity);
      // console.log(requiredData);
      result.innerHTML = requiredData
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
      let countries = document.querySelectorAll(".card");
      const SetCurrentCountry = () => {
        let currentCountryCard = Array.from(countries).filter((country) =>
          country.classList.contains("open")
        );
        let currentCountryArray = requiredData.filter(
          (currentCountry) => currentCountry.cca3 === currentCountryCard[0].id
        )[0];
        // console.log(currentCountryArray);
        // console.log(Object.values(currentCountryArray.borders));
        // console.log(currentCountryArray);
        loader();
        handle.classList.add("active");

        setTimeout(() => {
          result.innerHTML = `
         <div class="country-info">
            <div class="country-image">
               <img src=${currentCountryArray.flags.svg} class="country-flag" />
            </div>
            <div class="country-details">  
               <h3> ${currentCountryArray.name.common}</h3>
               <p><span><strong>Native Name :</strong>${Object.values(currentCountryArray.name.nativeName)[0].common
            }</span><span><strong>Top Level Domain :</strong>${currentCountryArray.tld
            }</span>  </p>
               <p><span><strong>Population :</strong>${currentCountryArray.population
            }</span><span><strong>Currencies :</strong>${Object.values(currentCountryArray.currencies)[0].name
            }</span>  </p>
               <p><span><strong>Region :</strong>${currentCountryArray.region
            }</span><span><strong>Languages :</strong>${Object.values(
              currentCountryArray.languages
            )
              .map((language) => `${language}`)
              .join(",")}</span>  </p>
               <p><span><strong>Sub Region :</strong>${currentCountryArray.subregion
            } </span>  </p>
               <p><span><strong> Capital :</strong>${currentCountryArray.capital
            }</span>  </p>

               <div class="border-details">
            <strong>Border Countries </strong> : ${borderCountries(currentCountryArray.borders, fetchedData)}
              </div>
              </div>
              </div>
              `;
        }, 200);
      };
      // fetchedData
      // (Object.values(currentCountryArray.borders).forEach((each) => {
      //   Object.assign(
      //     BorderedCountries,
      //     Object.filter(fetchedData, (country) => country.cca3 === each)
      //   );
      // }),
      // // `${typeof Object.values(BorderedCountries)}`
      // console.log(Object.values(BorderedCountries).capital))

      // // return BorderedCountries.map((borderCountry) => console.log(borderCountry));
      // // })()
      //   .filter((match) => {
      //     if (match.borders)
      //         return match.cca3 == Object.values(currentCountryArray.borders);
      //   })
      // .map((matched) => `<span>${matched.name.common}</span>`).join('')
      countries.forEach((card) => {
        card.addEventListener("click", (e) => {
          if (card.contains(e.target)) {
            getSiblings(card).forEach((sibling) => {
              sibling.classList.remove("open");
            });
            card.classList.add("open");
          }
          setTimeout(() => {
            SetCurrentCountry();
          }, 100);
        });
      });
    })
    .catch((err) => console.log(err));
};
const SwitchRegion = (region) => {
  filter.value = regionList.find((r) =>
    r.classList.contains("active")
  ).innerHTML;
  filter.classList.remove("active");
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
    filter.classList.remove("active");

    SwitchRegion(e.target.getAttribute("data-region"));
    // filter.classList.remove("active");
  });
});
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

// To to Country
