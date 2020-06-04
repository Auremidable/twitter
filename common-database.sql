-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  Dim 14 juil. 2019 à 18:30
-- Version du serveur :  10.3.15-MariaDB
-- Version de PHP :  7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `common-database`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment_tweet`
--

CREATE TABLE `comment_tweet` (
  `id_comment_tweet` int(11) NOT NULL,
  `id_tweet` int(11) NOT NULL,
  `id_member` int(11) NOT NULL,
  `date_comment` datetime NOT NULL DEFAULT current_timestamp(),
  `content` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `follow`
--

CREATE TABLE `follow` (
  `id_follow` int(11) NOT NULL,
  `id_follower` int(11) NOT NULL,
  `id_followed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id_image` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `id_tweet` int(11) DEFAULT NULL,
  `id_message` int(11) DEFAULT NULL,
  `id_comment` int(11) DEFAULT NULL,
  `id_retweet` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `like_tweet`
--

CREATE TABLE `like_tweet` (
  `id_like_tweet` int(11) NOT NULL,
  `id_tweet` int(11) DEFAULT NULL,
  `id_comment_tweet` int(11) DEFAULT NULL,
  `id_member` int(11) NOT NULL,
  `date_like` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `member`
--

CREATE TABLE `member` (
  `id_member` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` int(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `profil_image` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `banner_image` varchar(255) NOT NULL,
  `color_theme` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `date_message` datetime NOT NULL DEFAULT current_timestamp(),
  `id_sender` int(11) NOT NULL,
  `id_receiver` int(11) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `retweet`
--

CREATE TABLE `retweet` (
  `id_retweet` int(11) NOT NULL,
  `id_tweet` int(11) NOT NULL,
  `id_member` int(11) NOT NULL,
  `content` varchar(140) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id_tag` int(11) NOT NULL,
  `id_tweet` int(11) NOT NULL,
  `tag_name` varchar(139) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tweet`
--

CREATE TABLE `tweet` (
  `id_tweet` int(11) NOT NULL,
  `id_member` int(11) NOT NULL,
  `content` varchar(140) DEFAULT NULL,
  `tweet_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comment_tweet`
--
ALTER TABLE `comment_tweet`
  ADD PRIMARY KEY (`id_comment_tweet`),
  ADD KEY `id_tweet` (`id_tweet`),
  ADD KEY `id_member` (`id_member`);

--
-- Index pour la table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id_follow`),
  ADD KEY `id_followed` (`id_followed`),
  ADD KEY `id_follower` (`id_follower`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id_image`),
  ADD KEY `id_comment` (`id_comment`),
  ADD KEY `id_message` (`id_message`),
  ADD KEY `id_retweet` (`id_retweet`),
  ADD KEY `id_tweet` (`id_tweet`);

--
-- Index pour la table `like_tweet`
--
ALTER TABLE `like_tweet`
  ADD PRIMARY KEY (`id_like_tweet`),
  ADD KEY `id_comment_tweet` (`id_comment_tweet`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_tweet` (`id_tweet`);

--
-- Index pour la table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id_member`),
  ADD UNIQUE KEY `pseudo` (`pseudo`),
  ADD UNIQUE KEY `email` (`email`,`phone_number`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_receiver` (`id_receiver`),
  ADD KEY `id_sender` (`id_sender`);

--
-- Index pour la table `retweet`
--
ALTER TABLE `retweet`
  ADD PRIMARY KEY (`id_retweet`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_tweet` (`id_tweet`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`),
  ADD KEY `id_tweet` (`id_tweet`);

--
-- Index pour la table `tweet`
--
ALTER TABLE `tweet`
  ADD PRIMARY KEY (`id_tweet`),
  ADD KEY `id_member` (`id_member`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comment_tweet`
--
ALTER TABLE `comment_tweet`
  MODIFY `id_comment_tweet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `follow`
--
ALTER TABLE `follow`
  MODIFY `id_follow` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `like_tweet`
--
ALTER TABLE `like_tweet`
  MODIFY `id_like_tweet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `member`
--
ALTER TABLE `member`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `retweet`
--
ALTER TABLE `retweet`
  MODIFY `id_retweet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tweet`
--
ALTER TABLE `tweet`
  MODIFY `id_tweet` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment_tweet`
--
ALTER TABLE `comment_tweet`
  ADD CONSTRAINT `comment_tweet_ibfk_1` FOREIGN KEY (`id_tweet`) REFERENCES `tweet` (`id_tweet`),
  ADD CONSTRAINT `comment_tweet_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`);

--
-- Contraintes pour la table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`id_followed`) REFERENCES `member` (`id_member`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`id_follower`) REFERENCES `member` (`id_member`);

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_comment`) REFERENCES `comment_tweet` (`id_comment_tweet`),
  ADD CONSTRAINT `image_ibfk_2` FOREIGN KEY (`id_message`) REFERENCES `message` (`id_message`),
  ADD CONSTRAINT `image_ibfk_3` FOREIGN KEY (`id_retweet`) REFERENCES `retweet` (`id_retweet`),
  ADD CONSTRAINT `image_ibfk_4` FOREIGN KEY (`id_tweet`) REFERENCES `tweet` (`id_tweet`);

--
-- Contraintes pour la table `like_tweet`
--
ALTER TABLE `like_tweet`
  ADD CONSTRAINT `like_tweet_ibfk_1` FOREIGN KEY (`id_comment_tweet`) REFERENCES `comment_tweet` (`id_comment_tweet`),
  ADD CONSTRAINT `like_tweet_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`),
  ADD CONSTRAINT `like_tweet_ibfk_3` FOREIGN KEY (`id_tweet`) REFERENCES `tweet` (`id_tweet`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`id_receiver`) REFERENCES `member` (`id_member`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`id_sender`) REFERENCES `member` (`id_member`);

--
-- Contraintes pour la table `retweet`
--
ALTER TABLE `retweet`
  ADD CONSTRAINT `retweet_ibfk_1` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`),
  ADD CONSTRAINT `retweet_ibfk_2` FOREIGN KEY (`id_tweet`) REFERENCES `tweet` (`id_tweet`);

--
-- Contraintes pour la table `tag`
--
ALTER TABLE `tag`
  ADD CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`id_tweet`) REFERENCES `tweet` (`id_tweet`);

--
-- Contraintes pour la table `tweet`
--
ALTER TABLE `tweet`
  ADD CONSTRAINT `tweet_ibfk_1` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
