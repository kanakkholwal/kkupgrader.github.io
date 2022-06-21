var searchJson = './testing.json';
fetch(searchJson)
    .then(function(response) {
        return response.json();
    })
    .then(function(search) {
        appendData(search);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });

function appendData(search) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < search.length; i++) {
        var div = document.createElement("li");
        div.innerHTML = '<a class="badge bg-primary">Name: ' + search[i].firstName + ' ' + search[i].lastName + '</a>';
        mainContainer.appendChild(div);
    }
}