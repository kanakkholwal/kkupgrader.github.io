
const OpenFullScreenBtn = document.getElementById('fullScreenToggle');
const ExitFullScreenBtn = document.getElementById('exitFullscreen');
const SliderToggle = document.getElementById('SliderToggle');
const comparisonSections = document.querySelectorAll('.comparison-section');





comparisonSections.forEach((section) => {
    section.querySelector('.slider').addEventListener('input', (e) => {
        section.style.setProperty('--position', `${e.target.value}%`);
    });

    section.querySelector('.before-image').height = section.querySelector('.after-image').height;
    section.querySelector('.image-container').style.height = section.querySelector('.after-image').clientHeight + 'px';
    window.addEventListener('resize', () => {
        section.querySelector('.image-container').style.height = "auto";
        section.querySelector('.after-image').style.height = "auto";
        section.querySelector('.before-image').height = section.querySelector('.after-image').height;

        // setTimeout(() => {
        // section.querySelector('.before-image').height = section.querySelector('.after-image').clientHeight  ;
        section.querySelector('.image-container').style.height = section.querySelector('.after-image').clientHeight + 'px';
        section.querySelector('.after-image').style.height = "100%";

        // }, 0);
    });

    const HidableElements = [section.querySelector('.controls-container'), section.querySelector('.before-image ')];
    SliderToggle.addEventListener("click", () => {
        HidableElements.forEach((element) => element.classList.toggle('hidden'), section.style.setProperty('--position', `50%`));
    });
    section.querySelector('.beforeShow').onclick = () => { section.style.setProperty('--position', `100%`); }
    section.querySelector('.afterShow').onclick = () => { section.style.setProperty('--position', `0%`); }
    fullScreenToggle.addEventListener("click", () => {

    });
    OpenFullScreenBtn.addEventListener("click", () => {
        if (section.requestFullscreen) {
            section.requestFullscreen();
        } else if (section.webkitRequestFullscreen) { /* Safari */
            section.webkitRequestFullscreen();
        } else if (section.msRequestFullscreen) { /* IE11 */
            section.msRequestFullscreen();
        }
    
    });
    ExitFullScreenBtn.addEventListener("click", () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }

    });

});
