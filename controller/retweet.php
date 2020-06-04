<?php

include_once("../model/model.php");
$bdd = new bdd();

switch($_POST["action"])
{
	case "rt":
	$bdd->retweet($_POST["id_tweet"], $_COOKIE["tweet_academie_id_member"]);
	break;
	case "unrt":
	$bdd->unRetweet($_POST["id_tweet"], $_COOKIE["tweet_academie_id_member"]);
}

echo json_encode(["error" => false]);