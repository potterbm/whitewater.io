






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





$$(document).ready(function(e) {
	
	if(isDesktop()) {
		
	}
	
	setTimeout(function() {
		$$("body.loading-view").removeClass("loading-view").addClass("conditions-view");
	}, 1000);
	
	setTimeout(function() {
		$$(".search-container").removeClass("hidden");
	}, 2000);
	
	
	
	
});




