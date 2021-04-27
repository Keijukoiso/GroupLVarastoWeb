-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`TOIMITTAJA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TOIMITTAJA` (
  `idTOIMITTAJA` INT NOT NULL AUTO_INCREMENT,
  `toimittaja_nimi` VARCHAR(45) NULL,
  PRIMARY KEY (`idTOIMITTAJA`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SIJAINTI`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SIJAINTI` (
  `idSIJAINTI` INT NOT NULL AUTO_INCREMENT,
  `hyllykkö_tunnus` CHAR(1) NULL,
  `hylly_nro` INT NULL,
  `hylly_sektori` ENUM('vasen', 'keski', 'oikea') NULL,
  PRIMARY KEY (`idSIJAINTI`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TUOTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TUOTE` (
  `idTUOTE` INT NOT NULL AUTO_INCREMENT,
  `tuote_nro` VARCHAR(45) NULL,
  `tuote_nimi` VARCHAR(100) NULL,
  `maara` INT NULL,
  `kategoria` VARCHAR(45) NULL,
  `TOIMITTAJA_idTOIMITTAJA` INT NOT NULL,
  `SIJAINTI_idSIJAINTI` INT NOT NULL,
  PRIMARY KEY (`idTUOTE`),
  INDEX `fk_TUOTE_TOIMITTAJA_idx` (`TOIMITTAJA_idTOIMITTAJA` ASC),
  INDEX `fk_TUOTE_SIJAINTI1_idx` (`SIJAINTI_idSIJAINTI` ASC),
  CONSTRAINT `fk_TUOTE_TOIMITTAJA`
    FOREIGN KEY (`TOIMITTAJA_idTOIMITTAJA`)
    REFERENCES `mydb`.`TOIMITTAJA` (`idTOIMITTAJA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TUOTE_SIJAINTI1`
    FOREIGN KEY (`SIJAINTI_idSIJAINTI`)
    REFERENCES `mydb`.`SIJAINTI` (`idSIJAINTI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TILAUS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TILAUS` (
  `idTILAUS` INT NOT NULL AUTO_INCREMENT,
  `maara` INT NULL,
  `tilaus_pvm` DATE NULL,
  `TOIMITTAJA_idTOIMITTAJA` INT NOT NULL,
  `TUOTE_idTUOTE` INT NOT NULL,
  PRIMARY KEY (`idTILAUS`),
  INDEX `fk_TILAUS_TOIMITTAJA1_idx` (`TOIMITTAJA_idTOIMITTAJA` ASC),
  CONSTRAINT `fk_TILAUS_TOIMITTAJA1`
    FOREIGN KEY (`TOIMITTAJA_idTOIMITTAJA`)
    REFERENCES `mydb`.`TOIMITTAJA` (`idTOIMITTAJA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`KAYTTAJA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`KAYTTAJA` (
  `kayttaja_nimi` VARCHAR(45) NULL,
  `kayttaja_rooli` ENUM('admin', 'kayttaja') NULL,
  `salasana` VARCHAR(45) NULL,
  `idKAYTTAJA` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idKAYTTAJA`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`LAINAUS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`LAINAUS` (
  `idLAINAUS` INT NOT NULL AUTO_INCREMENT,
  `lainaus_maara` INT NULL,
  `lainaus_pvm` DATE NULL,
  `KAYTTAJA_idKAYTTAJA` INT NOT NULL,
  `TUOTE_idTUOTE` INT NOT NULL,
  PRIMARY KEY (`idLAINAUS`),
  INDEX `fk_LAINAUS_KAYTTAJA1_idx` (`KAYTTAJA_idKAYTTAJA` ASC),
  INDEX `fk_LAINAUS_TUOTE1_idx` (`TUOTE_idTUOTE` ASC),
  CONSTRAINT `fk_LAINAUS_KAYTTAJA1`
    FOREIGN KEY (`KAYTTAJA_idKAYTTAJA`)
    REFERENCES `mydb`.`KAYTTAJA` (`idKAYTTAJA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LAINAUS_TUOTE1`
    FOREIGN KEY (`TUOTE_idTUOTE`)
    REFERENCES `mydb`.`TUOTE` (`idTUOTE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
