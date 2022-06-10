
const ModalToggles = document.querySelectorAll("[data-target-modal]");
ModalToggles.forEach((ModalToggle) => {
  let ModalTarget = ModalToggle.getAttribute("data-target-modal");
  let ModalId = document.querySelector(ModalTarget);
  let ModalArea = ModalId.parentElement;
  let ModalClose = ModalId.querySelector(".modal-close");

  ModalToggle.addEventListener("click", () => {
    ModalArea.classList.add("open");
    ModalId.classList.add("show");

  });
  ModalClose.addEventListener("click", () => {
    setTimeout(() => {
      ModalArea.classList.remove("open");
    },600);
    ModalId.classList.remove("show");
  });

  ModalArea.addEventListener("mouseup", function (e) {
    if (!ModalId.contains(e.target)) {
      setTimeout(() => {
        ModalArea.classList.remove("open");
      },600);
            ModalId.classList.remove("show");
        }
  });
});
