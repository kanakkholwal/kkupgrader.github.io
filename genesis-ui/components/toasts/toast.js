document.addEventListener('DOMContentLoaded', function() {
    var toastContainer = document.querySelector(".g-toast-container");
    if (toastContainer.length == 0) {
        var toastContainerContent = '<div class="g-toast-container"></div>'
        document.querySelector("body").innerHTML += toastContainerContent;
    }

});




function GenesisToast(type, title, body, duration) {
    // Create Toast Element
    let GToastElement = document.createElement("div");
    GToastElement.classList.add('g-toast');
    // Add Class For Toast Type 
    if (type) { GToastElement.classList.add(`g-toast-${type}`); }
    // Adding Header 
    var GToastHeader = document.createElement("div");
    GToastHeader.classList.add('g-toast-header');
    // Adding Title
    var GToastTitle = document.createElement("div");
    GToastTitle.classList.add('g-toast-title');
    // Adding Close Button
    var GToastClose = document.createElement("div");
    GToastClose.classList.add('g-toast-close');
    GToastClose.classList.add('icon-btn');
    GToastClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>';
    //  GToastHeader.innerHTML = +GToastClose;
    // Adding Body 
    var GToastBody = document.createElement("div");
    GToastBody.classList.add('g-toast-body');
    GToastBody.innerHTML = body;
    // Setting Icon types
    var iconType = "";
    if (type == "info") { iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg></span>`; } else if (type == "success") { iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg></span>`; } else if (type == "warning") { iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg></span>`; } else if (type == "danger") { iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.936 2.5L21.5 8.067v7.87L15.936 21.5h-7.87L2.5 15.936v-7.87L8.066 2.5h7.87zm-.829 2H8.894L4.501 8.895v6.213l4.393 4.394h6.213l4.394-4.394V8.894l-4.394-4.393zM11 15h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg></span>`; }

    // append icon to title element with title text
    GToastTitle.innerHTML += iconType + title;
    GToastHeader.appendChild(GToastTitle);
    GToastHeader.appendChild(GToastClose);
    // Merging Toast HTML
    GToastElement.appendChild(GToastHeader);
    GToastElement.appendChild(GToastBody);
    //append toast message to it
    var toastContainer = document.querySelector(".g-toast-container");
    toastContainer.appendChild(GToastElement);

    // wait just a bit to add active class to the message to trigger animation
    setTimeout(function() {
        GToastElement.classList.add('active');
    }, 1);

    // Setting Up Durations
    if (duration > 0) {
        // it it's bigger then 0 add it
        setTimeout(function() {
            GToastElement.classList.remove('active');
            setTimeout(function() {
                GToastElement.remove();
            }, 350);
        }, duration);
    } else if (duration == null) {
        //  it there isn't any add default one (3000ms)
        setTimeout(function() {
            GToastElement.classList.remove('active');
            setTimeout(function() {
                GToastElement.remove();
            }, 350);
        }, 3000);
    }

    // Closing And Removing Toast
    let CloseToastElements = document.querySelectorAll('.g-toast-close');
    CloseToastElements.forEach(CloseToastElement => {
        let ownToast = CloseToastElement.parentElement.parentElement;
        CloseToastElement.addEventListener('click', () => ownToast.classList.remove('active'));
        CloseToastElement.addEventListener('click', () => ownToast.remove());

    });
}





document.addEventListener('click', function(e) {
    //check is the right element clicked
    if (!e.target.matches('.g-toast-toggle')) return;
    else {
        //create toast message with dataset attributes
        GenesisToast(e.target.dataset.gToastType, e.target.dataset.gToastTitle, e.target.dataset.gToastHtml, e.target.dataset.gToastDuration);
    }
});