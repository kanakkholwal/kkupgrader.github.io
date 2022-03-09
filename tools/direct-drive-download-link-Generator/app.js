var mainData = '';



$(function() {

    var apiKey = 'AIzaSyBKfj9ljf-ECV4rVGrqIBTe0O8p7bFgG7U';

    var regex = /[A-z_\-0-9]{28}/;

    var idArray = [];

    var idIndex = 0;

    var maxLines = 20;

    // Listens on keydown in order to prevent linebreaks more than the maxLines variable

    $('#url').on('keydown', function(e) {

        if (

            e.keyCode == 13 &&

            $(this)

            .val()

            .split('\n').length >= maxLines

        ) {

            return false;

        }

    });

    // Shows max lines text

    $('#max-lines').text(maxLines);

    // Disables or enables the buttons

    function toggleDisabled() {

        $('#progress').toggleClass('hide');

        $('.alert').addClass('hide');

        toggleElementDisabled('#url');

        toggleElementDisabled('#submit');

        toggleElementDisabled('#copy-btn');

    }

    // Toggles the disabled attribute

    function toggleElementDisabled(selector) {

        if ($('#progress.hide')[0]) {

            $(selector).removeAttr('disabled');

        } else {

            $(selector).attr('disabled', 'disabled');

        }

    }



    // Makes the Google Drive API call.

    function makeApiCall() {

        if (idIndex < idArray.length) {

            // Checks if is the last call

            var id = idArray[idIndex];

            id = id.split('/')[0];

            if (id) {

                $.ajax({

                    url: `https://www.googleapis.com/drive/v3/files/${id}?key=${apiKey}&fields=webContentLink`,

                })

                .then(function(data) {

                    if (data.webContentLink) {

                        var formattedWebContentLink = data.webContentLink.replace(

                            /&export=download/,

                            ''

                        );

                        //creating input var to copy normally

                        var enter = '\n';

                        var str2 = formattedWebContentLink.concat(enter);

                        //					var str3= formattedWebContentLink.'\n';

                        mainData = mainData.concat(str2);

                        $('#data').append(

                            `<li><a href="${formattedWebContentLink}">${formattedWebContentLink}</a></li>`

                        );

                    } else {

                        $('#data').append(

                            `<li>Could not get direct link for: ${idArray[idIndex]}`

                        );

                    }

                    idIndex++;

                    setTimeout(function() {

                        makeApiCall();

                    }, 500);

                })

                .fail(function(e, textStatus) {

                    $('#data').append("<div class='alert danger'>Invalid Url: Please Enter Correct Drive Url</div>");

                    idIndex++;

                    setTimeout(function() {

                        makeApiCall();

                    }, 500);

                });

            } else {

                idIndex++;

                setTimeout(function() {

                    makeApiCall();

                }, 500);

            }

        } else {

            // Ends recursive calling

            toggleDisabled();

        }

    }

    // Submit listener

    $('#direct-link-form').on('submit', function(e) {

        e.preventDefault();

        idIndex = 0;

        idArray = $('#url')

        .val()

        .split('\n')

        .slice(0, maxLines)

        .join('\n')

        .split(

            /https:\/\/drive\.google\.com\/open\?id=|https:\/\/drive\.google\.com\/file\/d\//

        )

        .slice(1);

        // Checks for every id if it has a correct format.

        if (

            idArray.length > 0 &&

            idArray.every(function(id) {

                return regex.test(id);

            })

        ) {

            $('#data').text('');

            $('#result').removeClass('hide');

            idArray.map(function(parsedId) {

                return parsedId.split('/')[0];

            });

            toggleDisabled();

            makeApiCall();

        } else {

            alert('Unable to get the ID from the URL(s).');

        }

    });



});



$(document).ready(function() {

    $('body').unbind('copy cut');

    $('#copy-btn').click(function() {

        i = document.createElement('textarea');

        $('.alert').removeClass('hide');

        i.id = "copyData";

        i.value = mainData;

        document.body.appendChild(i);

        i.select();

        //var temp = mainData2;

        document.execCommand('copy');

        document.body.removeChild(i);

        console.log(mainData);

        mainData = '';

    });





});