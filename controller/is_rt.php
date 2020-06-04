<?php

require_once("../model/model.php");
$bdd = new bdd();

$output = [
	"rt" => null
];

$output['rt'] = $bdd->is_rt($_COOKIE["tweet_academie_id_member"], $_POST["id_tweet"]);

echo json_encode($output);