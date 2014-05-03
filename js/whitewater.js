

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


function showMenu(e)
{
	console.log('showMenu');
	console.log(e);
}


function getWaterData(site)
{
	var request = $.ajax({
		crossDomain : true,
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site
	});
}


$(document).ready(function(e) {
	
	$$('.hamburger-icon').on('tap', showMenu);
	
	$(".gear-icon").click(function(e) {
		var $body = $("body");
		
		if($body.hasClass("conditions-view")) {
			displayPane("search");
		}
		else if($body.hasClass("saved-view")) {
			toggleRiverEditMode();
		}
	});
	
});