

function River()
{
	var self = this;
	
	// One argument, object
	if(arguments.length === 1 && typeof(arguments[0]) == "object") {
		
		if("id" in arguments[0]) {
			self.id = arguments[0].id;
		}
		
		if("name" in arguments[0]) {
			self.name = arguments[0].name;
		}
		
		if("location" in arguments[0]) {
			self.location = arguments[0].location;
		}
		
		if("flow" in arguments[0]) {
			self.flow = parseInt(arguments[0].flow);
		}
		
		if("depth" in arguments[0]) {
			self.depth = parseInt(arguments[0].depth);
		}
		
		if("latitude" in arguments[0]) {
			self.latitude = arguments[0].latitude;
		}
		
		if("longitude" in arguments[0]) {
			self.longitude = arguments[0].longitude;
		}
		
		if("raw" in arguments[0]) {
			self.raw = arguments[0].raw;
		}
		
	}
	
	// Any other single argument is treated as a site id
	else if(arguments.length === 1 && parseInt(arguments[0]) > 0) {
		self.id = arguments[0];
		self.load();
	}
	
}

River.prototype.id = -1;
River.prototype.name = "";
River.prototype.location = "";
River.prototype.flow = 0;
River.prototype.depth = 0;
River.prototype.latitude = 0;
River.prototype.longitude = 0;
River.prototype.raw = false;

River.prototype.load = function(callback) {
	var self = this;
	
	var request = $$.ajax({
		async : true,
		crossDomain : true,
		dataType : "json",
		url : "http://waterservices.usgs.gov/nwis/iv/?format=json&parameterCd=00060,00065,00010&siteType=ES,ST&site=" + self.id,
		success : function(response) {
			self.raw = response;
			
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

River.prototype.toJSON = function() {
	return JSON.stringify({
		"id" : self.id,
		"name" : self.name,
		"location" : self.location,
		"flow" : self.flow,
		"depth" : self.depth,
		"raw" : self.raw
	});
}








function RiverApp() {
	var self = this;
	
	try {
		self.storage = window.localStorage;
	} catch(e) {
		self.storage = false;
	}
	
	//self.load();
	
	if(self.displayRiver === false) {
		self.displayRiver = new River();
	}
	
	self.displayRiver = new River({ "name" : "Colorado River", "location" : "near Portsmouth, NH" });
}

RiverApp.prototype.searchResults = [new River({ "name" : "Colorado River", "location" : "near Portsmouth, NH" })];
RiverApp.prototype.searchResults = "";
RiverApp.prototype.displayRiver = false;

RiverApp.prototype.searchURL = "http://waterdata.usgs.gov/nwis/inventory?search_station_nm=$query&search_station_nm_match_type=anywhere&site_tp_cd=ST&group_key=NONE&format=sitefile_output&sitefile_output_format=xml&column_name=agency_cd&column_name=site_no&column_name=station_nm&list_of_search_criteria=search_station_nm%2Csite_tp_cd";

RiverApp.prototype.load = function() {
	var self = this;
	
	if(self.storage === false) {
		return;
	}
	
	var data = self.storage.getItem("whitewater.io-displayRiver");
	
	if(data && typeof(data) != "undefined") {
		self.displayRiver = new River(JSON.parse(data));
	}
}

RiverApp.prototype.save = function() {
	var self = this;
	
	if(self.storage === false) {
		return;
	}
	
	self.storage.setItem("whitewater.io-displayRiver", self.displayRiver.toJSON());
}

RiverApp.prototype.search = function(searchText) {
	var self = this;
	
	if($$("#search-request").length > 0) {
		$$("#search-request").remove();
	}
	
	$$("body").append('<iframe id="search-request" style="display: none;" src="' + self.searchURL.replace('$query', searchText) + '"></iframe>');
	
	$$("#search-request").on('load', function() {
		console.log($$("#search-request").html());
		
		$$("#search-request").find("site").each(function() {
			console.log('iteration');
			console.log(arguments);
			console.log(this);
		});
	});
}
