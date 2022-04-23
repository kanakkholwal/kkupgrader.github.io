const ModalToggles = document.querySelectorAll('[data-target-modal]');
ModalToggles.forEach(ModalToggle => {
    let ModalTarget = ModalToggle.getAttribute('data-target-modal');
    let ModalId = document.querySelector(ModalTarget);
    let ModalArea = ModalId.parentElement;
    let ModalClose = ModalId.querySelector('.modal-close');

    ModalToggle.addEventListener('click', () => ModalArea.classList.add('open'));
    ModalClose.addEventListener('click', () => ModalArea.classList.remove('open'));

    ModalArea.addEventListener('mouseup', function(e) {
        if (!ModalId.contains(e.target)) {
            ModalArea.classList.remove('open');
        }
    });
});