-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 28, 2020 at 01:12 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yrityskanta`
--

-- --------------------------------------------------------

--
-- Table structure for table `yritys`
--

DROP TABLE IF EXISTS `yritys`;
CREATE TABLE IF NOT EXISTS `yritys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nimi` text NOT NULL,
  `ytunnus` text NOT NULL,
  `osoite` text NOT NULL,
  `toimiala_id` int(11) NOT NULL,
  `olemassa` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `toimiala_id` (`toimiala_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `yritys`
--

INSERT INTO `yritys` (`id`, `nimi`, `ytunnus`, `osoite`, `toimiala_id`, `olemassa`) VALUES
(1, 'Yritys1', 'Y1', 'Kadunnimi 1', 1, 1),
(2, 'Yritys2', 'Y2', 'Kadunnimi 2', 2, 1),
(5, 'Yritys3', 'Y3', 'osoite3', 3, 0),
(7, 'Yritys5', 'Y5', 'Osoit5', 3, 1),
(8, 'Yritys8', 'Y8', 'Osoite8', 2, 1),
(9, 'Yritys9', 'Y9', 'Osoite', 2, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `yritys`
--
ALTER TABLE `yritys`
  ADD CONSTRAINT `yritys_ibfk_1` FOREIGN KEY (`toimiala_id`) REFERENCES `toimiala` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
