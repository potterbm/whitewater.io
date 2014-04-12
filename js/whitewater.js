




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
	
	$(".gear-icon, .droplet-icon").click(function(e) {
		$(this).toggleClass("hidden");
	});
	
});


$(window).load(function(e) {
	$(".droplet-icon.hidden").removeClass("hidden");
	$(".gear-icon.hidden").removeClass("hidden");
});