<?php 

require_once("../model/model.php");
$bdd = new bdd();

$result = $bdd->recupProfileFromPseudo($_POST["user_pseudo"]);
$info_member = $result->fetch();
$id_user = $info_member["id_member"];
$tweet = $bdd->tweets($id_user);
$abo = $bdd->abo($id_user);
$abonnement = $bdd->nbrabo($id_user);

$output = [
	"profile" => $info_member,
	"tweet" => $tweet->fetch(),
	"followed" => $abonnement->fetch(),
	"follower" =>$abo->fetch()
];
if ($_COOKIE["tweet_academie_id_member"] == $info_member["id_member"])
{
	$output['check'] = true;
}
else
{
	$output['check'] = false;
}
echo json_encode($output);

?>