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
      // console.log(data);

      var fetchedData = data;
      var requiredData = fetchedData.slice(0, quantity);
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
        console.log(Object.values(currentCountryArray.borders));
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
               <p><span><strong>Native Name :</strong>${
                 Object.values(currentCountryArray.name.nativeName)[0].common
               }</span><span><strong>Top Level Domain :</strong>${
            currentCountryArray.tld
          }</span>  </p>
               <p><span><strong>Population :</strong>${
                 currentCountryArray.population
               }</span><span><strong>Currencies :</strong>${
            Object.values(currentCountryArray.currencies)[0].name
          }</span>  </p>
               <p><span><strong>Region :</strong>${
                 currentCountryArray.region
               }</span><span><strong>Languages :</strong>${Object.values(
            currentCountryArray.languages
          )
            .map((language) => `${language}`)
            .join(",")}</span>  </p>
               <p><span><strong>Sub Region :</strong>${
                 currentCountryArray.subregion
               } </span>  </p>
               <p><span><strong> Capital :</strong>${
                 currentCountryArray.capital
               }</span>  </p>

               <div class="border-details">
            Border Countries : ${
              // console.log(Object.values(currentCountryArray.borders));
              fetchedData.filter((match) => {
                let matched = {};
                Object.values(currentCountryArray.borders).forEach((border) => {
              
                  if(match.cca3 === border)
                  {
                    Object.assign(matched,match)
                    console.log(matched);
                  }
                });
              }).map((matched) => {
                console.log(matched);
                `${matched.name.common}`;
              })
            
            }
               </div>
            </div>
        </div>
        `;
        }, 200);
      };
  // fetchedData
              //   .filter((match) => {
              //     if (match.borders)           
              //         return match.cca3 == Object.values(currentCountryArray.borders);
              //   })
              //   .map((matched) => {
              //     `${matched}`;
              //     console.log(matched);
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
