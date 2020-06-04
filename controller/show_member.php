<?php

require_once("../model/model.php");
$bdd = new bdd();

$result = $bdd->show_member($_COOKIE["tweet_academie_pseudo"]);

$array_final = [
	"error" => null,
	"result" => null
];

if($result->errorCode() == "00000")
{
	$array_final["error"] = false;
	$member = $result->fetch();
	$array_final["result"] = $member;
}
else
{
	$array_final["error"] = true;
	$array_final["result"] = "Error : can't load the member.";
}

echo json_encode($array_final);