var small_devices = window.matchMedia('screen and (min-width: 40em)');

if (small_devices.matches) {
    // let parent = document.querySelector('.parent');

    // let togglerBtn = parent.querySelector('h5');
    // let togglerList = parent.querySelector('ul');
    // togglerBtn.addEventListener("click", function() {
    //     // togglerBtn.classList.toggle("show");
    //     togglerList.classList.toggle("show");
    // });


    // from https://codepen.io/codeorum/pen/JjGzMRQ?editors=0110

    function initAcc(elem, option) {
        document.addEventListener('click', function(e) {
            if (!e.target.matches(elem + ' .a-btn')) return;
            else {
                if (!e.target.parentElement.classList.contains('show')) {
                    if (option == true) {
                        var elementList = document.querySelectorAll(elem + ' .parent');
                        Array.prototype.forEach.call(elementList, function(e) {
                            e.classList.remove('show');
                        });
                    }
                    e.target.parentElement.classList.add('show');
                } else {
                    e.target.parentElement.classList.remove('show');
                }
            }
        });
    }

    initAcc('.parent', true);
}