-- MySQL dump 10.13  Distrib 5.5.15, for osx10.6 (i386)
--
-- Host: localhost    Database: viikkarit
-- ------------------------------------------------------
-- Server version	5.5.15

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
-- Table structure for table `ottelut`
--

DROP TABLE IF EXISTS `ottelut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ottelut` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `kaukalo` varchar(30) NOT NULL,
  `kentta` varchar(30) NOT NULL,
  `lohko` varchar(30) NOT NULL,
  `aika` time NOT NULL,
  `koti` varchar(30) DEFAULT NULL,
  `vieras_joukkue` varchar(30) DEFAULT NULL,
  `maalit_koti_joukkue` tinyint(4) DEFAULT NULL,
  `maalit_vieras_joukkue` tinyint(4) DEFAULT NULL,
  `jaakunnostus` tinyint(1) DEFAULT '0',
  `palkintojen_jako` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ottelut`
--

LOCK TABLES `ottelut` WRITE;
/*!40000 ALTER TABLE `ottelut` DISABLE KEYS */;
INSERT INTO `ottelut` VALUES (1,'kaukalo1','takakentta','lohko-a','09:00:00','Viik H','Vir M',NULL,NULL,0,0),(2,'kaukalo1','takakentta','lohko-a','09:30:00','Pel V','Jok S',NULL,NULL,0,0),(3,'kaukalo1','takakentta','lohko-a','10:00:00','KJT W','KiVa W',NULL,NULL,0,0),(4,'kaukalo1','takakentta','lohko-a','10:30:00','','',NULL,NULL,1,0),(5,'kaukalo1','takakentta','lohko-a','10:45:00','Jok S','Viik H',NULL,NULL,0,0),(6,'kaukalo1','takakentta','lohko-a','11:15:00','Vir M','KJT W',NULL,NULL,0,0),(7,'kaukalo1','takakentta','lohko-a','11:45:00','KiVa W','Pel V',NULL,NULL,0,0),(8,'kaukalo1','takakentta','lohko-a','12:15:00','','',NULL,NULL,1,0),(9,'kaukalo1','takakentta','lohko-a','12:30:00','Viik H','KJT W',NULL,NULL,0,0),(10,'kaukalo1','takakentta','lohko-a','13:00:00','KiVa W','Jok S',NULL,NULL,0,0),(11,'kaukalo1','takakentta','lohko-a','13:30:00','Pel V','Vir M',NULL,NULL,0,0),(12,'kaukalo1','takakentta','lohko-a','14:00:00','','',NULL,NULL,1,0),(13,'kaukalo1','takakentta','lohko-a','14:15:00','Jok S','KJT W',NULL,NULL,0,0),(14,'kaukalo1','takakentta','lohko-a','14:45:00','Pel V','Viik H',NULL,NULL,0,0),(15,'kaukalo1','takakentta','lohko-a','15:15:00','KiVa W','Vir M',NULL,NULL,0,0),(16,'kaukalo1','takakentta','lohko-a','15:45:00','','',NULL,NULL,1,0),(17,'kaukalo1','takakentta','lohko-a','16:00:00','Pel V','KJT W',NULL,NULL,0,0),(18,'kaukalo1','takakentta','lohko-a','16:30:00','Viik H','KiVa W',NULL,NULL,0,0),(19,'kaukalo1','takakentta','lohko-a','17:00:00','Jok S','Vir M',NULL,NULL,0,0),(20,'kaukalo1','takakentta','lohko-a','17:45:00','','',NULL,NULL,0,1),(21,'kaukalo1','etukentta','lohko-a','09:00:00','Viik H','Vir M',1,1,0,0),(22,'kaukalo1','etukentta','lohko-a','09:30:00','Pel V','Jok S',NULL,NULL,0,0),(23,'kaukalo1','etukentta','lohko-a','10:00:00','KJT W','KiVa W',NULL,NULL,0,0),(24,'kaukalo1','etukentta','lohko-a','10:30:00','','',NULL,NULL,1,0),(25,'kaukalo1','etukentta','lohko-a','10:45:00','Jok S','Viik H',NULL,NULL,0,0),(26,'kaukalo1','etukentta','lohko-a','11:15:00','Vir M','KJT W',NULL,NULL,0,0),(27,'kaukalo1','etukentta','lohko-a','11:45:00','KiVa W','Pel V',NULL,NULL,0,0),(28,'kaukalo1','etukentta','lohko-a','12:15:00','','',NULL,NULL,1,0),(29,'kaukalo1','etukentta','lohko-a','12:30:00','Viik H','KJT W',NULL,NULL,0,0),(30,'kaukalo1','etukentta','lohko-a','13:00:00','KiVa W','Jok S',NULL,NULL,0,0),(31,'kaukalo1','etukentta','lohko-a','13:30:00','Pel V','Vir M',NULL,NULL,0,0),(32,'kaukalo1','etukentta','lohko-a','14:00:00','','',NULL,NULL,1,0),(33,'kaukalo1','etukentta','lohko-a','14:15:00','Jok S','KJT W',NULL,NULL,0,0),(34,'kaukalo1','etukentta','lohko-a','14:45:00','Pel V','Viik H',NULL,NULL,0,0),(35,'kaukalo1','etukentta','lohko-a','15:15:00','KiVa W','Vir M',NULL,NULL,0,0),(36,'kaukalo1','etukentta','lohko-a','15:45:00','','',NULL,NULL,1,0),(37,'kaukalo1','etukentta','lohko-a','16:00:00','Pel V','KJT W',NULL,NULL,0,0),(38,'kaukalo1','etukentta','lohko-a','16:30:00','Viik H','KiVa W',NULL,NULL,0,0),(39,'kaukalo1','etukentta','lohko-a','17:00:00','Jok S','Vir M',NULL,NULL,0,0),(40,'kaukalo1','etukentta','lohko-a','17:45:00','','',NULL,NULL,0,1),(41,'kaukalo2','takakentta','lohko-a','09:00:00','Viik H','Vir M',NULL,NULL,0,0),(42,'kaukalo2','takakentta','lohko-a','09:30:00','Pel V','Jok S',NULL,NULL,0,0),(43,'kaukalo2','takakentta','lohko-a','10:00:00','KJT W','KiVa W',NULL,NULL,0,0),(44,'kaukalo2','takakentta','lohko-a','10:30:00','','',NULL,NULL,1,0),(45,'kaukalo2','takakentta','lohko-a','10:45:00','Jok S','Viik H',NULL,NULL,0,0),(46,'kaukalo2','takakentta','lohko-a','11:15:00','Vir M','KJT W',NULL,NULL,0,0),(47,'kaukalo2','takakentta','lohko-a','11:45:00','KiVa W','Pel V',NULL,NULL,0,0),(48,'kaukalo2','takakentta','lohko-a','12:15:00','','',NULL,NULL,1,0),(49,'kaukalo2','takakentta','lohko-a','12:30:00','Viik H','KJT W',NULL,NULL,0,0),(50,'kaukalo2','takakentta','lohko-a','13:00:00','KiVa W','Jok S',NULL,NULL,0,0),(51,'kaukalo2','takakentta','lohko-a','13:30:00','Pel V','Vir M',NULL,NULL,0,0),(52,'kaukalo2','takakentta','lohko-a','14:00:00','','',NULL,NULL,1,0),(53,'kaukalo2','takakentta','lohko-a','14:15:00','Jok S','KJT W',NULL,NULL,0,0),(54,'kaukalo2','takakentta','lohko-a','14:45:00','Pel V','Viik H',NULL,NULL,0,0),(55,'kaukalo2','takakentta','lohko-a','15:15:00','KiVa W','Vir M',NULL,NULL,0,0),(56,'kaukalo2','takakentta','lohko-a','15:45:00','','',NULL,NULL,1,0),(57,'kaukalo2','takakentta','lohko-a','16:00:00','Pel V','KJT W',NULL,NULL,0,0),(58,'kaukalo2','takakentta','lohko-a','16:30:00','Viik H','KiVa W',NULL,NULL,0,0),(59,'kaukalo2','takakentta','lohko-a','17:00:00','Jok S','Vir M',NULL,NULL,0,0),(60,'kaukalo2','takakentta','lohko-a','17:45:00','','',NULL,NULL,0,1),(61,'kaukalo2','etukentta','lohko-a','09:00:00','Viik H','Vir M',NULL,NULL,0,0),(62,'kaukalo2','etukentta','lohko-a','09:30:00','Pel V','Jok S',NULL,NULL,0,0),(63,'kaukalo2','etukentta','lohko-a','10:00:00','KJT W','KiVa W',NULL,NULL,0,0),(64,'kaukalo2','etukentta','lohko-a','10:30:00','','',NULL,NULL,1,0),(65,'kaukalo2','etukentta','lohko-a','10:45:00','Jok S','Viik H',NULL,NULL,0,0),(66,'kaukalo2','etukentta','lohko-a','11:15:00','Vir M','KJT W',NULL,NULL,0,0),(67,'kaukalo2','etukentta','lohko-a','11:45:00','KiVa W','Pel V',NULL,NULL,0,0),(68,'kaukalo2','etukentta','lohko-a','12:15:00','','',NULL,NULL,1,0),(69,'kaukalo2','etukentta','lohko-a','12:30:00','Viik H','KJT W',NULL,NULL,0,0),(70,'kaukalo2','etukentta','lohko-a','13:00:00','KiVa W','Jok S',NULL,NULL,0,0),(71,'kaukalo2','etukentta','lohko-a','13:30:00','Pel V','Vir M',NULL,NULL,0,0),(72,'kaukalo2','etukentta','lohko-a','14:00:00','','',NULL,NULL,1,0),(73,'kaukalo2','etukentta','lohko-a','14:15:00','Jok S','KJT W',NULL,NULL,0,0),(74,'kaukalo2','etukentta','lohko-a','14:45:00','Pel V','Viik H',NULL,NULL,0,0),(75,'kaukalo2','etukentta','lohko-a','15:15:00','KiVa W','Vir M',NULL,NULL,0,0),(76,'kaukalo2','etukentta','lohko-a','15:45:00','','',NULL,NULL,1,0),(77,'kaukalo2','etukentta','lohko-a','16:00:00','Pel V','KJT W',NULL,NULL,0,0),(78,'kaukalo2','etukentta','lohko-a','16:30:00','Viik H','KiVa W',NULL,NULL,0,0),(79,'kaukalo2','etukentta','lohko-a','17:00:00','Jok S','Vir M',NULL,NULL,0,0),(80,'kaukalo2','etukentta','lohko-a','17:45:00','','',NULL,NULL,0,1);
/*!40000 ALTER TABLE `ottelut` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'matte','fillari');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-21 23:15:31
