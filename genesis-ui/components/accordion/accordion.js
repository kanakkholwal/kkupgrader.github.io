// Genesis Component : Accordion
const accordions = document.querySelectorAll(".g-accordion");
accordions.forEach((accordion) => {
  let multiple = accordion.getAttribute("accordion-multiple");
  let accordionItems = accordion.querySelectorAll(".g-accordion-item");
  accordionItems.forEach((accordionItem) => {
    let accordionHeader = accordionItem.querySelector(".g-accordion-header");
    let accordionBody = accordionItem.querySelector(".g-accordion-body");

    accordionHeader.addEventListener("click", function (e) {
      if (multiple === "false") {
        // Close Sibling Accordions
        var siblingsOfTargetAccordion = getSiblings(e.target.parentElement);
        siblingsOfTargetAccordion.forEach((sibling) => {
          sibling.classList.remove("expanded");
          sibling
            .querySelector(".g-accordion-header")
            .classList.remove("active");
 
            sibling.querySelector(".g-accordion-body").style.height = "0px";
            sibling.querySelector(".g-accordion-body").addEventListener(
              "transitionend",
              () => {
                sibling.querySelector(".g-accordion-body").classList.remove("active");
              },
              {
                once: false,
              }
            );  

          // SlideUp(sibling.querySelector(".g-accordion-body"), "active");
        });

        // Toggle Target Accordion
        e.target.parentElement.classList.toggle("expanded");
        e.target.classList.toggle("active");
        var currentBody =
          e.target.parentElement.querySelector(".g-accordion-body");


        // if (currentBody.classList.contains("active")) {
          if (currentBody.style.display == "block") {
               currentBody.style.height = "0px";
          currentBody.addEventListener(
            "transitionend",
            () => {
              currentBody.classList.remove("active");
              currentBody.removeAttribute("style");
            },
            {
              once: true,
            }
          ); // console.log(" class removed");
        } else {
          currentBody.classList.add("active");
          currentBody.style.height = "auto";

          var height = currentBody.clientHeight + "px";

          currentBody.style.height = "0px";

          setTimeout(() => {
            currentBody.style.height = height;
            currentBody.style.display = "block";
          }, 100);
          
          // console.log(" class added");
        }
        //  WHY IS THIS NOT WORKING 😭😭😭😭
        // GCollapse(currentBody);

        // console.log("Single Accordion Working");
      } else {
        accordionItem.classList.toggle("expanded");
        accordionHeader.classList.toggle("active");
        GCollapse(accordionBody);
        console.log("Multiple Accordion Working");
      }
    });
  });
});
