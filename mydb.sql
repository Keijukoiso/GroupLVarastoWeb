-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 27, 2021 at 11:57 AM
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
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `kayttaja`
--

DROP TABLE IF EXISTS `kayttaja`;
CREATE TABLE IF NOT EXISTS `kayttaja` (
  `kayttaja_nimi` varchar(45) DEFAULT NULL,
  `kayttaja_rooli` enum('admin','kayttaja') DEFAULT NULL,
  `salasana` varchar(45) DEFAULT NULL,
  `idKAYTTAJA` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idKAYTTAJA`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kayttaja`
--

INSERT INTO `kayttaja` (`kayttaja_nimi`, `kayttaja_rooli`, `salasana`, `idKAYTTAJA`) VALUES
('HEIKKI', 'admin', 'L3NTOkone', 1),
('TOMMI', 'kayttaja', 'Tietokone2', 2),
('TIINA', 'admin', 'palJONkamaa', 3),
('PENTTI', 'kayttaja', 'olenpasLUOVA', 4),
('MAIJA', 'kayttaja', 'Tietokone', 5),
('LEENA', 'kayttaja', 'mun4Kokkeli', 6),
('PETRA', 'kayttaja', 'mMmBaCoN', 7),
('VENLA', 'kayttaja', 'TohtoriK', 8),
('TONI', 'kayttaja', 'jAlkApAllo', 9),
('JOONAS', 'kayttaja', 'JoJoreferenc3', 10);

-- --------------------------------------------------------

--
-- Table structure for table `lainaus`
--

DROP TABLE IF EXISTS `lainaus`;
CREATE TABLE IF NOT EXISTS `lainaus` (
  `idLAINAUS` int(11) NOT NULL AUTO_INCREMENT,
  `lainaus_maara` int(11) DEFAULT NULL,
  `lainaus_pvm` date DEFAULT NULL,
  `KAYTTAJA_idKAYTTAJA` int(11) NOT NULL,
  `TUOTE_idTUOTE` int(11) NOT NULL,
  PRIMARY KEY (`idLAINAUS`),
  KEY `fk_LAINAUS_KAYTTAJA1_idx` (`KAYTTAJA_idKAYTTAJA`),
  KEY `fk_LAINAUS_TUOTE1_idx` (`TUOTE_idTUOTE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lainaus`
--

INSERT INTO `lainaus` (`idLAINAUS`, `lainaus_maara`, `lainaus_pvm`, `KAYTTAJA_idKAYTTAJA`, `TUOTE_idTUOTE`) VALUES
(1, 4, '2015-03-24', 2, 4),
(2, 4, '2021-02-12', 5, 6),
(3, 6, '2021-01-01', 2, 7),
(4, 7, '2018-02-22', 1, 3),
(5, 7, '2020-01-05', 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `sijainti`
--

DROP TABLE IF EXISTS `sijainti`;
CREATE TABLE IF NOT EXISTS `sijainti` (
  `idSIJAINTI` int(11) NOT NULL AUTO_INCREMENT,
  `hyllykkö_tunnus` char(1) DEFAULT NULL,
  `hylly_nro` int(11) DEFAULT NULL,
  `hylly_sektori` enum('vasen','keski','oikea') DEFAULT NULL,
  PRIMARY KEY (`idSIJAINTI`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sijainti`
--

INSERT INTO `sijainti` (`idSIJAINTI`, `hyllykkö_tunnus`, `hylly_nro`, `hylly_sektori`) VALUES
(1, 'A', 1, 'vasen'),
(2, 'A', 1, 'keski'),
(3, 'A', 1, 'oikea'),
(4, 'A', 2, 'vasen'),
(5, 'A', 2, 'keski'),
(6, 'A', 2, 'oikea'),
(7, 'A', 3, 'vasen'),
(8, 'A', 3, 'keski'),
(9, 'A', 3, 'oikea'),
(10, 'B', 1, 'vasen'),
(11, 'B', 1, 'keski'),
(12, 'B', 1, 'oikea'),
(13, 'B', 2, 'vasen'),
(14, 'B', 2, 'keski'),
(15, 'B', 2, 'oikea'),
(16, 'B', 3, 'vasen'),
(17, 'B', 3, 'keski'),
(18, 'B', 3, 'oikea'),
(19, 'C', 1, 'vasen'),
(20, 'C', 1, 'keski'),
(21, 'C', 1, 'oikea'),
(22, 'C', 2, 'vasen'),
(23, 'C', 2, 'keski'),
(24, 'C', 2, 'oikea'),
(25, 'C', 3, 'vasen'),
(26, 'C', 3, 'keski'),
(27, 'C', 3, 'oikea');

-- --------------------------------------------------------

--
-- Table structure for table `tilaus`
--

DROP TABLE IF EXISTS `tilaus`;
CREATE TABLE IF NOT EXISTS `tilaus` (
  `idTILAUS` int(11) NOT NULL AUTO_INCREMENT,
  `maara` int(11) DEFAULT NULL,
  `tilaus_pvm` date DEFAULT NULL,
  `TOIMITTAJA_idTOIMITTAJA` int(11) NOT NULL,
  `TUOTE_idTUOTE` int(11) NOT NULL,
  PRIMARY KEY (`idTILAUS`),
  KEY `fk_TILAUS_TOIMITTAJA1_idx` (`TOIMITTAJA_idTOIMITTAJA`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tilaus`
--

INSERT INTO `tilaus` (`idTILAUS`, `maara`, `tilaus_pvm`, `TOIMITTAJA_idTOIMITTAJA`, `TUOTE_idTUOTE`) VALUES
(1, 35, '2010-04-25', 3, 2),
(2, 350, '2013-12-05', 3, 1),
(3, 654, '2012-01-01', 1, 8),
(4, 5, '2018-03-24', 2, 3),
(5, 3482, '2010-04-26', 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `toimittaja`
--

DROP TABLE IF EXISTS `toimittaja`;
CREATE TABLE IF NOT EXISTS `toimittaja` (
  `idTOIMITTAJA` int(11) NOT NULL AUTO_INCREMENT,
  `toimittaja_nimi` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTOIMITTAJA`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `toimittaja`
--

INSERT INTO `toimittaja` (`idTOIMITTAJA`, `toimittaja_nimi`) VALUES
(1, 'ALKEMIA OY'),
(2, 'SUOMENLABRA KAMAT'),
(3, 'LABRALÄHETIT');

-- --------------------------------------------------------

--
-- Table structure for table `tuote`
--

DROP TABLE IF EXISTS `tuote`;
CREATE TABLE IF NOT EXISTS `tuote` (
  `idTUOTE` int(11) NOT NULL AUTO_INCREMENT,
  `tuote_nimi` varchar(45) DEFAULT NULL,
  `maara` int(11) DEFAULT NULL,
  `kategoria` varchar(45) DEFAULT NULL,
  `TOIMITTAJA_idTOIMITTAJA` int(11) NOT NULL,
  `SIJAINTI_idSIJAINTI` int(11) NOT NULL,
  PRIMARY KEY (`idTUOTE`),
  KEY `fk_TUOTE_TOIMITTAJA_idx` (`TOIMITTAJA_idTOIMITTAJA`),
  KEY `fk_TUOTE_SIJAINTI1_idx` (`SIJAINTI_idSIJAINTI`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tuote`
--

INSERT INTO `tuote` (`idTUOTE`, `tuote_nimi`, `maara`, `kategoria`, `TOIMITTAJA_idTOIMITTAJA`, `SIJAINTI_idSIJAINTI`) VALUES
(1, 'PIPETTI 5ml', 300, 'LABRAVÄLINE', 1, 5),
(2, 'KUMIHANSKA XXL', 50, 'SUOJAVARUSTE', 2, 1),
(3, 'KUMIHANSKA L', 100, 'SUOJAVARUSTE', 2, 1),
(4, 'SUOJALASIT', 50, 'SUOJAVARUSTE', 1, 11),
(5, 'KOEPUTKI 25ml', 300, 'LABRAVÄLINE', 2, 16),
(6, 'NEULA', 500, 'LABRAVÄLINE', 2, 8),
(7, 'PETRILASI 100ml', 300, 'LABRAVÄLINE', 3, 5),
(8, 'PIPETTI 10ml', 400, 'LABRAVÄLINE', 3, 4),
(9, 'PIPETTI 15ml', 300, 'LABRAVÄLINE', 3, 10),
(10, 'KAASUPULLO', 10, 'LABRAVÄLINE', 1, 23);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lainaus`
--
ALTER TABLE `lainaus`
  ADD CONSTRAINT `fk_LAINAUS_KAYTTAJA1` FOREIGN KEY (`KAYTTAJA_idKAYTTAJA`) REFERENCES `kayttaja` (`idKAYTTAJA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_LAINAUS_TUOTE1` FOREIGN KEY (`TUOTE_idTUOTE`) REFERENCES `tuote` (`idTUOTE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tilaus`
--
ALTER TABLE `tilaus`
  ADD CONSTRAINT `fk_TILAUS_TOIMITTAJA1` FOREIGN KEY (`TOIMITTAJA_idTOIMITTAJA`) REFERENCES `toimittaja` (`idTOIMITTAJA`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tuote`
--
ALTER TABLE `tuote`
  ADD CONSTRAINT `fk_TUOTE_SIJAINTI1` FOREIGN KEY (`SIJAINTI_idSIJAINTI`) REFERENCES `sijainti` (`idSIJAINTI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TUOTE_TOIMITTAJA` FOREIGN KEY (`TOIMITTAJA_idTOIMITTAJA`) REFERENCES `toimittaja` (`idTOIMITTAJA`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
