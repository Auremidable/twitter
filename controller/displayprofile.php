<?php
require_once("../model/model.php");
$bdd = new bdd();

$result = $bdd->recupprofile($_COOKIE["tweet_academie_id_member"]);
$tweet = $bdd->tweets($_COOKIE["tweet_academie_id_member"]);
$abo = $bdd->abo($_COOKIE["tweet_academie_id_member"]);
$abonnement = $bdd->nbrabo($_COOKIE["tweet_academie_id_member"]);

$output = [
	"profile" => $result->fetch(),
	"tweet" => $tweet->fetch(),
	"followed" => $abonnement->fetch(),
	"follower" =>$abo->fetch()
];

echo json_encode($output);


?>