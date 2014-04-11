




function getWaterData(site)
{
	var request = $.ajax({
		crossDomain : true,
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site
	});
}




$(document).ready(function(e) {
	
	$("svg").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("cross");
	});
	
});