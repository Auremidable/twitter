<?php

require_once("../model/model.php");
$bdd = new bdd();

$output["nbr_result"] = $bdd->check_pseudo($_POST["pseudo"]);

echo json_encode($output);