

function River(siteID)
{
	this.siteID = siteID;
}

River.prototype.siteID = -1;
River.prototype.name = "";

River.prototype.fetchWaterData = function(callback) {
	var request = $$.ajax({
		async : true,
		crossDomain : true,
		dataType : "json",
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&parameterCd=00060,00065,00010&siteType=ES,ST&site=" + this.site,
		success : function(response) {
			if(typeof(callback) == "function") {
				callback(response);
			}
		}
	});
	
	return request;
}







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
	alert('showMenu');
}


function showSearch(e)
{
	alert('showSearch');
}



$$(document).ready(function(e) {
	//console.log($$);
	
	setTimeout(function() {
		$$("body.loading-view").removeClass("loading-view").addClass("conditions-view");
	}, 1000);
	
});