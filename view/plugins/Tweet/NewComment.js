$.fn.NewComment = function (id_tweet)
{
	$(this).CreateTweet("comment");
	$(this).parent().parent().ShowTweets(null, "comment", id_tweet);

}