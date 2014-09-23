

var ra = new RiverApp();

var r = new River();

console.log(ra);

var whitewaterIOApp = angular.module('whitewaterIOApp', []);

whitewaterIOApp.controller('RiverApp', RiverApp);




/*
$$(document).ready(function(e) {
	
	var river = new River();
	
	if(isDesktop()) {
		
	}
	
	setTimeout(function() {
		$$("body.loading-view").removeClass("loading-view").addClass("conditions-view");
	}, 1000);
	
	setTimeout(function() {
		$$(".search-container").removeClass("hidden");
	}, 2000);
	
	
	$$("#search-input").on('keyup', function(e) {
		console.log(e.which);
		
		if(e.which != 13) {
			return;
		}
		
		var input = $$(this).val().trim();
		
		river.search(input);
		
		
	});
	
	
});
*/


