const RippleElement = document.querySelectorAll(".g-btn,.g-ripple");

RippleElement.forEach((element) => {
    element.onclick = function(e){
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        let ripple = document.createElement("span");
        ripple.classList.add("g-ripple-surface");
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        this.appendChild(ripple);

        setTimeout(function(){

          ripple.remove();
        }, 600); // 1second = 1000ms
      }

})
