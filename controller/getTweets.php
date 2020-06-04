<?php

require_once("../model/model.php");
$bdd = new bdd();

$output = [
	"id_member" => $_COOKIE["tweet_academie_id_member"],
	"error" => false,
	"result" => null
];

$profile = null;
if($_POST["profile"] == null)
	$profile = $_COOKIE["tweet_academie_pseudo"];
else
	$profile = $_POST["profile"];

$id_user = $bdd->recupProfileFromPseudo($profile)->fetch()["id_member"];

$all_tweets = null;
switch($_POST["type"])
{
	case "tweet":
	$get_all_tweets = $bdd->getTweets($id_user);
	while($tweet = $get_all_tweets->fetch())
	{
		$tweet["content"] = nl2br($tweet["content"]);
		$get_info_tweet = $bdd->getInfoTweets($tweet["id_tweet"]);
		$get_image_tweet = $bdd->getImageTweet($tweet["id_tweet"]);
		$all_tweets[] = [
				"tweet" => $tweet,
				"info" => $get_info_tweet,
				"image" => $get_image_tweet->fetch()
			];
	}
	break;
	case "comment":
	$get_all_comment = $bdd->getComments($_POST["id_tweet"]);
	while($comment = $get_all_comment->fetch())
	{
		$comment["content"] = nl2br($comment["content"]);
		$get_image_comment = $bdd->getImageComment($comment["id_comment_tweet"]);
		$all_tweets[] = [
				"tweet" => $comment,
				"image" => $get_image_comment->fetch()
			];
	}
	case "search":
	$get_all_tweets = $bdd->getTweetsSearch($_POST["keyword"]);
	while($tweet = $get_all_tweets->fetch())
	{
		$tweet["content"] = nl2br($tweet["content"]);
		$get_info_tweet = $bdd->getInfoTweets($tweet["id_tweet"]);
		$get_image_tweet = $bdd->getImageTweet($tweet["id_tweet"]);
		$all_tweets[] = [
				"tweet" => $tweet,
				"info" => $get_info_tweet,
				"image" => $get_image_tweet->fetch()
			];
	}
	break;
}

$output["result"] = $all_tweets;

echo json_encode($output);