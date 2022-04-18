let js = document.querySelector("#js-code"),
    css = document.querySelector("#css-code"),
    html = document.querySelector("#html-code"),
    filename = document.getElementById('filename'),
    iframe = document.getElementById('output'),
    download = document.getElementById('download'),
    downloadcss = document.getElementById('downloadCss'),
    downloadjs = document.getElementById('downloadJs'),
    downloadbody = document.getElementById('downloadBody');

var output = (iframe.contentWindow || iframe.contentDocument);
let FileName, fileContent;



function update() {
    if (filename.value == '') {
        filename.value = "Live Html Editor by Kanak";
    }


    if (output.document) output = output.document;
    // let html = output.querySelector('html');
    //html.innerHTML = ``;

    output.head.innerHTML = `  <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename.value}</title>
       <style>
         ${css.textContent} 
       </style>`;
    output.body.innerHTML = `
      ${html.textContent} 
      <script  type="text/javascript">
        ${js.textContent} 
      </script>
    `;
    iframe.contentWindow.eval(js.textContent);
    Prism.highlightAll();


}

update();


function downloadFile() {
    FileName = filename.value.replaceAll(" ", "_");
    fileContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${filename.value}</title>
        <style>
          ${css.textContent} 
        </style>
    </head>
    <body>
    ${html.textContent} 
    <script  type="text/javascript">
      ${js.textContent} 
    </script>  
    </body>
    </html>`;
    download.download = `${FileName}.html`;
    download.href = 'data:attachment/html,' + encodeURI(fileContent);
}

function downloadCss() {
    FileName = filename.value.replaceAll(" ", "_");
    fileContent = `${css.textContent}`;
    downloadcss.download = `${FileName}.css`;
    downloadcss.href = 'data:attachment/css,' + encodeURI(fileContent);
}

function downloadJs() {
    FileName = filename.value.replaceAll(" ", "_");
    fileContent = `${js.textContent}`;
    downloadjs.download = `${FileName}.js`;
    downloadjs.href = 'data:attachment/js,' + encodeURI(fileContent);
}

function downloadBody() {
    FileName = filename.value.replaceAll(" ", "_");
    fileContent = `${css.textContent}`;
    downloadbody.download = `${FileName}_body.html`;
    downloadbody.href = 'data:attachment/css,' + encodeURI(fileContent);
}

// document.getElementById('test').addEventListener('click', download_txt);