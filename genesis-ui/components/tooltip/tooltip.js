const GenesisTooltips = document.querySelectorAll("[data-g-tooltip-title]");
GenesisTooltips.forEach((GenesisTooltip) => {
  let HTML = GenesisTooltip.innerHTML;
  GenesisTooltip.addEventListener("mouseenter", function (e) {
    var GenesisTooltipElement = document.createElement("span");
    GenesisTooltipElement.classList.add("g-tooltip");
    var GenesisTooltipPlacement = e.target.getAttribute(
      "data-g-tooltip-placement"
    );
    var GenesisTooltipTitle = e.target.getAttribute("data-g-tooltip-title");
    GenesisTooltipElement.classList.add(`g-tooltip-${GenesisTooltipPlacement}`);
    GenesisTooltipElement.innerHTML += GenesisTooltipTitle;

    e.target.appendChild(GenesisTooltipElement);
    console.log("tooltip added");
  });
  GenesisTooltip.addEventListener("mouseleave", function () {
    GenesisTooltip.innerHTML = HTML;
    console.log("tooltip removed");
  });
});