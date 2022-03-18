-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: apimovies
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
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'accion','http://www.brandemia.org/wp-content/uploads/2012/12/Accion_marca.jpg','2022-03-01 22:25:03','2022-03-01 22:25:03'),(2,'aventura','https://www.tierragamer.com/wp-content/uploads/2020/03/Naruto-Hora-de-Aventura-Crossover.jpg','2022-03-17 15:05:00','2022-03-17 15:06:00'),(3,'drama','https://img.wattpad.com/cover/209778385-352-k422133.jpg','2022-03-17 15:07:00','2022-03-17 15:08:00'),(4,'comedia','http://pm1.narvii.com/6182/08db82ca7cb4aaf385fefeb2c5b5c74d6ca9c1e7_00.jpg','2022-03-17 15:09:00','2022-03-17 15:10:00');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(255) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `calificacion` int NOT NULL,
  `fecha_de_creacion` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `generoId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_generoId_idx` (`generoId`),
  CONSTRAINT `fk_generoId` FOREIGN KEY (`generoId`) REFERENCES `generos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES (1,'https://static.wikia.nocookie.net/naruto/images/f/fd/Naruto_Las_ruinas_ilusorias_en_lo_profundo_de_la_tierra.png/revision/latest?cb=20140114020608&path-prefix=es','legend of the Stone of Gelel',5,'2022-03-01 00:00:00','2022-03-01 22:25:03','2022-03-01 23:05:03',1),(3,'https://i.pinimg.com/564x/41/7a/11/417a11b1979edf36339b6e0211f11abc.jpg','Naruto y su mejor comedia',4,'2022-03-10 00:00:00','2022-03-10 18:21:09','2022-03-10 18:21:09',4),(4,'https://cl.buscafs.com/www.tomatazos.com/public/uploads/images/213729/213729_945x532.jpg','Naruto y su aventura en equipo',5,'2022-03-12 00:00:00','2022-03-12 18:23:51','2022-03-12 18:23:51',2);
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personaje_peliculas`
--

DROP TABLE IF EXISTS `personaje_peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaje_peliculas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `personajeId` int NOT NULL,
  `peliculaId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_personajeId_idx` (`personajeId`),
  KEY `fk_peliculaId_idx` (`peliculaId`),
  CONSTRAINT `fk_peliculaId` FOREIGN KEY (`peliculaId`) REFERENCES `peliculas` (`id`),
  CONSTRAINT `fk_personajeId` FOREIGN KEY (`personajeId`) REFERENCES `personajes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personaje_peliculas`
--

LOCK TABLES `personaje_peliculas` WRITE;
/*!40000 ALTER TABLE `personaje_peliculas` DISABLE KEYS */;
INSERT INTO `personaje_peliculas` VALUES (1,2,1,'2022-03-01 22:25:03','2022-03-01 22:25:03');
/*!40000 ALTER TABLE `personaje_peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personajes`
--

DROP TABLE IF EXISTS `personajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `edad` decimal(10,0) NOT NULL,
  `peso` decimal(10,0) NOT NULL,
  `historia` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personajes`
--

LOCK TABLES `personajes` WRITE;
/*!40000 ALTER TABLE `personajes` DISABLE KEYS */;
INSERT INTO `personajes` VALUES (1,'https://static.wikia.nocookie.net/naruto/images/b/bc/Madara_Uchiha_Anime.png/revision/latest?cb=20180901190100&path-prefix=es','Madara uchiha',70,180,'el temible ninja','2022-03-01 00:03:03','2022-03-01 15:22:31'),(2,'https://static.wikia.nocookie.net/naruto/images/a/a2/Naruto_Uzumaki_Parte_II_Anime.png/revision/latest?cb=20161013194453&path-prefix=es','Naruto uzumaki',20,80,'el es un buen hokage','2022-03-01 14:37:28','2022-03-01 14:37:28'),(5,'https://static.wikia.nocookie.net/naruto/images/a/ab/Rock_Lee_Parte_I_Anime.png/revision/latest?cb=20130409022150&path-prefix=es','rock lee',50,110,'el mejor luchador mano a mano','2022-03-12 01:51:05','2022-03-12 01:51:05');
/*!40000 ALTER TABLE `personajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'alejandro@gmail.com','$2a$10$vf9qcyfIiCed/j17ibtGFOGyFLbw5.0jsyThrgwGkmFZQ71lqfbaK','2022-03-13 13:14:22','2022-03-13 13:14:22'),(2,'juan@gmail.com','$2a$10$0p/yF24UsW8qCD4YpRQKOuGf6QMW5j5q7m0d0xtFq1ZPR93WhwONS','2022-03-13 14:09:30','2022-03-13 14:09:30'),(3,'tolaba@gmail.com','$2a$10$otkBcMVP8873kqxF71cBEeVL1hu/zd5Dy4woSiKZfOWfWhl23n3qi','2022-03-13 22:06:29','2022-03-13 22:06:29'),(4,'mirella@gmail.com','$2a$10$13PAFApsmLFVzGirgbsPNeYkhjCJ0gVV4WJU2xyZa7GImTyWOplxK','2022-03-13 22:08:22','2022-03-13 22:08:22'),(5,'labm2017@gmail.com','$2a$10$JzeBaru1ZXBIfru26noQ/OP0KNiCkZKdFMvRBJGyhUW23LbNDJXvS','2022-03-16 02:09:19','2022-03-16 02:09:19'),(6,'labm2018@gmail.com','$2a$10$T2PuhM9t5TmsEbUE89S.mOcBe//ZEadQ5fhdYs18ZJ2qWfQrCJx9S','2022-03-16 02:10:49','2022-03-16 02:10:49'),(7,'labm2019@gmail.com','$2a$10$8Ska417yMW2twfsfCFnae.IYCekER1kSrsce53AXz99VzZh2IU2Ke','2022-03-17 13:55:12','2022-03-17 13:55:12'),(8,'labm2020@gmail.com','$2a$10$hJXx.g1rAWQwb9RWbbNrUe9yjmd9qHDf8gWgEWSf/SrkrXxK.Lx3O','2022-03-17 19:51:12','2022-03-17 19:51:12');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-17 23:23:46
