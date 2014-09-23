

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
	var self = this;
	
	var request = $$.ajax({
		async : true,
		crossDomain : true,
		dataType : "json",
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&parameterCd=00060,00065,00010&siteType=ES,ST&site=" + this.site,
		success : function(response) {
			
			// Check to see if the request returned data and store a status
			self.data = true;
			
			// Store data
			self.name = self.parseRiverName(response.value.timeSeries[0].sourceInfo.siteName);
			self.latitude = response.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude;
			self.longitude = response.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude;
			self.rate = parseInt(response.value.timeSeries[0].values[0].value[0].value[0].value);
			self.depth = parseInt(response.value.timeSeries[1].values[0].value[0].value[0].value);
			
			// Call a callback with this River as the context
			if(typeof(callback) == "function") {
				callback.apply(self, response);
			}
		}
	});
	
	return request;
}

River.prototype.searchURL = "http://waterdata.usgs.gov/nwis/inventory?search_station_nm=$query&search_station_nm_match_type=anywhere&site_tp_cd=ST&group_key=NONE&format=sitefile_output&sitefile_output_format=xml&column_name=agency_cd&column_name=site_no&column_name=station_nm&list_of_search_criteria=search_station_nm%2Csite_tp_cd";


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
	var self = this;
	
	if($$("iframe").length > 0) {
		$$("iframe").remove();
	}
	
	$$("body").append('<iframe id="search-request" style="display: none;" src="' + self.searchURL.replace('$query', text) + '"></iframe>');
	console.log($$("#search-request").length);
	
	$$("#search-request").on('load', function() {
		console.log('load');
	});
	
	$$("#search-request").get().onload = function() {
		console.log('get onload');
	}
	
	$$("#search-request").on('ready', function() {
		console.log('ready');
		var response = $$("#search-request").html();
		console.log(response);
		
		if(typeof(callback) == "function") {
			//callback.apply(self, self.parseSearchResults);
		}
	});
	
	/*
	var request = $$.ajax({
		async : true,
		crossDomain : true,
		dataType : "xml",
		url : "http://waterdata.usgs.gov/nwis/inventory?search_station_nm=" + text + "&search_station_nm_match_type=anywhere&site_tp_cd=ST&group_key=NONE&format=sitefile_output&sitefile_output_format=xml&column_name=agency_cd&column_name=site_no&column_name=station_nm&list_of_search_criteria=search_station_nm%2Csite_tp_cd",
		success : function(response) {
			
			// Call a callback with this River as the context
			if(typeof(callback) == "function") {
				callback.apply(self, self.parseSearchResults);
			}
		}
	});
	*/
}


River.prototype.parseSearchResults = function(response)
{
	console.log(response);
	
	return [];
}





