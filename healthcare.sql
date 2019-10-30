-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: Healthcare
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.16.04.1

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
  `p_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `address` varchar(10) DEFAULT NULL,
  `age` varchar(30) DEFAULT NULL,
  `contact` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient`
--

LOCK TABLES `Patient` WRITE;
/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;
INSERT INTO `Patient` VALUES (101,'Calden','Marol','21','8913723894',NULL,NULL),(102,'Chaitanya John','IIT Kurla','1/10/2019','9921673212','chaitu@roshan.mom','rocket');
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
INSERT INTO `Prescription` VALUES (303,NULL,'2019-10-01','2019-10-04','CATARACT','cyclopan','1','twice',201,'He was a good boy'),(69,101,'2019-10-01','2019-10-16','CATARACT','combiflam','1','twice',201,'He was');
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
  `answer` varchar(30) DEFAULT NULL,
  `q_id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`q_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendings`
--

LOCK TABLES `pendings` WRITE;
/*!40000 ALTER TABLE `pendings` DISABLE KEYS */;
INSERT INTO `pendings` VALUES (101,'Whats up','',1),(101,'I am feeling ill','Chill bro',2),(101,'I don\'t want to go','',3),(101,'Did we just lose?','',4),(101,'Who are you?','',5),(101,'I am feeling ill','',6),(101,'Did we just lose?','',7),(101,'Hey!','',8),(101,'What do you do','',9),(101,'What do you do?','',10),(101,'What can you do','',11),(101,'What','',12),(101,'Who','',13),(101,'Why','',14),(101,'How','',15),(101,'Noo','',16),(101,'What can you do','',17),(101,'What can you','',18),(101,'Reschedule appointment','',19),(101,'What can you do','',20),(101,'What is edma','',21),(101,'What can you do','',22),(101,'Ho','',23),(101,'When is my appointment','',24),(101,'What is my bill','',25),(101,'When is my appointment','',26),(101,'Sex?','',27),(101,'Hola','',28),(101,'Wanna have some action','',29),(101,'Who\'s my doctor','',30),(101,'Who is my doctor','',31),(101,'Reminder for corcin','',32),(101,'Calden','',33),(101,'what to do','',34),(101,'jelly','',35),(101,'Jelly-lile','',36),(101,'Name of doctor','',37),(101,'Sex?','',38),(101,'Can we have sex?','',39),(101,'Talk dirty to me','',40),(101,'When is my appointment','',41),(101,'Reshedule appointment','',42),(101,'Reschedule appointment','',43),(101,'Reshedule appointment','',44),(101,'My pickaxe got lost','',45),(101,'I think I have ligma','',46),(101,'What\'s ligma','',47),(101,'What\'s ligma','',48),(101,'What\'s ligma','',49),(101,'What\'s ligm','',50),(101,'What\'s ligma','',51),(101,'Who is my doctor','',52),(101,'What is my Doctor\'s name','',53),(101,'Who is my doctor','',54),(101,'Schedule my appointment','',55),(101,'Re-schedule my appointment','',56),(101,'Reschedule my appointment','',57),(101,'Reschedule my appointment','',58),(101,'reschedule my appointment','',59),(101,'When is my appointment','',60),(101,'Hello','',61),(101,'Hello','',62),(101,'Can I come to visit?','Sure dude, i am free now',63),(101,'Can I come to your home','Yes, no one is there',64);
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

-- Dump completed on 2019-10-30 21:53:28
