-- Volcando estructura de base de datos para kodoti_wallet
CREATE DATABASE IF NOT EXISTS `kodoti_wallet` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `kodoti_wallet`;

-- Volcando estructura para tabla kodoti_wallet.auth_user
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.