ROP DATABASE IF EXISTS `orientation_retake`;
CREATE DATABASE `orientation_retake` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `orientation_retake`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reporter` int(10) unsigned NOT NULL,
  `manufacturer` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `serial_number` int(11) unsigned NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `reported_at` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `pk_tickets_users_idx` (`reporter`),
  CONSTRAINT `pk_tickets_users` FOREIGN KEY (`reporter`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO 
  users (name)
VALUES
  ('Egg'),
  ('Tom'),
  ('Angelina'),
  ('Brian'),
  ('Leslie'),
  ('Mandy'),
  ('Christie'),
  ('Lauren');

INSERT INTO 
  tickets (reporter, manufacturer, serial_number, description, reported_at)
VALUES
  (1, 'dell', 123456789, 'screen pixel error', '2018-01-16'),
  (4, 'dell', 987654321, 'touchpad is not working', '2018-01-17'),
  (7, 'lenovo', 462587618, 'doesn\'t boot', '2018-01-19');