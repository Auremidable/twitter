$.fn.ShowTweets = function(who = null, what = "tweet", idTweet = null, search = null)
{
	var tweetList = this;
	var container_all_tweets = $("<div></div>");
	$.post(
		"../controller/getTweets.php",
		{profile: who, type: what, id_tweet: idTweet, keyword: search},
		getTweets,
		"json");

	function getTweets(data)
	{
		if(data.result == null)
		{
			$(tweetList).append("<h1>Aucun tweets :( </h1>");
		}
		else
		{	
			for(i in data.result)
			{
				if(what == "tweet")
				{	
					data.result.sort(function(a, b)
					{
						return (b["tweet.id_tweet"] > a["tweet.id_tweet"]) ? 1 : ((b["tweet.id_tweet"] < a["tweet.id_tweet"]) ? -1 : 0);
					});
				}
				else if(what == "comment")
				{
					data.result.sort(function(a, b)
					{
						return (b["tweet.id_comment_tweet"] > a["tweet.id_comment_tweet"]) ? 1 : ((b["tweet.id_tweet"] < a["tweet.id_tweet"]) ? -1 : 0);
					});
				}
				createTweet(data.result[i]);
			}
		}
	}

	function createTweet(infoTweet)
	{
		let tweet = infoTweet.tweet;
		$.post(
			"../controller/getInfosTwittos.php",
			{id_twittos: tweet.id_member},
			getTwittos,
			"json");

		function getTwittos(infoTwittos)
		{
			//tweet = info tweet
			//data = info writer
			let data = infoTwittos.result;
			let container = $("<div class='pure-u-1' ></div>");
			container.css(
			{
				display: "flex",
				alignItems: "flex-start"
			});
			let profile_figure = $("<figure></figure>");
			profile_figure.css(
			{
				width: "50px",
				height: "50px",
				borderRadius: "50%",
				overflow: "hidden",
				margin: "10px"
			});
			let profile_picture = $("<img/>",
			{
				src: "image/" + data.profil_image
			})
			profile_picture.css({width: "100%"});
			profile_figure.append(profile_picture);
			let tweet_container = $("<div></div>");
			tweet_container.css(
			{
				padding: "20px 5px",
				flex: "1"
			});
			let tweet_header = $("<header></header>");
			tweet_header.css(
			{
				display: "flex",
				alignItems: "flex-end"
			});
			let tweet_header_name = $("<b>" + data.name + "</b>");
			tweet_header_name.attr("title", "Voir le profile de " + data.name);
			let tweet_header_pseudo = $("<a href='profile.html?user=" + data.pseudo + "'>@" + data.pseudo + "</a>");
			tweet_header_pseudo.css(
			{
				color: "black",
				margin: "0px 5px"
			});
			let tweet_header_date = $("<span>" + infoTweet.tweet.tweet_date + "</span>");
			tweet_header_date.css(
			{
				fontSize: "0.9em",
				color: "grey"
			});
			tweet_header.append(tweet_header_name, tweet_header_pseudo, tweet_header_date);
			tweet_container.append(tweet_header);
			tweet.content = findHashtag(tweet.content);
			tweet.content = findUser(tweet.content);
			let tweet_content = $("<p>" + tweet.content + "</p>");
			tweet_content.css(
			{
				textAlign: "justify",
				wordBreak: "break-word"
			});
			tweet_container.append(tweet_content);
			if(infoTweet.image)
			{
				let my_figure = $("<figure class='pure-g'></figure>");
				my_figure.css(
				{
					position: "relative",
					margin: "0",
					width: "100px",
					height: "100px",
					overflow: "hidden"
				});
				let my_image = $("<img />", 
				{
					class: "pure-u-1",
					src: "image/" + infoTweet.image.path
				});
				my_image.css(
				{
					cursor: "pointer"
				});
				my_image.click(function ()
				{
					if($(this).parent().css("height") == "100px")
					{
						$(this).parent().css(
						{
							width: "auto",
							height: "auto"
						});	
					}
					else
					{

						$(this).parent().css(
						{
							width: "100px",
							height: "100px"
						});
					}
				});
				my_figure.append(my_image);
				tweet_container.append(my_figure);
			}
			if(what == "tweet")
			{

				let tweet_footer = $("<footer></footer>");
				let comment_container = $("<form class='pure-form pure-u-1'></form>");
				let tweet_comment = $("<input class='pure-input-1' type='text' placeholder='Commentez'/>");
				let tweet_id = $("<input type='hidden' name='id_tweet' value='" + tweet.id_tweet + "'/>")
				comment_container.append(tweet_comment, tweet_id);
				let tweet_footer_show_comments = $("<button class='pure-button'>Voir les commentaires</button>");
				let tweet_footer_retweet = $("<button class='pure-button'>Retweet " + infoTweet.info.nb_retweets + "</button>");
				let rt_action = "rt";
				$.post("../controller/is_rt.php", {id_tweet: tweet.id_tweet}, is_rt, "json");
				function is_rt(r_is_rt)
				{
					if(r_is_rt.rt)
					{
						tweet_footer_retweet.css(
						{
							background: "#41EE58"
						});
						rt_action = "unrt";
					}
				}
				tweet_footer_retweet.click(function ()
				{
					$.post(
						"../controller/retweet.php",
						{id_tweet: tweet.id_tweet, action: rt_action},
						success,
						"text");
					function success(rt)
					{
						let message = null;
						if(rt_action == "rt")
							message = "Vous venez de retweet le tweet de " + infoTwittos.result.name;
						else
							message = "Vous ne retweetez plus le tweet de " + infoTwittos.result.name;
						$(".messageBox").text(message);
						$(".messageBox").parent().fadeIn().delay(3000).fadeOut();
					}
				});
				tweet_footer_like = $("<button class='pure-button'>Liker " + infoTweet.info.nb_likes + "</button>");
				let like_action = "like";
				$.post("../controller/is_like.php", {id_tweet: tweet.id_tweet}, is_like, "json");
				function is_like(r_is_like)
				{
					if(r_is_like.like)
					{
						tweet_footer_like.css(
						{
							background: "#41EE58"
						});
						like_action = "unlike";
					}
				}
				tweet_footer_like.click(function ()
				{
					$.post(
						"../controller/like.php",
						{id_tweet: tweet.id_tweet, action: like_action},
						success,
						"json");
					function success(like)
					{
						let message = null;
						if(like_action == "like")
							message = "Vous venez de liker le tweet de " + infoTwittos.result.name;
						else
							message = "Vous ne likez plus le tweet de " + infoTwittos.result.name;
						$(".messageBox").text(message);

						$(".messageBox").parent().fadeIn().delay(3000).fadeOut();
					}
				});
				tweet_footer.append(tweet_footer_show_comments, tweet_footer_retweet, tweet_footer_like, comment_container);
				tweet_comment.NewComment(tweet.id_tweet);
				tweet_footer_show_comments.click(function ()
				{
					$(".comments").toggle();
				});
				tweet_container.append(tweet_footer);	
			}
			container.append(profile_figure, tweet_container);
			container_all_tweets.append(container);
			if(what == "comment")
			{
				container_all_tweets.addClass("comments");
				container_all_tweets.hide();
			}
		}
	}

	function findHashtag(content)
	{
		let newContent = content;
		let findHastag = /#[A-Za-z]+/g;
		while((all_hashtags = findHastag.exec(content)) !== null)
		{
			let hashtag = all_hashtags[0];
			let keyword = hashtag.substr(1);
			newContent = newContent.replace(hashtag, "<a href='search.html?f=%23" + keyword + "'>" + hashtag + "</a>");
		}
		return newContent;
	}

	function findUser(content)
	{
		let newContent = content;
		let findUer = /@[A-Za-z]+/g;
		while((all_arobase = findUer.exec(content)) !== null)
		{
			let arobase = all_arobase[0];
			let username = arobase.substr(1);
			newContent = newContent.replace(arobase, "<a href='profile.html?user=" + username + "'>" + arobase + "</a>");
		}
		return newContent;
	}
	$(tweetList).append(container_all_tweets);
}