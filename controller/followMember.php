<?php 
require_once("../model/model.php");
$bdd = new bdd();

var_dump($_POST);

$result = $bdd->followMember($_COOKIE["tweet_academie_id_member"],$_POST["id_member"]);
