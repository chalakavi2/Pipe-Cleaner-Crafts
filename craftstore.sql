-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: May 08, 2026 at 10:13 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `craftstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `custom_orders`
--

DROP TABLE IF EXISTS `custom_orders`;
CREATE TABLE IF NOT EXISTS `custom_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `budget` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `custom_orders`
--

INSERT INTO `custom_orders` (`id`, `customer_name`, `description`, `image`, `budget`, `price`, `status`) VALUES
(7, 'user1', 'I need a key tag', '1778226347413-adorable-handmade-daisy-pipe-cleaner-keychain-springtime-craft-project-kids-transform-simple-pipe-cleaners-charming-359540645.webp', 100, 0, 'Rejected'),
(6, 'user1', 'I need this Item', '1778226253343-Fish Lamp.png', 1300, 1500, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `qty` int DEFAULT '1',
  `status` varchar(50) DEFAULT 'Pending',
  `custom_id` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `address`, `phone`, `product_name`, `price`, `qty`, `status`, `custom_id`, `image`) VALUES
(17, 'user1', 'Mirigama', '0312254870', 'Orange Lavender Vase', 500, 2, 'Cancelled', NULL, '1778154463711-WhatsApp Image 2026-05-03 at 21.24.21.jpeg'),
(16, 'user1', 'Custom Order', 'N/A', 'Custom Craft', 0, 1, 'Rejected', 7, '1778226347413-adorable-handmade-daisy-pipe-cleaner-keychain-springtime-craft-project-kids-transform-simple-pipe-cleaners-charming-359540645.webp'),
(15, 'user1', 'Custom Order', 'N/A', 'Custom Craft', 1500, 1, 'Approved', 6, '1778226253343-Fish Lamp.png'),
(14, 'user1', 'Divulapitiya', '0313315700', 'Peocock Wall Hanging', 800, 1, 'Delivered', NULL, '1778221242074-WhatsApp Image 2026-05-03 at 21.23.53.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` text,
  `description` text,
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `category`) VALUES
(15, 'Blue Hair Clip', 80.00, '1778218452923-WhatsApp Image 2026-05-03 at 21.24.16.jpeg', '', 'Hair Clips'),
(14, 'Tomato Tree Vase', 450.00, '1778154644843-TomatoTree.png', '', 'Flower Vase'),
(13, 'White Lily Green Vase', 700.00, '1778154586074-GreenVase.png', '', 'Flower Vase'),
(12, 'Orange Lavender Vase', 500.00, '1778154463711-WhatsApp Image 2026-05-03 at 21.24.21.jpeg', 'Beautiful orange lavender-style floral arrangement in a decorative vase for bright and elegant home décor.', 'Flower Vase'),
(16, 'Blue Saree Brooch', 0.00, '1778155179442-WhatsApp Image 2026-05-03 at 21.24.01.jpeg', '', 'Saree Broach'),
(17, 'Bright red floral brooch', 60.00, '1778155193765-WhatsApp Image 2026-05-03 at 21.24.06.jpeg', '', 'Saree Brooch'),
(18, 'Cute fish shaped brooch', 100.00, '1778155207006-WhatsApp Image 2026-05-03 at 21.24.09.jpeg', '', 'Saree Brooch'),
(19, 'brown floral brooch', 80.00, '1778155230002-WhatsApp Image 2026-05-03 at 21.24.11.jpeg', '', 'Saree Brooch'),
(20, 'Sunflower brooch', 80.00, '1778156213298-WhatsApp Image 2026-05-03 at 21.24.12.jpeg', '', 'Saree Brooch'),
(21, 'Pink floral brooch', 80.00, '1778156227365-WhatsApp Image 2026-05-03 at 21.24.13.jpeg', '', 'Saree Brooch'),
(22, 'White Swan Mini brooch', 120.00, '1778156264381-WhatsApp Image 2026-05-03 at 21.24.14.jpeg', '', 'Saree Brooch'),
(23, 'Brown Daisy Hair Clip', 100.00, '1778156286308-WhatsApp Image 2026-05-03 at 21.24.16 (1).jpeg', '', 'Saree Brooch'),
(24, 'Purple Flower Hair Clip', 100.00, '1778156302230-WhatsApp Image 2026-05-03 at 21.24.16 (2).jpeg', '', 'Hair Clips'),
(25, 'Peocock Wall Hanging', 800.00, '1778221242074-WhatsApp Image 2026-05-03 at 21.23.53.jpeg', '', 'Wall Hanging'),
(26, 'Blossom Hanging Decor', 800.00, '1778221291025-WhatsApp Image 2026-05-03 at 21.23.15.jpeg', '', 'Wall Hanging'),
(27, 'Rainbow Bead Wall Hanging', 800.00, '1778221344592-WhatsApp Image 2026-05-03 at 21.23.03.jpeg', '', 'Wall Hanging'),
(28, 'Hive Flower Vase', 650.00, '1778221931229-FlowerVase.png', '', 'Flower Vase'),
(29, 'Red Blossom Pot', 400.00, '1778222037434-WhatsApp Image 2026-05-03 at 21.24.22.jpeg', '', 'Flower Vase'),
(30, 'Blue Daisy Flower Vase', 400.00, '1778222077488-WhatsApp Image 2026-05-03 at 21.24.20.jpeg', '', 'Flower Vase'),
(31, 'Swan Decor', 500.00, '1778222557726-WhatsApp Image 2026-05-03 at 21.24.23.jpeg', '', 'Other Crafts'),
(32, 'Lily Lamp Shade', 1300.00, '1778223311059-IMG-20251219-WA0005.jpg', '', 'Lamp Shades'),
(33, 'Table Lamp', 1400.00, '1778223497718-FB_IMG_1777986666668.jpg', '', 'Lamp Shades'),
(34, 'Fish Lamp', 1600.00, '1778223533992-WhatsApp Image 2026-05-03 at 21.23.01.jpeg', '', 'Lamp Shades'),
(35, 'Jellyfish Lamp', 1400.00, '1778223754645-jellifish.jpg', '', 'Lamp Shades'),
(36, 'Butterfly Hair Clip', 150.00, '1778223794201-WhatsApp Image 2026-05-03 at 21.23.11.jpeg', '', 'Hair Clips'),
(37, 'Decorative floral ring', 650.00, '1778223894284-WhatsApp Image 2026-05-03 at 21.23.09.jpeg', '', 'Wall Hanging'),
(38, 'Mini Hearts Vase', 400.00, '1778224031328-WhatsApp Image 2026-05-03 at 21.24.17 (2).jpeg', '', 'Other Crafts'),
(39, 'Decorative Lotus Flower', 600.00, '1778224426978-WhatsApp Image 2026-05-03 at 21.23.30.jpeg', '', 'Other Crafts'),
(40, 'Purple Flower Bouquet', 1100.00, '1778225552647-Screenshot_20260508_125731.jpg', '', 'Flower Bouquets'),
(41, 'Lavender Bloom Bouquet', 1000.00, '1778225691013-Screenshot_20260508_125639.jpg', '', 'Flower Bouquets'),
(42, 'Sky Daisy Bouquet', 1000.00, '1778225753307-Screenshot_20260508_125744.jpg', '', 'Flower Bouquets'),
(43, 'Sunset Flower Bouquet', 750.00, '1778225786316-images (1).jpg', '', 'Flower Bouquets');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Test User', 'bu-test-2026@example.com', '$2b$10$mzucQ1YL.oxckdu.1QrtEe07vM3C2c8kdQSEWoXQrpy5qflJRX37K'),
(2, 'user1', 'user1@gmail.com', '$2b$10$tmRpRStZTdzAyb8hUamMouOC5UUA4UaThbM2evQ8f6WWMnV./68T2');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
