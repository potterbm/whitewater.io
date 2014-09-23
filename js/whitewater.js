






function initMobile()
{
	
}

function initDesktop()
{
	
}

function isMobile()
{
	return !isDesktop();
}

function isDesktop()
{
	return $$("html").width >= 980;
}





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
		
		if(e.which != 13) {
			return;
		}
		
		var input = $$(this).val().trim();
		
		river.search(input);
		
		
	});
	
	
});




