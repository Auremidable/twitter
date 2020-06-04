<?php

class bdd
{
	protected $_instance;

	public function __construct()
	{
		$options = array(
			PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
		);
		$this->_instance = new PDO("mysql:host=localhost;dbname=common-database", "root", "", $options);
	}

	/* Sign in / Sign up */
	public function check_pseudo($pseudo)
	{
		$req = $this->_instance->prepare("SELECT COUNT(id_member) FROM member WHERE pseudo = ?");
		$req->execute(array($pseudo));
		return $req->fetch();
	}

	public function check_email($email)
	{
		$req = $this->_instance->prepare("SELECT COUNT(id_member) FROM member WHERE email = ?");
		$req->execute(array($email));
		return $req->fetch();
	}

	public function check_phone_number($phone)
	{
		$clean = implode("", explode("-", $phone));
		$clean = implode("", explode(" ", $clean));
		$req = $this->_instance->prepare("SELECT COUNT(id_member) FROM member WHERE phone_number = ?");
		$req->execute(array($clean));
		return $req->fetch();
	}

	public function signup($name, $pseudo, $email, $phone, $password)
	{
		$clean = implode("", explode("-", $phone));
		$clean = implode("", explode(" ", $clean));
		$password = hash("ripemd160", crypt($password, "vive le projet tweet_academy"));
		$req = $this->_instance->prepare("INSERT INTO member(name, pseudo, email, phone_number, password, profil_image, banner_image, color_theme) VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
		$req->execute(array($name, $pseudo, $email, $clean, $password, "default_profile.png", "default_banner.png", "#24B1E1"));
		return $req->errorInfo();
	}

	public function signin($pseudo, $password)
	{
		$real_password = $this->_instance->prepare("SELECT * FROM member WHERE pseudo = ?");
		$real_password->execute(array($pseudo));
		$infos = $real_password->fetch();
		if(hash("ripemd160", crypt($password, "vive le projet tweet_academy")) == $infos["password"])
			return ["error" => false, "infos" => $infos];
		return ["error" => true];
	}


	/* Recommandation */
	public function getFollower($id)
	{
		$follower = $this->_instance->prepare("SELECT * FROM follow WHERE id_follower = ?");
		$follower->execute(array($id));
		return $follower;
	}

	public function getFollowed($id)
	{
		$followed = $this->_instance->prepare("SELECT * FROM follow WHERE id_followed = ?");
		$followed->execute(array($id));
		return $followed;
	}

	public function displayRecommand($id)
	{
		$allfollower = $this->getFollower($id);
		$allidfollower = [];
		while($follower = $allfollower->fetch())
		{
			$allidfollower[] = $follower["id_followed"];

		}

		$condition = '("'. implode('","', $allidfollower) . '")';

		$my_request = $this->_instance->query("SELECT * FROM member WHERE id_member NOT IN ". $condition . " AND id_member != " . $id . " LIMIT 5" );

		$allidnofollower = [];
		while($member = $my_request->fetch())
		{
			$allidnofollower[] = $member;
		}
		return $allidnofollower;
	}

	/* Tweets */
	public function followMember($id_follower, $id_followed)
	{
		$newFollow = $this->_instance->prepare("INSERT INTO follow (id_follower,id_followed) VALUES (?, ?)");
		$newFollow->execute(array($id_follower, $id_followed));
		return $newFollow;
	}

	public function recupprofile($id)
	{
		$infomembre = $this->_instance->prepare("SELECT * FROM member WHERE id_member = ? ");
		$infomembre->execute(array($id));
		return $infomembre;
	}

	public function recupProfileFromPseudo($pseudo)
	{
		$infomembre = $this->_instance->prepare("SELECT * FROM member WHERE pseudo = ? ");
		$infomembre->execute(array($pseudo));
		return $infomembre;
	}

	public function tweets($id)
	{
		$alltweets = $this->_instance->prepare("SELECT COUNT(id_tweet) AS 'tweet' FROM tweet WHERE id_member = ? ");
		$alltweets->execute(array($id));
		return $alltweets;
	}

	public function abo($id)
	{
		$abon = $this->_instance->prepare("SELECT COUNT(id_followed) AS 'followed' FROM follow WHERE id_followed = ? ");
		$abon->execute(array($id));
		return $abon;
	}

	public function nbrabo($id)
	{
		$nbrabon = $this->_instance->prepare("SELECT COUNT(id_follower) AS 'follower' FROM follow WHERE id_follower = ? ");
		$nbrabon->execute(array($id));
		return $nbrabon;
	}

	/* Messagerie */
	public function show_members()
	{
		$request = $this->_instance->query("SELECT * FROM member");
		return $request;
	}

	public function show_all_member($id)
	{
		$request = $this->_instance->prepare("SELECT * FROM member WHERE id_member != ?");
		$request->execute(array($id));
		return $request;
	}

	public function show_member($pseudo)
	{
		$request = $this->_instance->prepare("SELECT * FROM member WHERE pseudo = ?");
		$request->execute(array($pseudo));
		
		return $request;
	}

	public function recup_member($id)
	{
		$request = $this->_instance->prepare("SELECT * FROM member WHERE id_member = ?");
		$request->execute(array($id));
		
		return $request;
	}

	public function show_messages($id)
	{
		$request = $this->_instance->prepare("SELECT *, DATE_FORMAT(date_message, '%d/%m/%Y - %T ') AS 'date_message' FROM message WHERE id_sender = ? OR id_receiver = ?");
		$request->execute(array($id, $id));
		
		return $request;
	}

	public function add_message($idMember1, $idMember2, $content)
	{
		$request = $this->_instance->prepare("INSERT INTO message(id_sender, id_receiver, content) VALUES(?, ?, ?)");
		$request->execute(array($idMember1, $idMember2, $content));
		
		return $request;
	}

	/* Tweet */

	public function createTweet($id_member, $content)
	{
		$request = $this->_instance->prepare("INSERT INTO tweet(id_member, content) VALUES(? ,?)");
		$request->execute(array($id_member, $content));
		return $this->_instance->lastInsertId();
	}

	public function addImageTweet($path, $id_tweet)
	{
		$request = $this->_instance->prepare("INSERT INTO image(`path`, id_tweet) VALUES(? ,?)");
		$request->execute(array($path, $id_tweet));
	}

	public function getTweets($id_member)
	{
		$get_all_followed = $this->getFollower($id_member);
		$all_followed = [];
		while($followed = $get_all_followed->fetch())
		{
			$all_followed[] = $followed["id_followed"];
		}
		$all_followed[] = $id_member;
		$condition_member = '("'. implode('","', $all_followed) . '")';
		
		$get_all_retweets = $this->_instance->prepare("SELECT * FROM retweet WHERE id_member = ?");
		$get_all_retweets->execute(array($id_member));
		$all_retweets = [];
		while($retweet = $get_all_retweets->fetch())
		{
			$all_retweets[] = $retweet["id_tweet"];
		}
		if( count($all_retweets) > 0)
		{
			$condition = '("'. implode('","', $all_retweets) . '")';
			$condition_tweet = " OR id_tweet IN " . $condition;
		}
		else
		{
			$condition_tweet = " AND 1";
		}

		$all_tweets = $this->_instance->query("SELECT *, DATE_FORMAT(tweet_date, '%d/%m/%Y %H:%i') AS 'tweet_date' FROM tweet WHERE id_member IN " . $condition_member . $condition_tweet . " ORDER BY id_tweet DESC");

		return $all_tweets;
	}

	function getInfoTweets($id_tweet)
	{
		$get_nb_retweets = $this->_instance->prepare("SELECT  COUNT(*) AS 'nb_retweet' FROM retweet WHERE id_tweet = ?");
		$get_nb_retweets->execute(array($id_tweet));

		$get_nb_likes = $this->_instance->prepare("SELECT  COUNT(*) AS 'nb_likes' FROM like_tweet WHERE id_tweet = ?");
		$get_nb_likes->execute(array($id_tweet));

		return [
			"nb_retweets" => $get_nb_retweets->fetch()["nb_retweet"],
			"nb_likes" => $get_nb_likes->fetch()["nb_likes"]
		];
	}

	function retweet($id_tweet, $id_member)
	{
		$request = $this->_instance->prepare("INSERT INTO retweet(id_tweet, id_member) VALUES (?, ?)");
		$request->execute(array($id_tweet, $id_member));
	}

	function unRetweet($id_tweet, $id_member)
	{
		$request = $this->_instance->prepare("DELETE FROM retweet WHERE id_tweet = ? AND id_member = ?");
		$request->execute(array($id_tweet, $id_member));
	}

	function like($id_tweet, $id_member)
	{
		$request = $this->_instance->prepare("INSERT INTO like_tweet(id_tweet, id_member) VALUES (?, ?)");
		$request->execute(array($id_tweet, $id_member));
	}

	function unlike($id_tweet, $id_member)
	{
		$request = $this->_instance->prepare("DELETE FROM like_tweet WHERE id_tweet = ? AND id_member = ?");
		$request->execute(array($id_tweet, $id_member));
	}

	function getImageTweet($id_tweet)
	{
		$request = $this->_instance->prepare("SELECT `path` FROM image WHERE id_tweet = ?");
		$request->execute(array($id_tweet));
		return $request;
	}

	function is_rt($id_member, $id_tweet)
	{
		$request = $this->_instance->prepare("SELECT COUNT(*) AS 'nbr_rt' FROM retweet WHERE id_member = ? AND id_tweet = ?");
		$request->execute(array($id_member,  $id_tweet));

		if($request->fetch()["nbr_rt"] == 0)
			return false;
		return true;
	}

	function is_like($id_member, $id_tweet)
	{
		$request = $this->_instance->prepare("SELECT COUNT(*) AS 'nbr_like' FROM like_tweet WHERE id_member = ? AND id_tweet = ?");
		$request->execute(array($id_member,  $id_tweet));

		if($request->fetch()["nbr_like"] == 0)
			return false;
		return true;
	}

	/* Comment */
	public function createComment($id_member, $id_tweet, $content)
	{
		$request = $this->_instance->prepare("INSERT INTO comment_tweet(id_member, id_tweet, content) VALUES(? ,?, ?)");
		$request->execute(array($id_member, $id_tweet, $content));
		return $this->_instance->lastInsertId();
	}

	public function addImageComment($path, $id_comment)
	{
		$request = $this->_instance->prepare("INSERT INTO image(`path`, id_comment) VALUES(? ,?)");
		$request->execute(array($path, $id_comment));
	}
	public function getComments($id_tweet)
	{	
		$get_all_comment = $this->_instance->prepare("SELECT *, DATE_FORMAT(date_comment, '%d/%m/%Y %H:%i') AS 'tweet_date' FROM comment_tweet WHERE id_tweet = ?");
		$get_all_comment->execute(array($id_tweet));
		return $get_all_comment;
	}

	function getImageComment($id_comment)
	{
		$request = $this->_instance->prepare("SELECT `path` FROM image WHERE id_comment = ?");
		$request->execute(array($id_comment));
		return $request;
	}

	/* Search */
	public function getTweetsSearch($keyword)
	{
		$all_tweets = $this->_instance->prepare("SELECT *, DATE_FORMAT(tweet_date, '%d/%m/%Y %H:%i') AS 'tweet_date' FROM tweet WHERE content LIKE ? ORDER BY id_tweet DESC");
		$all_tweets->execute(array("%" . $keyword . "%"));
		
		return $all_tweets;
	}
}