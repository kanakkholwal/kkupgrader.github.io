class FormValidate {
  constructor(form) {
    if (typeof form === "object") {
      this.form = document.querySelector(form);
      this.inputs = form.querySelectorAll("input");
    } else {
      console.error("This is not a valid form");
    }
  }
  
}
