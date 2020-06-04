<?php

setcookie("tweet_academie_id_member", "", time() - 3600, "/");

header("Location: index.html");