<?php

$output = [
	"error" => null,
	"result" => null
];

$image = $_FILES["user_picture"];

if($image["name"] != "")
{
	if($image["error"] == 0)
	{
		if($image["type"] == "image/png" || $image["type"] == "image/jpeg")
		{
			if($image["size"] > 2500000)
			{
				$output = ["error" => true,"result" => "Your picture is too heavy."];
			}
		}
		else
		{
			$output = ["error" => true,"result" => "Only PNG and JPG were allowed."];
		}
	}
	else
	{
		$output = ["error" => true,"result" => "We've encountred an error while uploading. Please retry."];
	}
}
else
{
	$output = ["error" => true,"result" => "Please choose an image"];
}

if(!$output["error"])
{
	ini_set('memory_limit', '-1');
	$output_image = null;
	/* TEMPORARY */
	setcookie("tweet_academie_id_member", 1, time()+60*60*24*365);
	$new_name = $_POST['output'] == "false" ? "profile_pic_" . $_COOKIE["tweet_academie_id_member"] . ".png" : "tweet_" . time() . "_image.png";
	move_uploaded_file($image["tmp_name"], "../../view/image/" . $new_name);
	$res = null;
	switch ($image["type"])
	{
		case 'image/jpeg':
		$res = imagecreatefromjpeg("../../view/image/" . $new_name);
		break;
		case 'image/png':
		$res = imagecreatefrompng("../../view/image/" . $new_name);
		break;
		break;
	}

	if($_POST["square"] == "true")
	{
		$shiftX = 0;
		$shiftY = 0;
		if(imagesx($res) < imagesy($res))
			$shiftY = (max(imagesx($res), imagesy($res)) - min(imagesx($res), imagesy($res))) / 2;
		else
			$shiftX = (max(imagesx($res), imagesy($res)) - min(imagesx($res), imagesy($res))) / 2;
		
		$size = min(imagesx($res), imagesy($res));
		$square = imagecrop($res, ['x' => $shiftX, 'y' => $shiftY, 'width' => $size, 'height' => $size]);
		if ($square !== FALSE)
		{
			if($size > 600)
			{
				$new_image = imagecreatetruecolor(600, 600);
				imagecopyresampled($new_image, $square, 0, 0, 0, 0, 600, 600, $size, $size);
				$square = $new_image;

			}
			imagepng($square, "../../view/image/" . $new_name);
			if($_POST['output'] != "false")
				$output_image = "../view/image/" . $new_name;
			imagedestroy($square);
		}
		imagedestroy($res);
	}
	else
	{
		imagepng($res, "../../view/image/" . $new_name);
		if($_POST['output'] != "false")
			$output_image = "../view/image/" . $new_name;
		imagedestroy($res);
	}

	if($output_image == null)
	{
		$output = ["error" => false,"result" => "Profile image correctly uploaded."];
	}
	else
	{
		$output = ["error" => false,"result" => "Image correctly uploaded. ","image" => $output_image];
	}
}

echo json_encode($output);
