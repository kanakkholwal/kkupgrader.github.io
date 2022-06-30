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
    // Assign Id to select
    var SelectId = "";
    if (select.id != null || select.id === undefined || select.id === "") {
    var randomId = "form-select_" + Math.random().toString(16).slice(2);
    SelectId = randomId;
    } else {
      SelectId = select.id;
    }
    select.id = randomId;
  
    // Create Parent Wrapper
    let wrapper = `<div class="select-wrapper" id="form-select-wrapper_${
      SelectId.split("_")[1]
    }"></div>`;
    select.insertAdjacentHTML("beforebegin", wrapper);
    var Wrapper = document.getElementById(
      `form-select-wrapper_${SelectId.split("_")[1]}`
    );
  
    Wrapper.appendChild(select);
    Wrapper.style.minWidth = select.clientWidth + "px";
    select.className = "select-initialized";
    // Create a Input Toggle button
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "select-placeholder");
    input.setAttribute("id", `input-dropdown_${SelectId.split("_")[1]}`);
    input.setAttribute("role", "listbox");
    input.setAttribute("aria-popup", "false");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("readonly", "true");
    input.setAttribute("value", select.options[select.selectedIndex].value);
  
    Wrapper.insertAdjacentHTML("beforeend", input.outerHTML);
    Wrapper.insertAdjacentHTML("beforeend", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
    <path
        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
  </svg>`);
    // Add Icon to input element
   
  
    // Create DropDown
    var DropDown = document.createElement("div"),
      DropDownLIst = document.createElement("ul");
    DropDown.classList.add("select-dropdown");
    DropDown.id = `select-dropdown_${SelectId.split("_")[1]}`;
  
    DropDown.appendChild(DropDownLIst);
    Wrapper.appendChild(DropDown);
  
    for (var i = 0; i < select.options.length; i++) {
      var DropItem = document.createElement("li");
      DropItem.className = "select-drop-item";
      DropItem.innerText = select.options[i].innerText;
      DropItem.ariaSelected = "false";
  
      DropItem.setAttribute("value", select.options[i].value);
      if (
        select.options[i].value === select.options[select.selectedIndex].value
      ) {
        DropItem.ariaSelected = "true";
        DropItem.className += " active";
      }
      DropDownLIst.appendChild(DropItem);
    }
  
    // Toggle DropDown
    document.querySelectorAll(".select-placeholder").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.target.classList.add("active");
        e.target.setAttribute("aria-popup", "true");
        e.target.setAttribute("aria-expanded", "true");
        var TargetDropDownId = "select-dropdown_" + e.target.id.split("_")[1];
        var TargetDropDown = document.getElementById(TargetDropDownId);
        TargetDropDown.classList.add("show");
      });
      document.addEventListener("mouseup" , function (e){
        toggle.classList.remove("active");
        toggle.setAttribute("aria-popup", "false");
        toggle.setAttribute("aria-expanded", "false");
        document.getElementById("select-dropdown_" + toggle.id.split("_")[1]).classList.remove("show");
      })
    });
  
    // Inside DropDown
    DropDownLIst.querySelectorAll(".select-drop-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.target.classList.add("active");
        e.target.ariaSelected = "true";
  
        getSiblings(e.target).forEach((i) => {
          i.classList.remove("active");
          i.ariaSelected = "false";
        });
  
        var correspondingSelectId =
          "form-select_" + item.parentElement.parentElement.id.split("_")[1];
        var correspondingSelect = document.getElementById(correspondingSelectId);
        var correspondingInputId =
          "input-dropdown_" + item.parentElement.parentElement.id.split("_")[1];
        var correspondingInput = document.getElementById(correspondingInputId);
  
        for (var j = 0; j < correspondingSelect.options.length; j++) {
          if (
            correspondingSelect.options[j].getAttribute("selected") !==
              undefined ||
            correspondingSelect.options[j].getAttribute("selected") !== null
          ) {
            correspondingSelect.options[j].removeAttribute("selected");
          }
          if (
            correspondingSelect.options[j].value ===
            e.target.getAttribute("value")
          ) {
            correspondingSelect.options[j].toggleAttribute("selected");
            correspondingInput.setAttribute(
              "value",
              e.target.getAttribute("value")
            );
          }
        }
      });
    });
  });
  