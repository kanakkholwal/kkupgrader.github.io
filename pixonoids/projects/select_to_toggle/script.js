const select = document.querySelector('#select');



let ids = select.options[select.selectedIndex].value;
let div = document.querySelector('div');



if (div.id === ids) {
    this.style.display = 'block';
}
if (!div.id === ids) {
    this.style.display = 'none';
}