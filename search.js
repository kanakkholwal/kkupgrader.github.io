var list = document.getElementById('list-here');

function createElement(name, imgSrc, location) {
    var element = document.createElement('div');
    var heading = document.createElement('h3');
    heading.innerText = name;
    var img = document.createElement('time');
    img.height = 40;
    img.innerHTML = imgSrc;
    var para = document.createElement('p');
    para.innerText = location;
    element.appendChild(heading);
    element.appendChild(img);
    element.appendChild(para);
    list.appendChild(element);
}

function fromAPi() {
    var http = new XMLHttpRequest();
    http.open("GET", "./search.json", true);
    http.send();
    http.onreadystatechange = function() {
        if (this.readyState == 4) {

            if (this.status == 200) {
                // console.log(http.responseText);
                var SearchJson = JSON.parse(this.responseText);

                console.log(SearchJson);
                for (var i = 0; i < SearchJson.length; ++i) {
                    // list.appendChild(createElement(SearchJson[i].name, SearchJson[i].image, SearchJson[i].location));
                    createElement(SearchJson[i].name, SearchJson[i].image, SearchJson[i].location);
                }
            }
        }
    }
}
fromAPi();
// var SearchJson = JSON.parse(insertData.responseText);
// insertData.onreadystatechange = function() {
//     if (this.readyState == 4) {

//         if (this.status == 200) {


//             for (var i = 0; i < SearchJson.length; ++i) {
//                 list.appendChild(createElement(SearchJson[i].tile, SearchJson[i].id, SearchJson[i].userId));
//             }

//         }
//     }
// }