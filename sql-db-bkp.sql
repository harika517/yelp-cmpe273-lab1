CREATE DATABASE  IF NOT EXISTS `yelp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yelp`;
-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: yelp
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `Customer_Information`
--

DROP TABLE IF EXISTS `Customer_Information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer_Information` (
  `Cust_Id` int NOT NULL AUTO_INCREMENT,
  `Cust_Name` varchar(100) NOT NULL,
  `Cust_email_id` varchar(100) NOT NULL,
  `Cust_Password` varchar(100) NOT NULL,
  `First_Name` varchar(100) DEFAULT NULL,
  `Last_Name` varchar(100) DEFAULT NULL,
  `Date_of_Birth` varchar(15) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  `Nick_Name` varchar(100) DEFAULT NULL,
  `Headline` varchar(100) DEFAULT NULL,
  `Phone_Number` varchar(15) DEFAULT NULL,
  `Yelping_Since` varchar(100) DEFAULT NULL,
  `Things_I_Love` longtext,
  `My_Blog_Or_Website` varchar(100) DEFAULT NULL,
  `Find_Me_In` varchar(100) DEFAULT NULL,
  `My_Favourite_Movie` varchar(100) DEFAULT NULL,
  `Current_Crush` varchar(100) DEFAULT NULL,
  `Cust_ProfilePic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Cust_Id`),
  UNIQUE KEY `Cust_email_id_UNIQUE` (`Cust_email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer_Information`
--

LOCK TABLES `Customer_Information` WRITE;
/*!40000 ALTER TABLE `Customer_Information` DISABLE KEYS */;
INSERT INTO `Customer_Information` VALUES (3,'Pradeep','abs@gmail.com','$2a$10$6uXvUFftk6WOy6xr2NG1p.dNIW6OLowTht0QOJ7m7yoUHerbbS6su','Pradeep','Balaji','undefined','Santa Clara','undefined','undefined','undefined','undefined','123-123-1234','','','','','','',''),(4,'Harika','Harika@gmail.com','$2a$10$WLAka7iA30SNfVOCwFMeIeKyEb3cUtnXOcETCiwKQzXGHsI/MOW/2','','','','','','','','','','','','','','','',''),(5,'Rose','Rose@gmail.com','$2a$10$XMSvTAcbI0k37RP/1ctAiuXuwulesn/RplTBIKIsK/Veee2CkM3/u',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'//www.gravatar.com/avatar/1b69a7741e2439e28d60785be6e56a30?s=200&r=pg&d=mm'),(6,'SriNir','SriNir@gmail.com','$2a$10$8Oj0IMGHvzPUu5jMd23.w.kFaOSP00ia5CIfPRpyaDQ4TrHMVbbkq',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'//www.gravatar.com/avatar/fd56a6e6b97f49caa26e6856df3715e7?s=200&r=pg&d=mm'),(7,'Jacky','asc@gmail.com','$2a$10$iky80v5kOl6a7EpjJeGSKuAuVVgFsSvukP1a0Z81BT0omcEJ37Vw6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'//www.gravatar.com/avatar/41c0f819b2d2205e875d006ebd8a5131?s=200&r=pg&d=mm'),(8,'HarPar','HarPar@gmail.com','$2a$10$82Ey8Dtly9k0RpqgGgLRLu2ZLVgO4layj4edWnKnlCcvCid.4dl32','Harika','Pradeep','','Santa Clara','','','cherry','','123-123-1234','','','','','','','user_HarPar_gmail.com.jpg'),(9,'Shravanthi','shrav@gmail.com','$2a$10$loC3S2bnZxGBgwS63YaaIuern6iIWLedX25wXivPl7u4eCExoZray','Shravanthi','Surarchit','09/24/1994','San Jose','California','California','Arya','Traveller','123-124-1234','2015','Pets','','Instagram','Friends','Brad','user_shrav_gmail.com.jpg'),(10,'Sofia','sofi@gmail.com','$2a$10$OPgaJSn63LovNnjFkjc0pOiWcK2vKuKP9D5cw08Vc088BJC.FP.YG',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'//www.gravatar.com/avatar/e53ef5d3a51ee2d8622817b711956345?s=200&r=pg&d=mm'),(11,'PradeepBalaji','pb@gmail.com','$2a$10$1H.yATmZASiZ1NXU7aHCLOdjmmjFOOogcrGq04CX6BuzYm7KkA2FK','Pradeep','Balaji','08/17/1990','San Jose','California','USA','Pappu','Top gamer, love to play video games','123-123-1234','','','','home','','','user_pb_gmail.com.jpg'),(12,'Suresh Kumar','sk@gmail.com','$2a$10$S6fYh1dp8u4ets1KO7VUXe54wCGI/AM1QXeo8ajZXTKpMIG0TQ5Im','Suresh Kumar','Hemadri','09/24/1994','San Jose','California','USA','Suresh','Traveller','123-123-1234','','Cats','','home','','','//www.gravatar.com/avatar/c635dbfe0d08f520cb7a1d84cc1540ee?s=200&r=pg&d=mm'),(13,'elsa','elsa@gmail.com','$2a$10$6VNTzqSHWluGZqqjNNe35OxlKT2vCykB8xy7G1hrUHn6ZIytvccw6','Elsa','Arendelle','08/17/1990','Los Angels','California','USA','elsa','Cold is my thing','123-123-1234','','my sister anna and olaf','','Arendelle','Frozen','Kingdom','user_elsa_gmail.com.jpg');
/*!40000 ALTER TABLE `Customer_Information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event_Registration`
--

DROP TABLE IF EXISTS `Event_Registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event_Registration` (
  `reg_id` int NOT NULL AUTO_INCREMENT,
  `Cust_Name` varchar(200) NOT NULL,
  `Event_Name` varchar(200) NOT NULL,
  PRIMARY KEY (`reg_id`),
  UNIQUE KEY `reg_id_UNIQUE` (`reg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event_Registration`
--

LOCK TABLES `Event_Registration` WRITE;
/*!40000 ALTER TABLE `Event_Registration` DISABLE KEYS */;
INSERT INTO `Event_Registration` VALUES (1,'undefined','undefined'),(2,'Shravanthi','Pets and Fun'),(4,'Shravanthi','Cherry Picking'),(7,'Shravanthi','Flower show'),(8,'Shravanthi','Food festival'),(9,'HarPar','Flower show'),(10,'HarPar','Cherry Picking'),(11,'HarPar','Shreya Ghoshal Event'),(12,'HarPar','Indian Ethnic wear exhibition'),(13,'HarPar','Pets and Fun'),(14,'PradeepBalaji','Cherry Picking'),(15,'PradeepBalaji','Food festival'),(16,'elsa','Taste of Pasta');
/*!40000 ALTER TABLE `Event_Registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `Event_Id` int NOT NULL AUTO_INCREMENT,
  `Event_Name` varchar(200) NOT NULL,
  `Event_Date` date NOT NULL,
  `Event_Time` varchar(45) NOT NULL,
  `Event_Location` varchar(200) DEFAULT NULL,
  `Hashtags` varchar(200) DEFAULT NULL,
  `What_And_Why` varchar(200) DEFAULT NULL,
  `Rest_Name` varchar(200) NOT NULL,
  `Rest_email_id` varchar(200) NOT NULL,
  PRIMARY KEY (`Event_Id`),
  UNIQUE KEY `Event_Id_UNIQUE` (`Event_Id`),
  KEY `Rest_Name_idx` (`Event_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (5,'Cherry Picking','2020-10-03','17:00','2777 Sellers Ave, Brentwood, CA 94513','#Cherrypicking','Fun activity where you can pluck fresh cherries from cherry trees.','iGrill Indian Cuisine','igrill@gmail.com'),(7,'Flower show','2020-10-05','17:00','San Jose','#Fallflowers','Have colorful evening with color flowers picked up by homeless children. All the money goes to chairty.','iGrill Indian Cuisine','igrill@gmail.com'),(12,'Indian Ethnic Exhibition','2020-10-24','11:00AM to 5:00PM','James Park, San Jose, California','#indianattire #beautyofindianculture','Indian attire: Lehenga, sarees , wedding clothing','Mangoes Indian Cuisine','mangoes@gmail.com'),(16,'Pets and Fun','2020-10-14','11 AM to 5:00 PM','James Street','#havefunwithpets','for pets loving people','Mangoes Indian Cuisine','mangoes@gmail.com'),(17,'Shreya Ghoshal Event','2020-12-24','6:00PM to 9:00PM','Santa Clara University Stadium , El Camino Real, Santa Clara, California','#shreyaghosholmusicalnight #shreyaghoshalatsantaclara #musicalchristmaseve','Biggest musical event, join us and have a wonderful christmas evening','Mangoes Indian Cuisine','mangoes@gmail.com'),(18,'Indian Ethnic wear exhibition','2020-10-14','12:00','James Street','#Oldfurnitureresaleandgiveaway','come and get used furniture for less price.','Mangoes Indian Cuisine','mangoes@gmail.com'),(19,'Food festival','2020-10-30','11 AM to 5:00 PM','North Park','#FoodFestival','Come and enjoy free food. ','Mangoes Indian Cuisine','mangoes@gmail.com'),(20,'Food Challenge','2020-10-31','17:00PM to 19:00PM','Milpitas','#FoodChallenge','come in and have food challenges with your friends','Mangoes Indian Cuisine','mangoes@gmail.com'),(21,'Taste of French Recepies','2020-11-05','17:00 to 19:00','El Camino Real','undefined','undefined','Pasta Market','pm@gmail.com'),(22,'Taste of Pasta','2020-11-05','17:00PM to 19:00PM','Coleman Avenue','#TasteOfPastaMarket','','Pasta Market','pm@gmail.com'),(23,'Event at pasta','2020-10-29','17:00PM to 19:00PM','James Street','#FoodFestival','','Pasta Market','pm@gmail.com'),(24,'biryani night','2020-12-12','17:00','Santa Clara','#FoodFestival','asd','Mangoes Indian Cuisine','asd'),(25,'Flower show','2020-10-31','17:00','James Street','#Fallflowers','hello','Mangoes Indian Cuisine','mangoes@gmail.com'),(26,'fun for kids','2020-10-31','17:00','James Street','#Fallflowers','hello world','Mangoes Indian Cuisine','mangoes@gmail.com'),(27,'live free','2020-10-31','17:00','San Jose','#Indianattire','crikey','Mangoes Indian Cuisine','mangoes@gmail.com');
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant_Dishes`
--

DROP TABLE IF EXISTS `Restaurant_Dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurant_Dishes` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(200) NOT NULL,
  `item_description` varchar(200) NOT NULL,
  `item_category` varchar(200) NOT NULL,
  `item_ingredients` varchar(200) NOT NULL,
  `item_price` float NOT NULL,
  `item_image` varchar(200) DEFAULT NULL,
  `Rest_Name` varchar(200) NOT NULL,
  `Rest_email_id` varchar(200) NOT NULL,
  `Rest_Id_signup` int DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `Rest_Id_signup_idx` (`Rest_Id_signup`),
  CONSTRAINT `FK_RestDishInfo` FOREIGN KEY (`Rest_Id_signup`) REFERENCES `Restaurant_Information` (`Rest_Id_signup`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant_Dishes`
--

LOCK TABLES `Restaurant_Dishes` WRITE;
/*!40000 ALTER TABLE `Restaurant_Dishes` DISABLE KEYS */;
INSERT INTO `Restaurant_Dishes` VALUES (5,'Sweet Corn Chicken Soup','A chef secret recipie healthier soup made of sweet corn, boiled chicken','Soups and Salads','Chicken, Sweet Corn, Sprin Onions, pepper, egg',5.99,'sw-corn-chk-soup.jpg','Mangoes Indian Cuisine','mangoes@gmail.com',2),(6,'Tomato Basil Soup','cooked in a stock pot on a slow flame.','Soups and Salads','real butter, fresh tomatoes, basil leaves, heavy cream, garlic croutons',5.99,'tomato-basil-soup.jpg','Mangoes Indian Cuisine','mangoes@gmail.com',2),(7,'Cut Mirhci','Famous Indian Chat.Deep fried green chillies dipped in basin batter.','Starters - Vegetarian','basin flour, salt and light Indian Spices ',4.99,'cut-mirchi.jpeg','Mangoes Indian Cuisine','mangoes@gmail.com',2),(8,'Chilli Paneer','Spicy Indo-Chinese dish','Starters - Vegetarian','cottage cheese(Paneer), batter, spicy garlic sauce',10.99,NULL,'Mangoes Indian Cuisine','mangoes@gmail.com',2),(9,'Chicken 65','Deep Fried marinated boneless chicken pieces','Starters - Chicken','boneless chicken, spices',11.99,NULL,'Mangoes Indian Cuisine','mangoes@gmail.com',2),(10,'Chili Egg','Deep Fried marinated egg','Starters - Chicken','Boiled egg, spices, batter',7.99,NULL,'Mangoes Indian Cuisine','mangoes@gmail.com',2),(11,'Gobi 65','Deep Fried Cauliflower dipped in batter with light spices','Starters - Vegeterian','Cauliflower, batter, Indian spices',9.99,NULL,'Mangoes Indian Cuisine','mangoes@gmail.com',2),(12,'Lemon Rice','Boiled rice mixed with lemon and green chillies, tampered with cashews and ground nuts.','Vegetarian - Rice','Boiled Rice, Green chillies, ghee, cashew nuts.',7.99,NULL,'iGrill Indian Cuisine','igrill@gmail.com',3),(13,'Chicken Fired Rice','Indo-chinese dishRice pan fried with boiled chicken and other sauces and spices','Vegetarian - Rice','Boiled Rice, chilly sauce, onions, bell pepper, pepper, spring onions',9.99,NULL,'iGrill Indian Cuisine','igrill@gmail.com',3),(19,'Curd Rice','Boilde rice mixed with yogurt and tampered with nuts','Vegetarian - Rice','Yougurt, Boiled rice, Carrot, Cashew nuts',5.99,NULL,'Mangoes Indian Restaurant','mangoes@gmail.com',2),(20,'Aloo Bajji','Deep fried potato dipped in Batter','Vegetarian - Starters','Potato, Basin Batter, Mild Indian herbs',7.99,NULL,'Mangoes Indian Cuisine','mangoes@gmail.com',2),(21,'Gobi Manhurian','Deep Fried Cauliflower dipped in batter with light spices','Starters - Vegetarian','Cauliflower, batter, Indian spices',9.99,NULL,'Mangoes Indian Cuisine','mangoes@gmail.com',2),(22,'Egg Biryani','Boiled rice with biryani masalas and 3 boiled eggs','Non-Vegetarian Rice','Long rice boiled, indian spices, boiled eggs , biryani masala',11.99,NULL,'Mangoes Indian Cuisine','mangoes@gmail.com',2),(23,'Fried Calamari','Deep fried calamari garnished with lemon, garlic, and parsley. Served with a side of tartar sauce and cocktail sauce','Appetizers','calamari, emon, garlic, and parsley, tartar sauce and cocktail sauce',7.95,'fried-calamari.jpg','Pasta Market','pm@gmail.com',7),(24,'Pasta with Alfredo Sauce','Cream based white sauce with Parmesan and Asiago Cheeses, and a touch of Nutmeg','Fresh Pasta','Parmesan, Asiago Cheeses,  Nutmeg',9.75,'','Pasta Market','pm@gmail.com',7);
/*!40000 ALTER TABLE `Restaurant_Dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant_Images`
--

DROP TABLE IF EXISTS `Restaurant_Images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurant_Images` (
  `Rest_Image_Id` int NOT NULL AUTO_INCREMENT,
  `Rest_Name` varchar(200) NOT NULL,
  `Images` varchar(200) NOT NULL,
  PRIMARY KEY (`Rest_Image_Id`),
  UNIQUE KEY `Rest_Image_Id_UNIQUE` (`Rest_Image_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant_Images`
--

LOCK TABLES `Restaurant_Images` WRITE;
/*!40000 ALTER TABLE `Restaurant_Images` DISABLE KEYS */;
/*!40000 ALTER TABLE `Restaurant_Images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant_Information`
--

DROP TABLE IF EXISTS `Restaurant_Information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurant_Information` (
  `Rest_Id_signup` int NOT NULL AUTO_INCREMENT,
  `Rest_Name` varchar(100) NOT NULL,
  `Rest_email_id` varchar(100) NOT NULL,
  `Rest_Password` varchar(100) NOT NULL,
  `Rest_location` varchar(100) NOT NULL,
  `Description` longtext,
  `Contact` varchar(15) DEFAULT NULL,
  `Timings` varchar(100) DEFAULT NULL,
  `Image` varchar(100) DEFAULT NULL,
  `Curbside_PickUp` varchar(15) DEFAULT NULL,
  `Dine_In` varchar(15) DEFAULT NULL,
  `Yelp_Delivery` varchar(15) DEFAULT NULL,
  `Cuisine` varchar(100) DEFAULT NULL,
  `Rest_ProfilePic` varchar(100) DEFAULT NULL,
  `Restaurant_Informationcol` varchar(45) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `lng` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Rest_Id_signup`),
  UNIQUE KEY `Rest_email_id_UNIQUE` (`Rest_email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant_Information`
--

LOCK TABLES `Restaurant_Information` WRITE;
/*!40000 ALTER TABLE `Restaurant_Information` DISABLE KEYS */;
INSERT INTO `Restaurant_Information` VALUES (1,'ABC','ABC@gmail.com','$2a$10$9cyHe3eI0NgDgaewiIW4Ye4rIqxbQad6/C8JmTppU46MLH0vqIFwm','Banjara Hills, Hyderabad','','','','https://resizer.otstatic.com/v2/photos/legacy/1/25747498.jpg','','','','Indian',NULL,NULL,'17.59166688','78.230896'),(2,'Mangoes Indian Cuisine','mangoes@gmail.com','$2a$10$uQgQJYVMpcoCvSJpfsSE9Ouq3oKMuANszp8JFSZj1nA4Buk9frh2e','2725 El Camino Real #108, Santa Clara, California 95051, United States','With many years of experience cooking in the authentic Indian restaurants, our chefs are excited to present their vision to you and all our guests.','(669) 242-7995','11:30 TO 02:30 PM & 5:30 PM TO 10:00 PM','https://resizer.otstatic.com/v2/photos/legacy/1/25747498.jpg','yes','yes','yes','Indian','user_mangoes_gmail.com.png',NULL,'37.352294','-121.9887842'),(3,'iGrill Indian Cuisine','igrill@gmail.com','$2a$10$YiLoIHTeM7ra2Te.baaX3eC.xYjhBJjggel9XaDztlqCYolsfOzyC','Santa Clara','Wonder family restaurant with variety of Indian dishes cooked by experienced chefs','123-123-1234','11:00 AM to 2:30PM & 5:00PM to 9:00PM ','https://resizer.otstatic.com/v2/photos/legacy/1/25747498.jpg','yes','no','yes','Indian','user_igrill_gmail.com.png',NULL,'37.54239958','-122.04711914'),(4,'Red Chillies','rc@gmail.com','$2a$10$3PZ1hdV7EfTG9NrCAotd/.ykqa.4SSACcu/ybTHqS.FqcylO47Riu','Santa Clara','South Indian Malabar & Travancore Cuisine','123-123-1234','11:00 AM to 2:30PM & 5:00PM to 9:00PM ','https://resizer.otstatic.com/v2/photos/legacy/1/25747498.jpg','yes','no','yes','Indian',NULL,NULL,'37.55239958','-122.04711914'),(5,'Sris Kitchen ','sris@gmail.com','$2a$10$3bpoDruf3SzDmEFMvvOkt.LQgvulpB229/vZHijEKsTsqx16IXtl2','Sunnyvale, California','Best Indian themed restaurant gives home food feel.','123-123-1234','11:00 AM to 2:30PM & 5:00PM to 9:00PM ',NULL,'yes','no','no','Indian','user_sris_gmail.com.jpg',NULL,'37.56239958','-122.04711914'),(6,'Sarvana Bhavan','sb@gmail.com','$2a$10$pP3ErNAyA1YizoAm1569lO16Z0WIbVUO.VJCCJfL5NM5JmKDw30Wa','Sunnyvale, California',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Indian',NULL,NULL,'37.64239958','-122.04711914'),(7,'Pasta Market','pm@gmail.com','$2a$10$WIH.81ckdvaUAdcFDeBWHOWiYoq6P7HZqozQKIV8TRyKFe3GpmzRO','579 Coleman Ave, San Jose, CA 95110','Established in 1982, originally as a part of Florentine Restaurants, The Pasta Market continues to bring our old world family recipes to your table. Under the same family ownership since the beginning we pledge your total satisfaction and trust.','123-123-1234','11:00 AM to 2:30PM & 5:00PM to 9:00PM ',NULL,'yes','yes','yes',NULL,'user_pm_gmail.com.jpg',NULL,NULL,NULL),(8,'Sajj Med','sm@gmail.com','$2a$10$0DHUFz3VpQrTVQjkNWOoN.diZMxl0xUBftWwWKylRvYJAmOB4GIla','579 Coleman Ave #60, San Jose, CA 95110',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'37.339620',NULL);
/*!40000 ALTER TABLE `Restaurant_Information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant_Orders`
--

DROP TABLE IF EXISTS `Restaurant_Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurant_Orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `Cust_Name` varchar(155) NOT NULL,
  `Rest_Name` varchar(200) DEFAULT NULL,
  `item_name` varchar(200) NOT NULL,
  `order_status` varchar(45) NOT NULL,
  `Mode_Of_Delivery` varchar(45) NOT NULL,
  `Rest_email_id` varchar(200) NOT NULL,
   `date` DATETIME DEFAULT 0,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant_Orders`
--

LOCK TABLES `Restaurant_Orders` WRITE;
/*!40000 ALTER TABLE `Restaurant_Orders` DISABLE KEYS */;
INSERT INTO `Restaurant_Orders` VALUES (1,'3','1','4','New Order','','','2020-10-09 09:21:36'),(2,'3','ABC','Sweet Corn Chicken soup','New Order','','','2020-10-09 09:21:36'),(3,'Shravanthi','Mangoes Indian Cuisine','Chicken Fried Rice','Delivered','Pick Up Ready','mangoes@gmail.com','2020-10-09 09:21:36'),(4,'Harika','Mangoes Indian Cuisine','Tomato Basil Soup','Cancelled','Delivery','mangoes@gmail.com','2020-10-09 09:21:36'),(5,'Pradeep','Mangoes Indian Cuisine','Chillie Paneer','New Order','Pick Up','mangoes@gmail.com','2020-10-09 09:21:36'),(6,'Pradeep','Mangoes Indian Cuisine','Chicken 65','Preparing','On the way','mangoes@gmail.com','2020-10-09 09:21:36'),(7,'Harika','iGrill Indian Cuisine','Chicken Fried Rice','New Order','Delivery','igrill@gmail.com','2020-10-09 09:21:36'),(8,'Shravanthi','Mangoes Indian Cuisine','Chicken Fried Rice','New Order','Pick Up','shravs@gmail.com','2020-10-09 09:21:36'),(9,'Pradeep','Mangoes Indian Cuisine','Cut Mirchi','New Order','Delivery','mangoes@gmail.com','2020-10-09 09:21:36'),(13,'Shravanthi',':Rest_Name','Sweet Corn Chicken Soup','New Order','Delivery','undefined','2020-10-09 09:21:36'),(14,'Shravanthi',NULL,'Sweet Corn Chicken Soup','New Order','Pick Up Ready','mangoes@gmail.com','2020-10-09 09:21:36'),(15,'Shravanthi',NULL,'Lemon Rice','New Order','Pick Up','igrill@gmail.com','2020-10-09 09:21:36'),(16,'Shravanthi',NULL,'Tomato Basil Soup','Cancelled','Delivery','mangoes@gmail.com','2020-10-09 18:16:04'),(17,'elsa',NULL,'Fried Calamari','Preparing','Pick Up','pm@gmail.com','2020-10-10 17:41:12');
/*!40000 ALTER TABLE `Restaurant_Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant_Profile`
--

DROP TABLE IF EXISTS `Restaurant_Profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurant_Profile` (
  `rest_id` int NOT NULL AUTO_INCREMENT,
  `Rest_Name` varchar(200) NOT NULL,
  `Location` varchar(200) NOT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `Contact` varchar(15) DEFAULT NULL,
  `Timings` varchar(200) DEFAULT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `Rest_Id_signup` int NOT NULL,
  PRIMARY KEY (`rest_id`),
  UNIQUE KEY `rest_id_UNIQUE` (`rest_id`),
  KEY `Rest_Id_idx` (`rest_id`),
  KEY `Rest_Id_idx1` (`rest_id`),
  KEY `Rest_Id_signup_idx` (`Rest_Id_signup`),
  CONSTRAINT `Rest_Id_signup` FOREIGN KEY (`Rest_Id_signup`) REFERENCES `Restaurant_Information` (`Rest_Id_signup`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant_Profile`
--

LOCK TABLES `Restaurant_Profile` WRITE;
/*!40000 ALTER TABLE `Restaurant_Profile` DISABLE KEYS */;
INSERT INTO `Restaurant_Profile` VALUES (6,'ABC','2725 El Camino Real, INDIA','ABC Barbeque is an innovative spin on Indian culinary traditions.','123-242-7995','10:30 AM - 2:30 PM, 5:30 PM - 10:00 PM','https://resizer.otstatic.com/v2/profiles/legacy/1022302.jpg',1),(7,'ABC','2725 El Camino Real, CA 95051','Mangoes delivers an innovative spin on Indian culinary traditions.','6692427995','11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM','https://resizer.otstatic.com/v2/profiles/legacy/1022302.jpg',1);
/*!40000 ALTER TABLE `Restaurant_Profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `Rest_Name` varchar(200) NOT NULL,
  `review` longtext NOT NULL,
  `Date` datetime  DEFAULT 0,
  `ratings` int NOT NULL,
  `Rest_Id_signup` int NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `review_id_UNIQUE` (`review_id`),
  KEY `Rest_Id_signup_idx` (`Rest_Id_signup`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Mangoes Indian Cuisine','I like it','2020-10-03 06:23:39',4,0),(2,'Mangoes Indian Cuisine','I loved their cut mirchi','2020-10-03 06:25:20',3,0),(4,'iGrill Indian Cuisine','Thats really is a great kebab biryani','2020-10-03 06:41:08',5,0),(5,'iGrill Indian Cuisine','Its a good place for partying nice ambience good service and good amount if varieties in buffet.','2020-10-03 06:50:13',5,0),(6,'ABC','good','2020-10-03 11:42:04',3,0),(9,'ABC','Nice ambience','2020-10-04 16:55:33',3,0),(10,'ABC','Had a horrible experience. Their service is not upto the mark','2020-10-04 16:57:09',1,0),(12,'Mangoes Indian Cuisine','Their door delivery services are excellent in this covid situation','2020-10-04 17:25:08',4,0),(13,'iGrill','Visited as a guest in the Echo restaurant for lunch just today. We were entertaining friends from California, and enjoyed our ocean side table. We chose to stay indoors - to enjoy the air conditioningI I just want to say that, in addition to a nice meal, we had a delightful waitress, Jackie. She had just the right balance of friendliness and efficiency. She recognized that we wanted time to visit and did not rush us. She and other staff members made certain that we had everything we needed. Kudos!','2020-10-04 23:09:13',4,0),(14,'iGrill Indian Cuisine','Visited as a guest in the Echo restaurant for lunch just today. We were entertaining friends from California, and enjoyed our ocean side table. We chose to stay indoors - to enjoy the air conditioning I just want to say that, in addition to a nice meal, we had a delightful waitress, Jackie. She had just the right balance of friendliness and efficiency. She recognized that we wanted time to visit and did not rush us. She and other staff members made certain that we had everything we needed. Kudos!','2020-10-04 23:10:12',4,0);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews_new`
--

DROP TABLE IF EXISTS `reviews_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews_new` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `Rest_Id_signup` int NOT NULL,
  `Rest_Name` varchar(200) NOT NULL,
  `review` longtext NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ratings` int NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `Rest_Id_signup_idx` (`Rest_Id_signup`),
  KEY `Rest_rev_idx` (`Rest_Id_signup`),
  CONSTRAINT `Rest_Rev_FK` FOREIGN KEY (`Rest_Id_signup`) REFERENCES `Restaurant_Information` (`Rest_Id_signup`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews_new`
--

LOCK TABLES `reviews_new` WRITE;
/*!40000 ALTER TABLE `reviews_new` DISABLE KEYS */;
INSERT INTO `reviews_new` VALUES (1,2,'Mangoes Indian Cuisine','Excellet','2020-10-05 09:45:24',4),(2,2,'Mangoes Indian Cuisine','Had moderate experience','2020-10-05 10:45:32',2),(3,1,'','Had dinner with girl friends. Menu is perfect, something for everyone. Service was awesome. Will be back definitely!','2020-10-05 10:55:02',4),(4,3,'','We had lunch here a few times while in Santa Clara visiting family and friends. The servers here are just wonderful and have great memories it seems.  enjoyed the view with our delicious wine and lunch. Must try!','2020-10-05 10:56:03',3),(5,4,'Red Chillies','Best Kerala Food.','2020-10-08 15:22:04',4),(6,5,'Sris Kitchen ','Ambience is not so good but Items are tasting like home food.','2020-10-08 16:01:35',3),(7,7,'Pasta Market','Pasta is soo tasty. Will come back to try more dishes','2020-10-10 17:48:18',4);
/*!40000 ALTER TABLE `reviews_new` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-10 21:32:18
