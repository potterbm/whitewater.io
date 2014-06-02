

function River(siteID)
{
	this.siteID = siteID;
}

River.prototype.siteID = -1;
River.prototype.name = {
	"name" : "",
	"location" : "",
	"raw" : ""
};
River.prototype.rate = 0;
River.prototype.depth = 0;
River.prototype.latitude = 0;
River.prototype.longitude = 0;
River.prototype.data = false;

River.prototype.load = function(callback) {
	var request = $$.ajax({
		async : true,
		crossDomain : true,
		dataType : "json",
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&parameterCd=00060,00065,00010&siteType=ES,ST&site=" + this.site,
		success : function(response) {
			
			// Check to see if the request returned data and store a status
			this.data = true;
			
			// Store data
			this.name = this.parseRiverName(response.value.timeSeries[0].sourceInfo.siteName);
			this.latitude = response.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude;
			this.longitude = response.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude;
			this.rate = parseInt(response.value.timeSeries[0].values[0].value[0].value[0].value);
			this.depth = parseInt(response.value.timeSeries[1].values[0].value[0].value[0].value);
			
			// Call a callback with this River as the context
			if(typeof(callback) == "function") {
				callback.apply(this, response);
			}
		}
	});
	
	return request;
}


River.prototype.parseRiverName = function(text) {
	var parts = text.split(new RegExp('(?:above|at|below|near)', 'i'), 1);
	var separator = text.match(new RegExp('(above|at|below|near)', 'i'))[0];
	
	return {
		"name" : parts[0].trim(),
		"location" : separator + " " + parts[1].trim(),
		"raw" : text
	};
}

River.prototype.getName = function() {
	return this.name.name;
}

River.prototype.getFullName = function() {
	return this.name.name + " " + this.name.location;
}

River.prototype.getRawName = function() {
	return this.name.raw;
}

River.prototype.getNameMarkup = function() {
	return '<div class="river-title">' + this.name.name + '<span class="river-location">' + this.name.location + '</span></div>';
}


River.prototype.getRate = function() {
	return this.rate;
}

River.prototype.getFlow = River.prototype.getRate;

River.prototype.getDepth() = function() {
	return this.depth;
}


River.prototype.display = function() {
	$$("#river-title").html(this.getNameMarkup());
	$$("#river-depth").html(this.getDepth());
	$$("#river-flow").html(this.getRate());
}


