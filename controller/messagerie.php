<?php

require_once("../model/model.php");
$bdd = new bdd();

$id = htmlspecialchars($_POST["id"]);

$result = $bdd->show_messages($id);

$array_final = [
	"error" => null,
	"messages" => null
];

if($result->errorCode() == "00000")
{
	$array_final["error"] = false;
	$all_messages = [];
	$all_members = [];
	$members = [];
	while($message = $result->fetch())
	{
		$all_messages[] = $message;
		if ($message["id_receiver"] != $message["id_sender"]) {
			$all_members[] = $message["id_sender"];
			$all_members[] = $message["id_receiver"];	
		}
		if (($key = array_search($id, $all_members)) !== false) {
		    unset($all_members[$key]);
		}
	}
	$array_final["messages"] = $all_messages;
	$all_members = array_unique($all_members);
	foreach ($all_members as $key => $value) {
		$member = $bdd->recup_member($value);
		if ($result->errorCode() == "00000") {
			$array_final["error"] = false;
			$member = $member->fetch();
			$members[] = $member;	
		}
		else
		{
			$array_final["error"] = true;
			$array_final["members"] = "Error : can't load the member.";
		}
	}
	$array_final["members"] = $members; 
}
else
{
	$array_final["error"] = true;
	$array_final["messages"] = "Error : can't load the messages of the member.";
}

echo json_encode($array_final);