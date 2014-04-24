

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
	
	$body.removeClass("edit-mode");
	$body.attr("data-last-pane", targetPane);
}

function toggleRiverEditMode()
{
	$("body").toggleClass("edit-mode");
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
		alert("click");
		var $body = $("body");
		
		if($body.hasClass("conditions-view")) {
			displayPane("saved");
		}
		else if($body.hasClass("saved-view")) {
			displayPane($body.attr("data-last-pane"));
		}
		else if($body.hasClass("search-view")) {
			displayPane($body.attr("data-last-pane"));
		}
	});
	
	$(".gear-icon").click(function(e) {
		var $body = $("body");
		
		if($body.hasClass("conditions-view")) {
			displayPane("search");
		}
		else if($body.hasClass("saved-view")) {
			toggleEditMode();
		}
	});
	
});