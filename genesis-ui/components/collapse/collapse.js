function GCollapse(collapse) {
    if (!collapse.classList.contains('active')) {
        /** Show the collapse. */
        collapse.classList.add('active')
        collapse.style.height = "auto"

        var height = collapse.clientHeight + "px"


        collapse.style.height = "0px"


        setTimeout(() => {
            collapse.style.height = height
        }, 0)

    } else {
        collapse.style.height = "0px"

        collapse.addEventListener('transitionend', () => {
            collapse.classList.remove('active')
        }, {
            once: true
        })
    }

}
const collapseBtns = document.querySelectorAll('[data-g-collapse-target]');
collapseBtns.forEach(collapseBtn => {
    let collapseId = collapseBtn.getAttribute('data-g-collapse-target');
    let collapseArea = document.querySelector(collapseId);
    collapseBtn.addEventListener('click', () => GCollapse(collapseArea));
});