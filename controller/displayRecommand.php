<?php
require_once("../model/model.php");
$bdd = new bdd();

$result = $bdd->displayRecommand($_COOKIE["tweet_academie_id_member"]);
echo json_encode(["result" => $result, "color" => $_COOKIE["tweet_academie_color_theme"]]);
