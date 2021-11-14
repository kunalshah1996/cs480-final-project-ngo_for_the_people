CREATE DATABASE  IF NOT EXISTS `ngo_for_the_people` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ngo_for_the_people`;
-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: ngo_for_the_people
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `campaign_id` int NOT NULL,
  `campaign_name` varchar(100) NOT NULL,
  `campaign_details` varchar(1000) DEFAULT NULL,
  `campaign_location` varchar(50) NOT NULL,
  `employee_id` int DEFAULT NULL,
  `campaign_budget` int NOT NULL,
  PRIMARY KEY (`campaign_id`),
  KEY `employee_id` (`employee_id`),
  KEY `campaign_index` (`campaign_name`),
  CONSTRAINT `campaign_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,'Save the Children','The organization shares a newsletter as well as updates our website, informing its users about our programs that reach out to help vulnerable children, number of lives impacted, how the donations have been utilized, etc.Additionally, the communication action is used to encourage the user to make a donation.','Chicago',211,55000),(2,'Unmute,Ask Him (Movember)','ask Him encourages people talk about men mental health','Online',212,5000),(3,'A Moment of Dyslexia','A Moment of Dyslexia shows people what it is really like to be dyslexic','Online',213,6000),(4,'Take Off the Tape','Anxiety is a topic that is worthy of a conversation because a large part of the problem is the shame associated with it','Chicago',214,10000),(5,'Blood Donation','Conducts Blood Donation drives across university campuses and corporate offices for the needy.','NYC',215,6000);
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cause`
--

DROP TABLE IF EXISTS `cause`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cause` (
  `cause_id` int NOT NULL,
  `cause_type` varchar(80) DEFAULT NULL,
  `cause_status` varchar(60) DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  PRIMARY KEY (`cause_id`),
  KEY `approver_id` (`approver_id`),
  KEY `cause_index` (`cause_status`),
  CONSTRAINT `cause_ibfk_1` FOREIGN KEY (`approver_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cause`
--

LOCK TABLES `cause` WRITE;
/*!40000 ALTER TABLE `cause` DISABLE KEYS */;
INSERT INTO `cause` VALUES (1,'Receiver','active',212),(2,'Receiver','active',212),(3,'Receiver','complete',213),(4,'Receiver','active',214),(5,'Receiver','inactive',214),(6,'Education','active',215),(7,'Education','complete',212),(8,'Education','active',212),(9,'Education','inactive',211),(10,'Education','complete',214),(11,'Health','complete',214),(12,'Health','active',213),(13,'Health','complete',213),(14,'Health','complete',215),(15,'Health','complete',212);
/*!40000 ALTER TABLE `cause` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `donation_id` int NOT NULL,
  `donation_donor_id` int DEFAULT NULL,
  `donation_type` varchar(40) DEFAULT NULL,
  `donation_status` varchar(40) NOT NULL,
  PRIMARY KEY (`donation_id`),
  KEY `donation_donor_id` (`donation_donor_id`),
  KEY `donation_index` (`donation_status`),
  CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`donation_donor_id`) REFERENCES `donor` (`donor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (10,10,'Fund','Received'),(12,12,'Fund','Received'),(13,13,'Clothes','Received'),(14,14,'Books','Received'),(15,15,'Food','Not_Received'),(16,16,'Fund','Not_Received');
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `donation_quantity`
--

DROP TABLE IF EXISTS `donation_quantity`;
/*!50001 DROP VIEW IF EXISTS `donation_quantity`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `donation_quantity` AS SELECT 
 1 AS `donor_name`,
 1 AS `donor_id`,
 1 AS `donation_type`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `donor`
--

DROP TABLE IF EXISTS `donor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donor` (
  `donor_id` int NOT NULL,
  `donor_ssn` varchar(9) NOT NULL,
  `donor_name` varchar(50) DEFAULT NULL,
  `donor_contact` int NOT NULL,
  PRIMARY KEY (`donor_id`),
  UNIQUE KEY `donor_id` (`donor_id`,`donor_ssn`),
  KEY `donor_index` (`donor_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor`
--

LOCK TABLES `donor` WRITE;
/*!40000 ALTER TABLE `donor` DISABLE KEYS */;
INSERT INTO `donor` VALUES (10,'123456789','Jason Dsouza',3123831),(12,'123456987','Harsh Jethwani',3123835),(13,'123456879','Mehul Gupta',3137890),(14,'123456978','Vedant Maheshwari',3123234),(15,'123459876','Aakash Gupta',3123889),(16,'123339876','Jane Depaul',3124889);
/*!40000 ALTER TABLE `donor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `cause_id` int NOT NULL,
  `institution_name` varchar(40) DEFAULT NULL,
  `need_type` varchar(40) DEFAULT NULL,
  `need_quantity` int DEFAULT NULL,
  `poc_name` varchar(40) DEFAULT NULL,
  `poc_contact` int NOT NULL,
  PRIMARY KEY (`cause_id`),
  KEY `education_index` (`institution_name`),
  CONSTRAINT `education_ibfk_1` FOREIGN KEY (`cause_id`) REFERENCES `cause` (`cause_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (6,'Dyett High School','Desks',600,'Angela Kinsley',1289876651),(7,'Benito Juarez Community Academy','Laptops',40,'Ryan Howard',1928922221),(8,'Roosevelt High School','English Tutor',1,'Jim Halpert',1782737676),(9,'Gage Park High School','Desks',200,'Dwight Schrute',1834792384),(10,'Mather High School','Notebooks',2000,'Pamela Beesley',1796239228);
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL,
  `employee_name` varchar(40) NOT NULL,
  `employee_contact` int NOT NULL,
  `employee_address` varchar(80) DEFAULT NULL,
  `employee_designation` varchar(40) DEFAULT NULL,
  `employee_department` varchar(40) DEFAULT NULL,
  `employee_availability` varchar(40) DEFAULT NULL,
  `employee_doj` date DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `employee_index` (`employee_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (211,'Chrisitna George',235467890,'3122 Taylor Street, Chicago,IL','Administrative Manager','Administration','unavailable','2017-02-27'),(212,'John Doe',123456789,'3321 W Laflin St, Chicago,IL','Campaign Manager','Campaign','available','2020-02-01'),(213,'Layla Paul',234567890,'1131 W Taylor Street','Executive Manager','Campaign','unavailable','2017-04-21'),(214,'Neha Rodrigues',123457689,'2786 South Street, NYC, NY','Director','Board of Directors','available','2018-02-01'),(215,'Jane Young',238793472,'1018 S Oakley Blvd','Consultant','Public Relations','unavailable','2019-03-07');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `free_employees`
--

DROP TABLE IF EXISTS `free_employees`;
/*!50001 DROP VIEW IF EXISTS `free_employees`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `free_employees` AS SELECT 
 1 AS `employee_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `fund`
--

DROP TABLE IF EXISTS `fund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fund` (
  `fund_donation_id` int NOT NULL,
  `fund_donor_id` int DEFAULT NULL,
  `fund_amount` int NOT NULL,
  `fund_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`fund_donation_id`),
  KEY `fund_donor_id` (`fund_donor_id`),
  KEY `fund_index` (`fund_status`),
  CONSTRAINT `fund_ibfk_1` FOREIGN KEY (`fund_donation_id`) REFERENCES `donation` (`donation_id`),
  CONSTRAINT `fund_ibfk_2` FOREIGN KEY (`fund_donor_id`) REFERENCES `donor` (`donor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fund`
--

LOCK TABLES `fund` WRITE;
/*!40000 ALTER TABLE `fund` DISABLE KEYS */;
INSERT INTO `fund` VALUES (10,10,100,'Allocated'),(12,12,500,'Allocated');
/*!40000 ALTER TABLE `fund` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health`
--

DROP TABLE IF EXISTS `health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health` (
  `cause_id` int NOT NULL,
  `org_name` varchar(40) DEFAULT NULL,
  `need_type` varchar(40) DEFAULT NULL,
  `need_quantity` int DEFAULT NULL,
  `poc_name` varchar(40) DEFAULT NULL,
  `poc_contact` int NOT NULL,
  PRIMARY KEY (`cause_id`),
  KEY `health_index` (`org_name`),
  CONSTRAINT `health_ibfk_1` FOREIGN KEY (`cause_id`) REFERENCES `cause` (`cause_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health`
--

LOCK TABLES `health` WRITE;
/*!40000 ALTER TABLE `health` DISABLE KEYS */;
INSERT INTO `health` VALUES (11,'Methodist Hospital of Chicago','Fund',3000,'Karen Diaz',1876187262),(12,'Kindred Chicago Central Hospital','Fund',2000,'Stanley Hudson',1827398723),(13,'Mount Sinai Hospital','Bed Sheets',600,'Michael Scott',1897389217),(14,'Mercy Hospital & Medical Center','Fund',4000,'Toby Flenderson',1817238971),(15,'La Rabida Children Hospital','Toys',5400,'Rachel Green',187829722);
/*!40000 ALTER TABLE `health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `incomplete_donation`
--

DROP TABLE IF EXISTS `incomplete_donation`;
/*!50001 DROP VIEW IF EXISTS `incomplete_donation`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `incomplete_donation` AS SELECT 
 1 AS `donor_name`,
 1 AS `donor_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `donation_id` int NOT NULL,
  `item_type` varchar(50) NOT NULL,
  `item_quantity` int NOT NULL,
  `item_status` varchar(20) NOT NULL,
  PRIMARY KEY (`donation_id`),
  KEY `item_index` (`item_type`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (13,'Food',5000,'Available'),(14,'Clothes',300,'Available'),(15,'Clothes',2400,'Allocated');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ongoing`
--

DROP TABLE IF EXISTS `ongoing`;
/*!50001 DROP VIEW IF EXISTS `ongoing`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ongoing` AS SELECT 
 1 AS `employee_id`,
 1 AS `employee_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `receiver`
--

DROP TABLE IF EXISTS `receiver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receiver` (
  `cause_id` int NOT NULL,
  `receiver_ssn` int NOT NULL,
  `receiver_name` varchar(50) NOT NULL,
  `receiver_contact` varchar(20) NOT NULL,
  `receiver_income` int NOT NULL,
  `receiver_family` varchar(20) NOT NULL,
  `receiver_location` varchar(20) NOT NULL,
  PRIMARY KEY (`cause_id`),
  KEY `receiver_index` (`receiver_name`),
  CONSTRAINT `receiver_ibfk_1` FOREIGN KEY (`cause_id`) REFERENCES `cause` (`cause_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receiver`
--

LOCK TABLES `receiver` WRITE;
/*!40000 ALTER TABLE `receiver` DISABLE KEYS */;
INSERT INTO `receiver` VALUES (1,121213123,'Daniela Prado','1837349371',2000,'Rodrigo Prado','Chicago'),(2,147394342,'Eric Jagoring','1128748222',5000,'Joanna Jagoring','Atlanta'),(3,198173812,'Amy Nobles','1253678207',4000,'Andrea Nobles','Urbana Champaign'),(4,137826378,'Daniel Ganderton','1263786123',4500,'Jada Ganderton','Aurora'),(5,128278229,'Gabriela Fring','1762889652',3000,'Gustavo Fring','Albuquerque');
/*!40000 ALTER TABLE `receiver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_index` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Kunal Shah','kshah220@uic.edu','12345'),(2,'Samruddhi Kalsekar','skalse2@uic.edu','12345'),(3,'Anjani Sruti Doradla','adorad4@uic.edu','12345'),(4,'Nikita Thakur','nthaku3@uic.edu','12345'),(5,'Diana Diaz','dmdh@uic.edu','12345');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ngo_for_the_people'
--
/*!50003 DROP FUNCTION IF EXISTS `No_of_year_employed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `No_of_year_employed`(date1 date) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE date2 DATE;
	Select current_date()into date2;
	RETURN year(date2)-year(date1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Active_Fund` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Active_Fund`()
BEGIN
Select sum(F.fund_amount) as TOTAL_FUND_ALLOCATION
FROM fund F
INNER JOIN donation D ON F.fund_donation_id = D.donation_id
WHERE D.donation_status = 'Received';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `donation_quantity`
--

/*!50001 DROP VIEW IF EXISTS `donation_quantity`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `donation_quantity` AS select `d`.`donor_name` AS `donor_name`,`d`.`donor_id` AS `donor_id`,`do`.`donation_type` AS `donation_type` from (`donor` `d` join `donation` `do` on((`d`.`donor_id` = `do`.`donation_donor_id`))) where (`do`.`donation_status` = 'Received') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `free_employees`
--

/*!50001 DROP VIEW IF EXISTS `free_employees`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `free_employees` AS select `e`.`employee_id` AS `employee_id` from `employee` `e` where exists(select `campaign`.`employee_id` from `campaign` where (`campaign`.`employee_id` = `e`.`employee_id`)) is false */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `incomplete_donation`
--

/*!50001 DROP VIEW IF EXISTS `incomplete_donation`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `incomplete_donation` AS select `donor`.`donor_name` AS `donor_name`,`donor`.`donor_id` AS `donor_id` from `donor` where exists(select `donation`.`donation_type` from `donation` where ((`donation`.`donation_donor_id` = `donor`.`donor_id`) and (`donation`.`donation_status` = 'Not_Received'))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ongoing`
--

/*!50001 DROP VIEW IF EXISTS `ongoing`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ongoing` AS select `E`.`employee_id` AS `employee_id`,`E`.`employee_name` AS `employee_name` from (`employee` `E` join `cause` `C` on((`C`.`approver_id` = `E`.`employee_id`))) where ((`C`.`cause_status` = 'active') and (`C`.`cause_type` = 'Education')) group by `E`.`employee_id` order by `E`.`employee_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-13 18:32:11
