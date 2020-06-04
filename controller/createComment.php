<?php

require_once("../model/model.php");
$bdd = new bdd();

$id_comment = $bdd->createComment($_COOKIE["tweet_academie_id_member"], $_POST["id_tweet"], $_POST["tweet"]);

if(isset($_POST["image_name"]))
{
	$image_name = explode("/", $_POST["image_name"])[3];
	$bdd->addImageComment($image_name, $id_comment);
}