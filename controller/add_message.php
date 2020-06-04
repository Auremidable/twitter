<?php

require_once("../model/model.php");
$bdd = new bdd();

$id_sender = htmlspecialchars($_POST["id_sender"]);
$id_receiver = htmlspecialchars($_POST["id_receiver"]);
$content = htmlspecialchars($_POST["content"]);

$add = $bdd->add_message($id_sender, $id_receiver, $content);


$array_final = [
	"error" => null,
	"messages" => null
];

if($add->errorCode() == "00000")
{
	$array_final["error"] = false;
	$array_final["messages"] = $content;
}
else
{
	$array_final["error"] = true;
	$array_final["messages"] = "Error : the message can't be added.";
}

echo json_encode($array_final);