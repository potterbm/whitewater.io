




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
	
	$(".droplet-icon.hidden").removeClass("hidden");
	
});