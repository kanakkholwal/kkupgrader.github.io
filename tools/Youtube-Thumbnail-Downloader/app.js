$("#submit").click(function() {

    var link = $(".link").val();

    var format = $(".format").children("option:selected").val();


    downloadVideo(link, format);

});

function downloadVideo(link, format) {

    $('#output').html('<iframe style="width:100%;height:60px;border:0;overflow:hidden;" scrolling="no" src="https://loader.to/api/button/?url=' + link + '&f=' + format + '"></iframe>');

}