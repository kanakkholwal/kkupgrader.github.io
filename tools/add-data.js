var WebTools = document.getElementById('web-tools');

function createToolDiv(Name, imageSrc, Directory, description) {
    var ToolDiv = document.createElement('div');
    ToolDiv.className = 'col-sm-6 col-md-5 col-lg-4';
    ToolDiv.innerHTML = `<div class="card m-auto">
    <div class="card-body text-center">
        <div class="bg-image mb-3 ripple rounded shadow-5" data-mdb-ripple-color="light">
            <img data-src="${imageSrc}" class="img-fluid rounded" alt="${Name}" />
            <a href="${Directory}">
                <div class="mask"></div>
            </a>
        </div>
        <h4 class="card-title">${Name}</h4>
        <p class="card-text ellipsis-2">
        ${description} 
        </p>
        <div class="d-flex justify-content-center">
            <a role="button" href="${Directory}" class="btn btn-primary w-auto btn-rounded mx-2">Use This Tool
            </a>
        </div>
    </div>
</div>`;
    list.appendChild(ToolDiv);
}
document.addEventListener('DOMContentLoaded', function() {
    (function() {
        var http = new XMLHttpRequest();
        http.open("GET", "tools.json", true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var SearchJson = JSON.parse(this.responseText);
                    console.log(SearchJson);
                    for (var i = 0; i < SearchJson.length; ++i) {
                        createToolDiv(SearchJson[i].Name, SearchJson[i].imageSrc, SearchJson[i].Directory, SearchJson[i].description);
                    }
                }
            }
        }
    })();
});


// fromAPi();