<?php

require_once("../model/model.php");
$bdd = new bdd();

$infoMember = $bdd->recup_member($_COOKIE["tweet_academie_id_member"]);

echo json_encode($infoMember->fetch());