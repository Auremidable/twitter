<?php

require_once("../model/model.php");
$bdd = new bdd();

$id_tweet = $bdd->createTweet($_COOKIE["tweet_academie_id_member"], $_POST["tweet"]);

if(isset($_POST["image_name"]))
{
	$image_name = explode("/", $_POST["image_name"])[3];
	$bdd->addImageTweet($image_name, $id_tweet);
}