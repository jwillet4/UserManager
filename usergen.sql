SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `user_management` DEFAULT CHARACTER SET utf8 ;
USE `user_management` ;

DROP TABLE IF EXISTS `user_management`.`user` ;

CREATE TABLE IF NOT EXISTS `user_management`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

DROP TABLE IF EXISTS `user_management`.`group` ;

CREATE TABLE IF NOT EXISTS `user_management`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

DROP TABLE IF EXISTS `user_management`.`user_group` ;

CREATE TABLE IF NOT EXISTS `user_management`.`user_group` (
  `uid` INT NOT NULL,
  `gid` INT NOT NULL,
  INDEX `id_idx` (`uid` ASC),
  INDEX `id_idx1` (`gid` ASC),
  PRIMARY KEY (`uid`, `gid`),
  CONSTRAINT `uid`
    FOREIGN KEY (`uid`)
    REFERENCES `user_management`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `gid`
    FOREIGN KEY (`gid`)
    REFERENCES `user_management`.`group` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

DROP TABLE IF EXISTS `user_management`.`token` ;

CREATE TABLE IF NOT EXISTS `user_management`.`token` (
  `uid` INT NOT NULL,
  `token` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `uid_UNIQUE` (`uid` ASC),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  CONSTRAINT `uid_token`
    FOREIGN KEY (`uid`)
    REFERENCES `user_management`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

START TRANSACTION;
USE `user_management`;
INSERT INTO `user_management`.`user` (`id`, `first_name`, `last_name`, `email`) VALUES (1, 'admin', 'adminson', 'admin@admin.admin');

COMMIT;


START TRANSACTION;
USE `user_management`;
INSERT INTO `user_management`.`group` (`id`, `name`) VALUES (1, 'Cool Dudes');

COMMIT;


START TRANSACTION;
USE `user_management`;
INSERT INTO `user_management`.`user_group` (`uid`, `gid`) VALUES (1, 1);

COMMIT;

