

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
			
			// Store data
			this.
			
			if(typeof(callback) == "function") {
				callback(response);
			}
		}
	});
	
	return request;
}