<?php

require_once("../model/model.php");
$bdd = new bdd();

$id_sender = htmlspecialchars($_POST["id"]);

$members = $bdd->show_all_member($id_sender);

$array_final = [
	"error" => null,
	"messages" => null,
	"members" => null
];

if($members->errorCode() == "00000")
{
	$array_final["error"] = false;
	$all_members = [];
	while($member = $members->fetch())
	{
		$all_members[] = $member;
	}
	$array_final["members"] = $all_members;
}
else
{
	$array_final["error"] = true;
	$array_final["messages"] = "Error : the members list can't be loaded";
}

echo json_encode($array_final);