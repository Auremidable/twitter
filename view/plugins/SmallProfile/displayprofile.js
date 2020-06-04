$.fn.smallprofile = function()
{
	var lm = this;
	$.post("../controller/displayprofile.php", "", success, "json" );

	function success(data)
	{
		profilecont(data.profile.banner_image, data.profile.profil_image, data.profile.name, data.profile.pseudo, data.profile.color_theme);
		tweets(data.tweet.tweet);
		abo(data.follower.followed);
		nbrabo(data.followed.follower);
	}

	function profilecont(banner, image, name, pseudo, color_theme)
	{
		var smallcontent = $("<div class='miniprofile pure-u-1'></div>")
		smallcontent.css({
			boxSizing: "border-box",
			position: "relative"
		});

		var imgbanner = $("<img class='imgbanner pure-u-1' height='100' src='image/" + banner +"'/>");
		var imgprofile = $("<img class='imgprofile' height='80' src='image/" + image +"'/>");
		imgprofile.css({
			backgroundColor:"white",
			position:"absolute",
			top: "60px",
			left: "20px",
			borderRadius:"50%",
			zIndex: "20",
			overflow: "hidden"
		});

		var infos = $("<div class='infos pure-u-1'></div>");

		var infoprofile = $("<div class='infoprof'></div>");
		infoprofile.css({
			textAlign: "center"
		});

		var p_name = $("<p>"+ name + "</p>");
		p_name.css(
		{
			margin: "15px 0px 5px 0px"
		});

		var p_pseudo = $("<a href='profile.html?user=" + pseudo + "'>@" + pseudo + "</a>");
		p_pseudo.css({
			fontWeight: "bold",
			color: "black"
		});

		infoprofile.append(p_name, p_pseudo);

		var tweetprofile = $("<div class='tweetprof'></div>");
		tweetprofile.css({
			display:"flex"
		});

		var nbrtweets = $("<div class='infoss'></div>");
		var nbrtweet1 = $("<p>Tweets</p>");
		var nbrtweet2 = $("<p class='allnbr nbr_tweet'></p>");
		nbrtweets.append(nbrtweet1, nbrtweet2);

		var nbrabonnement = $("<div class='infoss'></div>");
		var nbrabonnement1 = ("<p>Abonnements</p>");
		var nbrabonnement2 = ("<p class='allnbr nbr_followed'></p>");
		nbrabonnement.append(nbrabonnement1, nbrabonnement2);

		var nbrabonne = $("<div class='infoss'></div>");
		var nbrabonne1 = $("<p>Abonnés</p>");
		var nbrabonne2 = $("<p class='allnbr nbr_follower'></p>");
		nbrabonne.append(nbrabonne1, nbrabonne2);


		tweetprofile.append(nbrtweets, nbrabonnement, nbrabonne);
		infos.append(infoprofile, tweetprofile);
		smallcontent.append(imgbanner, imgprofile, infos);
		lm.append(smallcontent);


		$(".infoss").css({
			width:"33%",
			height:"100px",
			marginTop:"20px",
			textAlign:"center"
		});
		$(".allnbr").css({
			fontSize:"20px",
			color: color_theme,
			fontWeight:"bold"
		});
	}

	function tweets(tweet)
	{
		$(".nbr_tweet").text(tweet);
	}

	function abo(followed)
	{
		$(".nbr_followed").text(followed);

	}

	function nbrabo(follower)
	{
		$(".nbr_follower").text(follower);

	}
}
