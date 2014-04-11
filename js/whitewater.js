




function getWaterData(site)
{
	var request = $.ajax({
		crossDomain : true,
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site
	});
}


$(document).ready(function(e) {
	console.log($(".hamburger").length);
	console.log($(".hamburger .hamburger-line").length);
	
	$(".hamburger").click(function(e) {
		console.log('click');
		console.log(this);
		$(this).toggleClass("cross");
	});
	
});