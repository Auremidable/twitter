$("document").ready(function ()
{
	let url_page = new URL(window.location.href);
	let profile = url_page.searchParams.get("f");

	if(profile.match(/^\@/))
		window.location.href = "profile.html?user=" + profile.substr(1, 3);

	$(".app").Header();
	$(".app").ShowTweets(null, "search", null, profile);
});