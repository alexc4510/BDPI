-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: plant_characteristics_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `characteristics`
--

DROP TABLE IF EXISTS `characteristics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characteristics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `importance` enum('High','Medium','Low') DEFAULT 'Medium',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characteristics`
--

LOCK TABLES `characteristics` WRITE;
/*!40000 ALTER TABLE `characteristics` DISABLE KEYS */;
INSERT INTO `characteristics` VALUES (1,'Color','Red',NULL,'High'),(2,'Height','2m','cm','Medium'),(3,'Water Requirement','Moderate','liters','Medium'),(4,'Fragrance','Yes',NULL,'High'),(5,'Season','Summer',NULL,'Low'),(6,'Leaves Type','Broad',NULL,'Medium');
/*!40000 ALTER TABLE `characteristics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantcharacteristics`
--

DROP TABLE IF EXISTS `plantcharacteristics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plantcharacteristics` (
  `plant_id` int NOT NULL,
  `characteristic_id` int NOT NULL,
  `note` text,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`plant_id`,`characteristic_id`),
  KEY `characteristic_id` (`characteristic_id`),
  CONSTRAINT `plantcharacteristics_ibfk_1` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `plantcharacteristics_ibfk_2` FOREIGN KEY (`characteristic_id`) REFERENCES `characteristics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantcharacteristics`
--

LOCK TABLES `plantcharacteristics` WRITE;
/*!40000 ALTER TABLE `plantcharacteristics` DISABLE KEYS */;
INSERT INTO `plantcharacteristics` VALUES (1,1,'Rose has a vibrant red color.','2025-01-18 11:25:53'),(1,4,'Rose is known for its strong fragrance.','2025-01-18 11:25:53'),(2,2,'Cactus grows to around 2 meters tall in the wild.','2025-01-18 11:25:53'),(2,3,'Cactus requires very little water.','2025-01-18 11:25:53'),(3,6,'Oak trees have broad leaves for photosynthesis.','2025-01-18 11:25:53'),(4,5,'Basil is best grown in summer.','2025-01-18 11:25:53'),(5,4,'Lavender has a soothing fragrance that attracts bees.','2025-01-18 11:25:53');
/*!40000 ALTER TABLE `plantcharacteristics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plants`
--

DROP TABLE IF EXISTS `plants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `scientific_name` varchar(255) DEFAULT NULL,
  `description` text,
  `origin` varchar(255) DEFAULT NULL,
  `type` enum('Flower','Tree','Shrub','Herb','Cactus','Other') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plants`
--

LOCK TABLES `plants` WRITE;
/*!40000 ALTER TABLE `plants` DISABLE KEYS */;
INSERT INTO `plants` VALUES (1,'Rose','Rosa indica','A beautiful and fragrant flower, typically red.','Asia','Flower'),(2,'Cactus','Cactaceae','A resilient plant that thrives in arid environments.','America','Cactus'),(3,'Oak','Quercus robur','A large, strong tree commonly found in forests.','Europe','Tree'),(4,'Basil','Ocimum basilicum','A herb used widely in cooking.','India','Herb'),(5,'Lavender','Lavandula','A fragrant shrub with purple flowers.','Mediterranean','Shrub'),(6,'Edelweiss','Leontopodium alpinum','A rare and iconic alpine flower with delicate white, woolly petals arranged in a star shape.','Europe (Alps, Carpathians, and other European mountain ranges)','Flower');
/*!40000 ALTER TABLE `plants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-27 16:07:09
