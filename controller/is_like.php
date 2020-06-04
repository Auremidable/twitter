<?php

require_once("../model/model.php");
$bdd = new bdd();

$output = [
	"like" => null
];

$output['like'] = $bdd->is_like($_COOKIE["tweet_academie_id_member"], $_POST["id_tweet"]);

echo json_encode($output);