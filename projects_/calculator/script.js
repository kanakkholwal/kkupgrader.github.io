let input = document.getElementById("input");
let del = document.getElementById("del"),
  ac = document.getElementById("ac"),
  result = document.getElementById("result"),
  alertLabel = document.querySelector(".input_area label");
let output = "";

document.querySelectorAll("[data-text]").forEach((btn) => {
  btn.onclick = (e) => {
    input.value += e.target.getAttribute("data-text");
  };
});
document.querySelectorAll("[data-command]").forEach((btn) => {
  btn.onclick = (e) => {
    if (input.value === "") {
      return false;
    } else {
      var operatorsTypes = e.target.getAttribute("data-command");

      input.value += e.target.getAttribute("data-command");
      output += " " + operatorsTypes;
    }
  };
});

result.onclick = () => {
  if (input.value === "") {
    input.classList.add("danger");
    alertLabel.classList.add("danger");
    alertLabel.innerHTML = "Please enter some expression!!!";
    input.value = "";
    input.placeholder = "Please Enter Some Expression";
  } else {
    input.classList.remove("danger");
    input.classList.remove("warning");
    alertLabel.classList.remove("danger");
    alertLabel.classList.remove("warning");

    input.value = eval(input.value);
  }
};
document.addEventListener("keyup", (e) => {
  console.log(e.key);
  var validKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  if (validKeys.indexOf(e.key) < 0) {
    input.classList.add("danger");
    alertLabel.classList.add("danger");
    alertLabel.innerHTML = "Enter only Numeric Value";
    return false;
  } else {
    input.focus();
    input.classList.remove("danger");
    input.classList.remove("warning");
    alertLabel.classList.remove("danger");
    alertLabel.classList.remove("warning");
    alertLabel.innerHTML = "Please Enter Some Expression";
  }
});
input.onkeyup = (e) => {
  // console.log(e.key);

  switch (e.key) {
    case "Enter":
      if (input.value === "") {
        input.classList.add("danger");
        alertLabel.classList.add("danger");
        alertLabel.innerHTML = "Please enter some expression!!!";
        input.value = "";
        input.placeholder = "Please Enter Some Expression";
      } else {
        input.classList.remove("danger");
        input.classList.remove("warning");
        alertLabel.classList.remove("danger");
        alertLabel.classList.remove("warning");
    
        input.value = eval(input.value);
      }
            break;
    case "Backspace":
      input.value = input.value.toString().slice(0, -1);
      break;
  }
  if (input.value === "") {
    input.classList.remove("danger");
    input.classList.remove("warning");
    alertLabel.classList.remove("danger");
    alertLabel.classList.remove("warning");
  }
};

ac.onclick = () => {
  input.value = "";
  output = "";
  console.clear();
  if (input.value === "") {
    input.classList.remove("danger");
    input.classList.remove("warning");
    alertLabel.classList.remove("danger");
    alertLabel.classList.remove("warning");
  }
};
del.onclick = () => {
  input.value = input.value.toString().slice(0, -1);
  if (input.value === "") {
    input.classList.remove("danger");
    input.classList.remove("warning");
    alertLabel.classList.remove("danger");
    alertLabel.classList.remove("warning");
  }
};

// darkMode
document.getElementById("darkMode").onclick = (e) => {
  document.body.setAttribute("data-theme", e.target.checked ? "dark" : "light");
  localStorage.setItem("data-theme", e.target.checked ? "dark" : "light");
};
window.onload = () => {
  let theme = localStorage.getItem("data-theme");
  if (theme === "light") {
    document.body.setAttribute("data-theme", "light");
    document.getElementById("darkMode").checked = false;
  }
  else if (theme === "dark"){
    document.body.setAttribute("data-theme", "dark");
    document.getElementById("darkMode").checked = true;
  }
}
