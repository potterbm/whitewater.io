






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
	
	if(isDesktop()) {
		
	}
	
	setTimeout(function() {
		$$("body.loading-view").removeClass("loading-view").addClass("conditions-view");
	}, 1000);
	
	setTimeout(function() {
		$$(".search-container").removeClass("hidden");
	}, 2000);
	
	
	
	
});




