$("document").ready(function ()
{
	let url_page = new URL(window.location.href);
	let profile = url_page.searchParams.get("user");

	$(".app").Header();
	$.post(
		"../controller/is_profile_exist.php",
		{pseudo: profile},
		is_profile_exist,
		"json"
		);
	function is_profile_exist(data)
	{
		if(data.nbr_result[0] > 0)
		{
			let main = $("<main class='pure-g'></main>");
			let div_profile = $("<div class='pure-u-1'></div>");
			let container = $("<div class='pure-u-1'></div>");
			let div_recommandations = $("<div class='pure-u-1-3'></div>");
			let div_tweets = $("<div class='pure-u-2-3'></div>");
			container.append(div_recommandations, div_tweets)
			main.append(div_profile, container);
			$(".app").append(main);
			div_profile.BigProfile(profile);
			div_recommandations.recommand();
			div_tweets.ShowTweets(profile);
		}
		else
		{
			$(".app").append("<h1>Profil introuvable</h1>");
		}
	}
});