<?php

require_once("../model/model.php");
$bdd = new bdd();

$output = [
	"error" => false,
	"result" => null
];


$output["result"] = $bdd->recupprofile($_POST["id_twittos"])->fetch();

echo json_encode($output);