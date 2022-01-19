document.querySelector('#shareify').addEventListener('click', function() {
	if (typeof navigator.share === 'undefined') {
		log("No share API available!");
	} else {
		navigator.share({
			url: document.URL,
			title: document.title,
			text: document.description
		})
	}
});
