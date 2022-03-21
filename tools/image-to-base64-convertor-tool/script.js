document.querySelector('#file').addEventListener('change', handleFileSelect, false);

$('input[type=file]').change(function() {
    console.dir(this.files[0])
})


function handleFileSelect(e) {
    var code = document.getElementById('code');
    code.classList.remove('hide');



    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function(f) {
        if (!f.type.match("image.*")) return;
        var reader = new FileReader();
        reader.onload = function(e) {
            console.log(e);
            var base64 = e.target.result;
            document.getElementById("imgBase64").innerText = '<img src="' + base64 + '" />';
            document.getElementById("cssBase64").innerText = '.img{background-image: url(' + base64 + ');}';

            Prism.highlightAll();

        };
        reader.readAsDataURL(f);
    });
}