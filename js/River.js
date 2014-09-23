

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
	var instance = this;
	
	var request = $$.ajax({
		async : true,
		crossDomain : true,
		dataType : "json",
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&parameterCd=00060,00065,00010&siteType=ES,ST&site=" + this.site,
		success : function(response) {
			
			// Check to see if the request returned data and store a status
			instance.data = true;
			
			// Store data
			instance.name = instance.parseRiverName(response.value.timeSeries[0].sourceInfo.siteName);
			instance.latitude = response.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude;
			instance.longitude = response.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude;
			instance.rate = parseInt(response.value.timeSeries[0].values[0].value[0].value[0].value);
			instance.depth = parseInt(response.value.timeSeries[1].values[0].value[0].value[0].value);
			
			// Call a callback with this River as the context
			if(typeof(callback) == "function") {
				callback.apply(instance, response);
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

River.prototype.getDepth = function() {
	return this.depth;
}

River.prototype.getSearchResultMarkup = function() {
	return '<div class=""></div>';
}


River.prototype.display = function() {
	$$("#river-title").html(this.getNameMarkup());
	$$("#river-depth").html(this.getDepth());
	$$("#river-flow").html(this.getRate());
}


River.prototype.displaySearchResult = function() {
	$$("#search-results").append(this.getSearchResultMarkup());
}


River.prototype.search = function(text, callback) {
	var instance = this;
	
	var request = $$.ajax({
		async : true,
		crossDomain : true,
		dataType : "xml",
		url : "http://waterdata.usgs.gov/nwis/inventory?search_station_nm=" + text + "&search_station_nm_match_type=anywhere&site_tp_cd=ST&group_key=NONE&format=sitefile_output&sitefile_output_format=xml&column_name=agency_cd&column_name=site_no&column_name=station_nm&list_of_search_criteria=search_station_nm%2Csite_tp_cd",
		success : function(response) {
			
			// Call a callback with this River as the context
			if(typeof(callback) == "function") {
				callback.apply(instance, instance.parseSearchResults);
			}
		}
	});
}


River.prototype.parseSearchResults = function(response)
{
	console.log(response);
	
	return [];
}





