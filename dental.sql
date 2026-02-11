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

-- Dumping data for table teeth.diagnosis: ~4 rows (approximately)
REPLACE INTO `diagnosis` (`order_id`, `prevent`, `re_dentistry`, `oral_sur`, `root_treatment`, `endodontics`, `gp_disease`) VALUES
	(243, 'ขูดหินปูน', 'อุดฟัน', 'N', 'N', 'N', 'N'),
	(244, 'ขูดหินปูน', 'อุดฟัน', 'ถอนฟัน', 'N', 'N', 'N'),
	(245, 'ขูดหินปูน', 'อุดฟัน', 'ผ่าฟันคุด', 'รักษารากฟัน', 'N', 'N'),
	(246, 'เคลือบฟลูออไรด์', 'N', 'N', 'N', 'N', 'N');

-- Dumping structure for table teeth.order_request
CREATE TABLE IF NOT EXISTS `order_request` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `hn` varchar(9) DEFAULT NULL,
  `staff_id` varchar(20) DEFAULT NULL,
  `order_datetime` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`order_id`),
  KEY `hn` (`hn`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `order_request_ibfk_1` FOREIGN KEY (`hn`) REFERENCES `patient` (`hn`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_request_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.order_request: ~7 rows (approximately)
REPLACE INTO `order_request` (`order_id`, `hn`, `staff_id`, `order_datetime`) VALUES
	(243, 'HN69001', '26304', '2026-02-11 17:09:36'),
	(244, 'HN69007', '26304', '2026-02-11 17:10:30'),
	(245, 'HN69003', '22164', '2026-02-11 17:11:47'),
	(246, 'HN69006', '26315', '2026-02-11 17:12:46'),
	(247, 'HN69002', '26304', '2026-02-11 17:19:17'),
	(249, 'HN69002', '26304', '2026-02-11 17:29:44'),
	(250, 'HN69002', '26304', '2026-02-11 17:51:24');

-- Dumping structure for table teeth.p_h
CREATE TABLE IF NOT EXISTS `p_h` (
  `order_id` int(11) NOT NULL,
  `hn` varchar(9) DEFAULT NULL,
  `id_card_p` varchar(15) DEFAULT NULL,
  `title` varchar(15) DEFAULT NULL,
  `patient_name` varchar(100) DEFAULT NULL,
  `patient_lastname` varchar(100) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `treatment` varchar(20) DEFAULT NULL,
  `c_diseases` varchar(50) DEFAULT NULL,
  `drug_aller` varchar(100) DEFAULT NULL,
  KEY `p_h_ibfk_1` (`order_id`),
  CONSTRAINT `p_h_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_request` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.p_h: ~4 rows (approximately)
REPLACE INTO `p_h` (`order_id`, `hn`, `id_card_p`, `title`, `patient_name`, `patient_lastname`, `birthdate`, `phone`, `treatment`, `c_diseases`, `drug_aller`) VALUES
	(243, 'HN69001', '1100100123456', 'นาย', 'สมชาย', 'สายสะอาด', '1985-05-12', '0812345678', 'ประกันสังคม', 'ไม่มี', 'แพ้ยาเพนิซิลลิน'),
	(244, 'HN69007', '1100700789012', 'นาย', 'อานนท์', 'พึ่งบุญ', '1982-12-10', '0878901234', 'บัตรทอง', 'ไม่มี', 'แพ้ยาแก้อักเสบ'),
	(245, 'HN69003', '1100300345678', 'เด็กชาย', 'ปัญญา', 'ขยันเรียน', '2015-02-14', '0834567890', 'บัตรทอง', 'ไม่มี', 'ไม่มี'),
	(246, 'HN69006', '1100600678901', 'นางสาว', 'นารี', 'มีสุข', '1998-06-25', '0867890123', 'ประกันสังคม', 'หอบหืด', 'ไม่มี');

-- Dumping structure for table teeth.patient
CREATE TABLE IF NOT EXISTS `patient` (
  `hn` varchar(9) NOT NULL,
  `id_card_p` varchar(15) NOT NULL,
  `title` varchar(15) DEFAULT NULL,
  `patient_name` varchar(100) NOT NULL,
  `patient_lastname` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `phone` varchar(15) NOT NULL,
  `treatment` varchar(20) NOT NULL,
  `c_diseases` varchar(50) DEFAULT NULL,
  `drug_aller` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`hn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.patient: ~6 rows (approximately)
REPLACE INTO `patient` (`hn`, `id_card_p`, `title`, `patient_name`, `patient_lastname`, `birthdate`, `phone`, `treatment`, `c_diseases`, `drug_aller`) VALUES
	('HN69002', '1100200234567', 'นางสาว', 'วิมล', 'รักษ์ดี', '1992-11-20', '0823456789', 'ชำระเงินสด', 'ความดันโลหิตสูง', 'ไม่มี'),
	('HN69004', '1100400456789', 'นาง', 'มะลิ', 'หอมนวล', '1960-08-05', '0845678901', 'ชำระเงินสด', 'เบาหวาน', 'แพ้ยากลุ่มซัลฟา'),
	('HN69005', '1100500567890', 'นาย', 'เกรียงไกร', 'กล้าหาญ', '1978-01-30', '0856789012', 'ชำระเงินสด', 'โรคหัวใจ', 'ไม่มี'),
	('HN69008', '1100800890123', 'นาง', 'สมศรี', 'มณีวรรณ', '1955-03-15', '0889012345', 'ชำระเงินสด', 'ไขมันในเลือดสูง', 'ไม่มี'),
	('HN69009', '1100900901234', 'เด็กหญิง', 'แก้วตา', 'น่ารัก', '2018-09-09', '0890123456', 'บัตรทอง', 'ไม่มี', 'ไม่มี'),
	('HN69010', '1101001012345', 'นาย', 'ธนา', 'กิจเจริญ', '1990-07-20', '0912345678', 'ข้าราชการ', 'ไม่มี', 'ไม่มี');

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
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_request` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.report: ~4 rows (approximately)
REPLACE INTO `report` (`order_id`, `t_decay`, `t_worn`, `t_broken`, `t_miss`, `t_fill`, `t_wisdom`, `t_misali`, `t_normal`, `t_unfill_cavities`, `normal_occ`, `deep_bite`, `overlap`, `inflamed`, `t_loose`, `bleed`, `plaque`, `plaque_above`, `plaque_under`, `jawpian`, `clicking`, `limit_open`) VALUES
	(243, 'Y', 'N', 'N', 'N', 'Y', 'N', 'N', 'N', 4, 'Y', 'N', 'N', 'N', 'N', 'N', 'N', 'Y', 'Y', 'N', 'N', 'N'),
	(244, 'Y', 'Y', 'N', 'N', 'Y', 'N', 'N', 'N', 1, 'Y', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'Y', 'N', 'N', 'N'),
	(245, 'Y', 'N', 'Y', 'N', 'Y', 'Y', 'N', 'N', 3, 'N', 'N', 'Y', 'N', 'Y', 'N', 'N', 'Y', 'Y', 'N', 'N', 'N'),
	(246, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'Y', 0, 'Y', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N');

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

-- Dumping data for table teeth.staff: ~4 rows (approximately)
REPLACE INTO `staff` (`staff_id`, `id_card`, `title`, `name`, `lastname`, `department`, `bd`, `phone`, `email`) VALUES
	('00000', '1549900899532', 'นาย', 'วีรัญภัทร', 'เครือน้อย', 'admin', '1996-12-31', '0999999999', 'weeranpat@gmail.com'),
	('22164', '1549900849382', 'ทพญ.', 'พิมพ์ชนก', 'ศรีวรรณ', 'ทันตแพทย์', '1986-07-13', '0912284738', 'pimchanok@gmail.com'),
	('26304', '1549900744821', 'ทพ.', 'กิตติศักดิ์', 'วัฒนโชติ', 'ทันตแพทย์', '1971-07-15', '0978838874', 'kittisak@gmail.com'),
	('26315', '1549900866942', 'ทพ.', 'ณัฐวุฒิ', 'สุขสันต์', 'ทันตแพทย์', '1984-07-22', '0974738372', 'nattawut@gmail.com');

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
  CONSTRAINT `user_account_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table teeth.user_account: ~4 rows (approximately)
REPLACE INTO `user_account` (`user_id`, `staff_id`, `username`, `password_hash`, `role`) VALUES
	(0, '00000', 'admin', '00000', '0'),
	(1, '26304', 'kittisak', '26304', '1'),
	(2, '26315', 'nattawut', '26315', '1'),
	(3, '22164', 'pimchanok', '22164', '1');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
