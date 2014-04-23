

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


function getWaterData(site)
{
	var request = $.ajax({
		crossDomain : true,
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site
	});
}


$(document).ready(function(e) {
	
	$(".hamburger-icon").click(function(e) {
		$(this).toggleClass("cross-icon");
	});
	
	$(".hamburger-icon, .gear-icon, .droplet-icon").click(function(e) {
		$(".hamburger-icon, .gear-icon, .droplet-icon").toggleClass("hidden");
	});
	
});