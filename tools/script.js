$(".card .card-body").hover(function() {

    $(this).find("a.btn").toggleClass("animated jello");
    $(this).find("div.bg-image").toggleClass("animated headShake");
    $(this).find("h5").toggleClass("animated headShake");
    $(this).find("p").toggleClass("animated pulse");

});