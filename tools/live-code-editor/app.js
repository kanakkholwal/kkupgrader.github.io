let js = document.getElementById('js'),
    css = document.getElementById('css'),
    html = document.getElementById('html'),
    filename = document.getElementById('filename');
let iframe = document.getElementById('output');
let download = document.getElementById('download');
var output = (iframe.contentWindow || iframe.contentDocument);


function update() {

    if (filename.value == '') {
        filename.value = "Live Video Editor by Kanak";
    }

    if (output.document) output = output.document;
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

//  let OutputFileContent = '<!DOCTYPE html><html lang="en"><head>${output.head.innerHTML}</head><body>${output.body.innerHTML}</body></html>';
//     let OutputFileContent2 = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <meta http-equiv="X-UA-Compatible" content="IE=edge">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>${filename.value}</title>
//    <style>
//      ${css.textContent} 
//    </style>
//    </head>
// <body>
// ${html.textContent} 
// <script  type="text/javascript">
// ${js.textContent} 
// </script>
// </body>
// </html>`;
// function download_txt() {
//     var textToSave = document.getElementById('txt').innerHTML;
//     var hiddenElement = document.createElement('a');

//     hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
//     hiddenElement.target = '_blank';
//     hiddenElement.download = 'myFile.txt';
//     hiddenElement.click();
// }

// document.getElementById('test').addEventListener('click', download_txt);