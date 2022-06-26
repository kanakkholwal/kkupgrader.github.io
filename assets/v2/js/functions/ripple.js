import * as domFunctions from "./dom/dom-engine";

function AddRippleEffect(element) {
    if(sDomEntity(document.querySelectorAll(element)) && isExist(document.querySelectorAll(element))) {
        
        document.querySelectorAll(element).forEach((el) => {
            el.addEventListener("click", (e) => {
              var RippleElement = document.createElement("div");
              RippleElement.className = "ripple";
              e.target.appendChild(RippleElement);
              e = e.touches ? e.touches[0] : e;
              const r = el.getBoundingClientRect(),
                d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
              RippleElement.style.cssText = `--s: 0; --o: 1;`;
              RippleElement.offsetTop;
              RippleElement.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
                e.clientX - r.left
              }; --y:${e.clientY - r.top};`;
              setTimeout(function () {
                RippleElement.remove("ripple");
              }, 600);
            });
          });
    }
}
// Ripple Effect
AddRippleEffect(".ripple-effect");
