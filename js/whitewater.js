




function getWaterData(site)
{
	var request = $.ajax({
		crossDomain : true,
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site
	});
}




$(window).load(function(e) {
	
	$(".hamburger").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("cross");
	});
	
});