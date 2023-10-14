-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: auth-4-db
-- ------------------------------------------------------
-- Server version	8.0.24

-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (26,'Isidro.Rath76','Cheryl Cremin','Kellen_Baumbach83@yahoo.com','$2a$10$T44LufSikaVaAaprKby8TeQ9f2Sq/h1fFKeOvgmOGdaVwQvAm1ZFG','2022-03-11 22:46:12'),(27,'Lindsey53','Dan Bosco','Florence.Goyette@gmail.com','$2a$10$T0vUc.OIxET1Iz24L7QHrOQJ7YhAoxZaA/NiwBJLOOFEXQ0ZVUIg6','2022-03-12 07:51:56'),(28,'Wilhelm39','Juana Hackett','Verner.Kozey@gmail.com','$2a$10$JJzniy4MXzsg.v/elBvP5eE9Jnzn6fMTX7EpWzf1VdHKX9b8k36qe','2022-03-12 07:53:40'),(29,'Rosemary.Hauck83','Jean Schulist','Osvaldo.Hilll17@gmail.com','$2a$10$Uz9W2nSVqQitlTVM4NarRODovpD8dzoRGjDGgLUk7XQ1vGSCjGagS','2022-03-12 07:53:53');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

