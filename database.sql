-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sudoku
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(90) NOT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'user',
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(90) NOT NULL,
  `time` varchar(45) NOT NULL,
  `login` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Vũ Đức Tài','user','apeiron','a','apeironisme@gmail.com','2023-07-08 01:46:35','2023-07-10 16:18:46'),(2,'Vũ Đức Tài','admin','admin','a','meorung922003@gmail.com','2023-07-08 01:47:37','2023-07-10 16:16:23'),(17,'Mai Anh Việt','admin','Vietdz','a','viet.ma212350@sis.hust.edu.vn','2023-07-09 19:30:54','2023-07-09 20:07:25'),(19,'Nguyễn Văn Cường','admin','cuongdz','a','Cuongdz@gmail.com','2023-07-09 19:40:53',NULL),(35,'Nguyễn Bích Hằng','user','nbh69','a','nbh2003@gmail.com','2023-07-09 20:14:53','2023-07-09 20:15:03');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `content` varchar(255) NOT NULL,
  `rate` varchar(45) NOT NULL,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,'apeiron','Mãi mới thắng 1 màn','5','2023-07-09 15:15:08'),(17,'apeiron','Game hay','5','2023-07-09 19:10:12'),(19,'apeiron','Anh Cường đz on top!','5','2023-07-10 09:23:45'),(20,'apeiron','có cài đầu ****','5','2023-07-10 13:48:47'),(21,'apeiron','Test cmt','5','2023-07-10 15:17:16');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puzzles`
--

DROP TABLE IF EXISTS `puzzles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puzzles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `puzzle` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puzzles`
--

LOCK TABLES `puzzles` WRITE;
/*!40000 ALTER TABLE `puzzles` DISABLE KEYS */;
INSERT INTO `puzzles` VALUES (1,',,,2,6,,7,,1,6,8,,7,,,,9,,1,9,,,,4,5,,,8,2,,1,,,,4,,,,4,6,,2,9,,,,5,,,,3,,2,8,,,9,3,,,,7,4,,4,,,5,,,3,6,7,,3,,1,8,,,'),(2,',,,2,6,,7,,1,6,8,,7,,,,9,,1,9,,,,4,5,,,8,2,,1,,,,4,,,,4,6,,2,9,,,,5,,,,3,,2,8,,,9,3,,,,7,4,,4,,,5,,,3,6,7,,3,,1,8,,,'),(10,'7,,,,,,,4,,2,8,,5,7,,,,,,6,,1,,3,,,8,8,,6,9,2,1,7,,5,1,,5,,,,,2,,9,,3,7,6,,8,1,4,6,,,,,,3,,7,,1,,,3,,,,,,,,2,,7,4,6,'),(11,'9,,,5,6,8,4,,7,,,,,,,9,1,,2,,5,1,9,,6,,,,1,,,7,,,,,,,4,9,,,,,1,7,6,2,8,5,,3,,,5,,3,2,,,,6,4,,,7,6,8,,1,3,,1,,,,,4,5,9,'),(12,'9,,,5,6,8,4,,7,,,,,,,9,1,,2,,5,1,9,,6,,,,1,,,7,,,,,,,4,9,,,,,1,7,6,2,8,5,,3,,,5,,3,2,,,,6,4,,,7,6,8,,1,3,,1,,,,,4,5,9,'),(13,',,,,,,7,,6,,7,,9,,6,3,,,,5,,4,7,3,8,9,,1,3,2,,,5,,7,9,,,4,2,1,,5,3,8,,9,,,,4,,,,,2,7,,6,8,,1,3,,,,,4,,,8,,6,,,,9,7,,,4'),(14,',,,5,,8,6,,1,,,4,,,,,3,,5,,,,1,3,,,,9,5,,,7,1,2,6,4,4,7,,6,,,,,,2,3,,4,8,9,1,5,,6,,9,,,,7,1,,,,5,,9,,4,,3,1,,,8,,,,,'),(15,',,3,,,5,,,,,9,8,,,,,3,4,,6,,9,,,1,,2,1,,7,5,9,2,,6,3,4,,2,,,8,,,,6,,9,4,3,,2,8,7,,2,,,,,,1,,,,,,5,6,3,,8,,,6,3,1,,,,'),(16,'2,7,6,,1,3,,,,,4,,8,7,,,,,,,8,6,9,,7,,2,,5,1,,6,9,,3,,,,,,,1,5,4,,,8,,7,3,,,9,,5,1,,,2,6,8,,3,3,6,7,1,,,9,,,,,,,4,,,6,'),(17,'1,,,,,,,,,,,,2,,,,,,,,,,,,3,,,,4,,,,,,,,,,,,5,,,,,,,,,,,,,6,,,7,,,,,,,,,,,,8,,,,,,,,,,,9,'),(18,',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
/*!40000 ALTER TABLE `puzzles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-10 17:28:36
