document
  .querySelectorAll("input[type=color].form-color")
  .forEach(function (picker) {
    var targetLabel = document.querySelector('label[for="' + picker.id + '"]'),
      codeArea = document.createElement("span");

    codeArea.innerHTML = picker.value;
    targetLabel.appendChild(codeArea);

    picker.addEventListener("input", function () {
      codeArea.innerHTML = picker.value;
      targetLabel.appendChild(codeArea);
    });
  });

document
  .querySelectorAll("input[type=range].form-range")
  .forEach(function (range) {
    var targetLabel = document.querySelector(
        'label[for="' + range.id + '"].form-range-label'
      ),
      RangeValue = document.createElement("span");
    RangeValue.innerHTML = range.value;
    targetLabel.appendChild(RangeValue);
    function updateValue() {
      RangeValue.innerHTML = range.value;
      targetLabel.appendChild(RangeValue);
    }
    range.addEventListener("input", updateValue);
  });

document.querySelectorAll("select.form-select").forEach((select) => {
  var SelectId = "";
  if (select.id != null || select.id === undefined || select.id === "") {
    var randomId = "form-select" + Math.random().toString(16).slice(2);
    SelectId = randomId;
  } else {
    SelectId = select.id;
  }
  console.log("Select id created: " + SelectId);
  let wrapper = `<div class="select-wrapper" id="${SelectId}_wrapper"></div>`;
  select.insertAdjacentHTML("beforebegin", wrapper);
  console.log("Select wrapper created: " + wrapper);
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "select-placeholder");
  input.setAttribute("role", "listbox");
  input.setAttribute("aria-haspopup", "false");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("readonly", "true");

});
