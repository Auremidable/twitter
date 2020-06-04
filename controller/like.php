<?php

include_once("../model/model.php");
$bdd = new bdd();

switch($_POST["action"])
{
	case "like":
	$bdd->like($_POST["id_tweet"], $_COOKIE["tweet_academie_id_member"]);
	break;
	case "unlike":
	$bdd->unLike($_POST["id_tweet"], $_COOKIE["tweet_academie_id_member"]);
}


echo json_encode(["error" => false]);
