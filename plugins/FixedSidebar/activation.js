var fixedSidebar = true ;
	$("#main-wrapper, #sidebar-wrapper").each(function() {
		1 == fixedSidebar && $(this).theiaStickySidebar({
			containerSelector: "#content-wrapper",
			additionalMarginTop: 20,
			additionalMarginBottom: 20
		});
	});
