$.fn.BigProfile = function(userpseudo)
{
	var lm = this;
	$.post("../controller/bigProfile.php", {user_pseudo:userpseudo}, success, "json" );

	function success(data)
	{
		profilecont(data.profile.banner_image, data.profile.profil_image, data.profile.name, data.profile.pseudo, data.profile.color_theme, data.check);
		tweets(data.tweet.tweet);
		abo(data.follower.followed);
		nbrabo(data.followed.follower);
	}

	function profilecont(banner, image, name, pseudo, color_theme, check)
	{
		var smallcontent = $("<div class='miniprofile pure-u-1'></div>")
		smallcontent.css({
			boxSizing: "border-box",
			position: "relative"
		});

		var imgbanner = $("<img class='imgbanner pure-u-1' height='300' src='image/" + banner +"'/>");
		var imgprofile = $("<img class='imgprofile' src='image/" + image +"'/>");
		imgprofile.css({
			backgroundColor:"white",
			position:"absolute",
			top: "190px",
			left: "80px",
			width: "200px",
			borderRadius:"50%",
			zIndex: "20",
			overflow: "hidden"
		});

		var infos = $("<div class='infos pure-u-1'></div>");
		infos.css({
			boxSizing: "border-box",
			margin:"0 auto",
			height:"100px",
			boxShadow:" 1px 2px 2px lightgrey",
			display:"flex",
			justifyContent:"center",
			paddingLeft: "200px"
		});

		var infoprofile = $("<div class='infoprof'></div>");
		infoprofile.css({
			textAlign: "center"
		});

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

		var modifprofile = $("<a href='#'><div class='modif'></div></a>");
		var modifprofile1 = $("<p>Éditer le profil</p>");
		modifprofile.css({
			textDecoration:"none",
			color:"#696969",
			fontWeight:"bold",
			width:"150px",
			height:"50px",
			marginTop:"25px",
			borderRadius:"30px",
			border:"1px solid #696969"
		});
		modifprofile1.css({
			textAlign:"center",
			fontSize:"16px",
		});
		modifprofile.append(modifprofile1);
		
		if (check == true)
		{
			tweetprofile.append(nbrtweets, nbrabonnement, nbrabonne, modifprofile);
			infos.append(infoprofile, tweetprofile);
			smallcontent.append(imgbanner, imgprofile, infos);
			lm.append(smallcontent);
		}
		else
		{
			tweetprofile.append(nbrtweets, nbrabonnement, nbrabonne);
			infos.append(infoprofile, tweetprofile);
			smallcontent.append(imgbanner, imgprofile, infos);
			lm.append(smallcontent);
		}

		$(".infoss").css({
			fontWeight:"bold",
			width:"110px",
			height:"100px",
			textAlign:"center",
			marginRight:"20px",
			color:"#696969"
		});
		$(".allnbr").css({
			fontSize:"25px",
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