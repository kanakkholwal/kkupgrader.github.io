const DownloadButton = document.querySelector('#downloadButton');
const AudioPageInput = document.querySelector('#audioPageInput');


var StringToHtml = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc;
};

DownloadButton.addEventListener('click',  (e) => {
    e.preventDefault();
    var Iframe = document.createElement('iframe');
    Iframe.src = AudioPageInput.value;
    Iframe.setAttribute("crossorigin","anonymous");
    Iframe.style.display = 'none';
    document.body.appendChild(Iframe);
    Iframe.onload =  function()
    {
        var HTML =  Iframe.contentWindow.document.body.innerHTML || Iframe.contentWindow.document.body.innerHTML;
        console.log(StringToHtml(HTML));
    }
});