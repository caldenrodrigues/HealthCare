-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: Healthcare
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Doctor`
--

DROP TABLE IF EXISTS `Doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Doctor` (
  `d_id` int(11) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `contact` varchar(10) DEFAULT NULL,
  `specialization` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Doctor`
--

LOCK TABLES `Doctor` WRITE;
/*!40000 ALTER TABLE `Doctor` DISABLE KEYS */;
INSERT INTO `Doctor` VALUES (201,'Rajasi','8913712345','ENT');
/*!40000 ALTER TABLE `Doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Patient`
--

DROP TABLE IF EXISTS `Patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Patient` (
  `p_id` int(11) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `address` varchar(10) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `contact` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient`
--

LOCK TABLES `Patient` WRITE;
/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;
INSERT INTO `Patient` VALUES (101,'Calden','Marol',21,'8913723894');
/*!40000 ALTER TABLE `Patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Prescription`
--

DROP TABLE IF EXISTS `Prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Prescription` (
  `pr_id` int(11) DEFAULT NULL,
  `p_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `app_date` date DEFAULT NULL,
  `diagnose` varchar(15) DEFAULT NULL,
  `drugs` varchar(15) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `dosage` varchar(10) DEFAULT NULL,
  `d_id` int(11) DEFAULT NULL,
  `precaution` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Prescription`
--

LOCK TABLES `Prescription` WRITE;
/*!40000 ALTER TABLE `Prescription` DISABLE KEYS */;
INSERT INTO `Prescription` VALUES (352,101,'2019-03-31','2019-04-04','FACTURE','crocin','5mg','thrice',201,'Take care');
/*!40000 ALTER TABLE `Prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendings`
--

DROP TABLE IF EXISTS `pendings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pendings` (
  `p_id` int(11) DEFAULT NULL,
  `question` varchar(30) DEFAULT NULL,
  `answer` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendings`
--

LOCK TABLES `pendings` WRITE;
/*!40000 ALTER TABLE `pendings` DISABLE KEYS */;
INSERT INTO `pendings` VALUES (101,'Whats up',''),(101,'I am feeling ill',''),(101,'I don\'t want to go',''),(101,'Did we just lose?',''),(101,'Who are you?',''),(101,'I am feeling ill',''),(101,'Did we just lose?',''),(101,'Hey!',''),(101,'What do you do',''),(101,'What do you do?',''),(101,'What can you do',''),(101,'What',''),(101,'Who',''),(101,'Why',''),(101,'How',''),(101,'Noo',''),(101,'What can you do',''),(101,'What can you',''),(101,'Reschedule appointment',''),(101,'What can you do',''),(101,'What is edma',''),(101,'What can you do',''),(101,'Ho',''),(101,'When is my appointment',''),(101,'What is my bill',''),(101,'When is my appointment',''),(101,'Sex?',''),(101,'Hola',''),(101,'Wanna have some action',''),(101,'Who\'s my doctor',''),(101,'Who is my doctor',''),(101,'Reminder for corcin',''),(101,'Calden',''),(101,'what to do',''),(101,'jelly',''),(101,'Jelly-lile','');
/*!40000 ALTER TABLE `pendings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-26 13:05:46
