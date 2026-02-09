-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.15.0.7171
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for teeth
CREATE DATABASE IF NOT EXISTS `teeth` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `teeth`;

-- Dumping structure for table teeth.d_log
CREATE TABLE IF NOT EXISTS `d_log` (
  `order_id_log` int(11) DEFAULT NULL,
  `hn_log` varchar(9) NOT NULL,
  `staff_id` varchar(20) NOT NULL,
  `order_datetime_log` date DEFAULT NULL,
  KEY `order_id_log` (`order_id_log`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `d_log_ibfk_1` FOREIGN KEY (`order_id_log`) REFERENCES `order_request` (`order_id`),
  CONSTRAINT `d_log_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.d_log: ~0 rows (approximately)

-- Dumping structure for table teeth.diagnosis
CREATE TABLE IF NOT EXISTS `diagnosis` (
  `order_id` int(11) DEFAULT NULL,
  `prevent` varchar(20) DEFAULT NULL,
  `re_dentistry` varchar(10) DEFAULT NULL,
  `oral_sur` varchar(15) DEFAULT NULL,
  `root_treatment` varchar(15) DEFAULT NULL,
  `endodontics` varchar(20) DEFAULT NULL,
  `gp_disease` varchar(25) DEFAULT NULL,
  KEY `order_id` (`order_id`),
  CONSTRAINT `diagnosis_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_request` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.diagnosis: ~0 rows (approximately)

-- Dumping structure for table teeth.order_request
CREATE TABLE IF NOT EXISTS `order_request` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `hn` varchar(9) DEFAULT NULL,
  `staff_id` varchar(20) DEFAULT NULL,
  `order_datetime` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`order_id`),
  KEY `hn` (`hn`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `order_request_ibfk_1` FOREIGN KEY (`hn`) REFERENCES `patient` (`hn`) ON DELETE CASCADE,
  CONSTRAINT `order_request_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.order_request: ~0 rows (approximately)

-- Dumping structure for table teeth.patient
CREATE TABLE IF NOT EXISTS `patient` (
  `hn` varchar(9) NOT NULL,
  `id_card_p` varchar(15) NOT NULL,
  `title` varchar(15) DEFAULT NULL,
  `patient_name` varchar(100) NOT NULL,
  `patient_lastname` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birthdate` date NOT NULL,
  `phone` varchar(15) NOT NULL,
  `treatment` varchar(20) NOT NULL,
  `c_diseases` varchar(50) DEFAULT NULL,
  `drug_aller` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`hn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.patient: ~0 rows (approximately)

-- Dumping structure for table teeth.report
CREATE TABLE IF NOT EXISTS `report` (
  `order_id` int(11) DEFAULT NULL,
  `t_decay` varchar(5) DEFAULT NULL,
  `t_worn` varchar(5) DEFAULT NULL,
  `t_broken` varchar(5) DEFAULT NULL,
  `t_miss` varchar(5) DEFAULT NULL,
  `t_fill` varchar(5) DEFAULT NULL,
  `t_wisdom` varchar(5) DEFAULT NULL,
  `t_misali` varchar(5) DEFAULT NULL,
  `t_normal` varchar(5) DEFAULT NULL,
  `t_unfill_cavities` int(11) DEFAULT NULL,
  `normal_occ` varchar(5) DEFAULT NULL,
  `deep_bite` varchar(5) DEFAULT NULL,
  `overlap` varchar(5) DEFAULT NULL,
  `inflamed` varchar(5) DEFAULT NULL,
  `t_loose` varchar(5) DEFAULT NULL,
  `bleed` varchar(5) DEFAULT NULL,
  `plaque` varchar(5) DEFAULT NULL,
  `plaque_above` varchar(5) DEFAULT NULL,
  `plaque_under` varchar(5) DEFAULT NULL,
  `jawpian` varchar(5) DEFAULT NULL,
  `clicking` varchar(5) DEFAULT NULL,
  `limit_open` varchar(5) DEFAULT NULL,
  KEY `order_id` (`order_id`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_request` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.report: ~0 rows (approximately)

-- Dumping structure for table teeth.staff
CREATE TABLE IF NOT EXISTS `staff` (
  `staff_id` varchar(20) NOT NULL,
  `id_card` varchar(15) NOT NULL,
  `title` varchar(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `bd` date NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.staff: ~0 rows (approximately)

-- Dumping structure for table teeth.user_account
CREATE TABLE IF NOT EXISTS `user_account` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` varchar(20) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `user_account_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.user_account: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
