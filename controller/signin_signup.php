<?php


require_once("../model/model.php");
$bdd = new bdd();

$output = [
	"error" => null,
	"result" => null
];

switch($_POST["action"])
{
	case "is_cookie":
	if(isset($_COOKIE["tweet_academie_id_member"]))
		$output = ["error" => false, "result" => true];
	else
		$output = ["error" => true, "result" => false];
	break;
	case "check_pseudo":
	if(empty($_POST["data"]["name"]))
	{
		$output["error"] = true;
		$output['result'] = "Please fill Name field.";
	}
	elseif(empty($_POST["data"]["pseudo"]))
	{
		$output["error"] = true;
		$output['result'] = "Please fill pseudo field.";
	}
	else
	{
		$output["error"] = false;
		$output['result'] = $bdd->check_pseudo($_POST["data"]["pseudo"])[0];	
	}
	break;
	case "signup":

	$fields = ["name", "pseudo", "email", "phone", "password", "password_confirm"];

	foreach ($fields as $field) 
	{
		if(empty($_POST["data"][$field]))
		{
			$output["error"] = true;
			$output['result'] = "Please fill " . $field . " field.";

		}
	}

	if($_POST["data"]["password"] != $_POST["data"]["password_confirm"])
	{
		$output["error"] = true;
		$output['result'] = "Your passwords doesn't match.";
	}

	if($bdd->check_email($_POST["data"]["email"])[0] != 0)
	{
		$output["error"] = true;
		$output['result'] = "This email is already associate to an account.";
	}

	if($bdd->check_phone_number($_POST["data"]["phone"])[0] != 0)
	{
		$output["error"] = true;
		$output['result'] = "This phone number is already associate to an account.";
	}

	if(!$output["error"])
	{
		$result = $bdd->signup($_POST["data"]["name"], $_POST["data"]["pseudo"], $_POST["data"]["email"], $_POST["data"]["phone"], $_POST["data"]["password"]);

		if($result[0] != "00000")
		{
			$output["error"] = true;
			$output['result'] = "We encountred an error. Please retry.";
		}
		else
		{
			$output["error"] = false;
			$output['result'] = "Your account was created.";
		}
	}
	break;
	case "signin":
	if($bdd->check_pseudo($_POST["data"]["pseudo"])[0] < 1)
	{
		$output["error"] = true;
		$output['result'] = "This pseudo don't match with any account.";
	}
	else
	{
		$result = $bdd->signin($_POST["data"]["pseudo"], $_POST["data"]["password"]);
		if(!$result["error"])
		{
			setcookie("tweet_academie_color_theme", $result['infos']['color_theme'], time()+3600*10, "/");
			setcookie("tweet_academie_id_member", $result["infos"]["id_member"], time()+60*60*24*365, "/");
			setcookie("tweet_academie_pseudo", $result["infos"]["pseudo"], time()+60*60*24*365, "/");
			$output["error"] = false;
			$output['result'] = "Connexion successful.";
		}
		else
		{
			$output["error"] = true;
			$output['result'] = "Bad password.";
		}
	}
	break;
}


echo json_encode($output);