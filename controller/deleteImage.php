<?php

$output = ["error" => null];
$output["error"] = !unlink($_POST["image_name"]);
echo json_encode($output);
