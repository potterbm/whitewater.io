

function initMobile()
{
	
}

function initDesktop()
{
	
}

function isMobile()
{
	return $("#mobile-view").is(":visible");
}

function isDesktop()
{
	return $("#desktop-view").is(":visible");
}

function displayPane(targetPane)
{
	var $body = $("body");
	
	if($body.hasClass(targetPane + "-view")) {
		return true;
	}
	else {
		$body.removeClass("conditions-view saved-view search-view").addClass(targetPane + "-view");
	}
}


function getWaterData(site)
{
	var request = $.ajax({
		crossDomain : true,
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site
	});
}


$(document).ready(function(e) {
	
	$(".hamburger-icon").click(function(e) {
		$(this).toggleClass("hidden");
	});
	
});