function initGTabs() {

    let GTabToggleAreas = document.querySelectorAll("[data-g-tab-target]");
    GTabToggleAreas.forEach((GTabToggleArea) => {
      var TargetArea = document.querySelector(
        GTabToggleArea.getAttribute("data-g-tab-target")
      );
      var GToggles = GTabToggleArea.querySelectorAll("[data-g-tab]");
      
      GToggles.forEach((GToggle) => {
      // if (!GToggle.classList.contains("active")){
      //   GToggles[0].classList.add("active");
      //   document.getElementById(GToggles[0].getAttribute("data-g-tab")).classList.add("show");
      // }
   
        GToggle.addEventListener("click", function (e) {
          e.target.classList.add("active");
          document.getElementById(e.target.getAttribute("data-g-tab")).classList.add("show");
  
        getSiblings(e.target).forEach((sibling) => {
           sibling.classList.remove("active");
           document.getElementById(sibling.getAttribute("data-g-tab")).classList.remove("show");
         });
  
        });
      });
    });
  }
  var GTabs = new initGTabs();
  