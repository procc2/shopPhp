-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2018 at 06:25 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS webApp;
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
USE webApp;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `billId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `userName` varchar(30) NOT NULL,
  `phoneNumber` bigint(20) DEFAULT NULL,
  `total` double NOT NULL,
  `payment` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`billId`, `userId`, `userName`, `phoneNumber`, `total`, `payment`, `address`, `date`) VALUES
(1, 1, '', 0, 900, '0', 'hanoi', '2018-02-15 17:00:00'),
(7, 1, '', 0, 11500, '', '', '2018-02-28 15:27:15'),
(8, 1, '', 0, 1000, '', '', '2018-02-28 16:44:54'),
(9, 6, '', 0, 2400, '', '', '2018-02-28 16:45:47'),
(17, NULL, '', NULL, 13050, '', '', '2018-03-02 09:45:02'),
(29, 1, '', 0, 800, '', '123', '2018-03-02 14:25:28'),
(30, 15, 'test3', 0, 1600, '', '123', '2018-03-02 15:05:28'),
(31, NULL, 'Vuong Anh test', 122, 1600, '', 'Hanoi', '2018-03-02 15:07:08'),
(32, NULL, 'Vuong Anh test', 122, 1600, 'banking', 'Hanoi', '2018-03-08 15:36:53'),
(33, NULL, 'vuong anh test', 123, 3500, 'banking', '123', '2018-03-09 08:48:56'),
(34, NULL, 'Vuong anh test', 123, 1600, 'banking', 'hanoi', '2018-03-09 08:51:09'),
(87, NULL, 'Test modal', 123, 2000, 'banking', 'Hanoi', '2018-03-09 10:41:25'),
(88, NULL, 'VÆ°Æ¡ng anh test', 122, 2400, 'banking', 'hanoi', '2018-03-12 06:26:51'),
(89, 17, 'LÃ½ BÃ¡ HÃ¹ng', 12345678, 1750, 'banking', 'TÃ´n Äá»©c Tháº¯ng,HÃ  Ná»™i', '2018-03-12 07:14:37'),
(90, 23, 'PhÆ°Æ¡ng Linh', 961439869, 1750, 'banking', 'Hanoi, hanoi', '2018-03-14 14:30:03'),
(104, 23, 'PhÆ°Æ¡ng Linh', 961439869, 1600, 'banking', 'Hanoi, hanoi', '2018-03-14 14:43:57'),
(106, NULL, 'VÆ°Æ¡ng Anh', 1223, 800, 'banking', 'Hanoi', '2018-03-16 14:16:24'),
(107, 1, 'SysAdmin', 0, 58000, 'banking', '', '2018-03-16 14:19:45');

-- --------------------------------------------------------

--
-- Table structure for table `billdetail`
--

CREATE TABLE `billdetail` (
  `billDetailId` int(11) NOT NULL,
  `billId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billdetail`
--

INSERT INTO `billdetail` (`billDetailId`, `billId`, `productId`, `price`, `quantity`) VALUES
(10, 7, 19, 250, 1),
(11, 7, 7, 150, 2),
(12, 7, 8, 300, 1),
(13, 7, 2, 800, 10),
(14, 7, 4, 1000, 1),
(15, 7, 3, 150, 3),
(16, 7, 5, 400, 1),
(17, 7, 1, 800, 1),
(18, 8, 4, 1000, 1),
(19, 9, 1, 800, 3),
(44, 17, 2, 800, 2),
(45, 17, 3, 150, 1),
(46, 17, 18, 6500, 1),
(47, 17, 1, 800, 6),
(58, 29, 1, 800, 1),
(59, 30, 1, 800, 1),
(60, 30, 2, 800, 1),
(61, 31, 1, 800, 1),
(62, 31, 2, 800, 1),
(63, 32, 1, 800, 1),
(64, 32, 2, 800, 1),
(65, 33, 2, 800, 3),
(66, 33, 3, 150, 2),
(67, 33, 1, 800, 1),
(68, 34, 1, 800, 1),
(69, 34, 2, 800, 1),
(72, 87, 1, 800, 1),
(73, 87, 5, 400, 1),
(74, 87, 2, 800, 1),
(75, 88, 1, 800, 3),
(76, 89, 3, 150, 1),
(77, 89, 1, 800, 2),
(78, 90, 1, 800, 1),
(79, 90, 2, 800, 1),
(80, 90, 3, 150, 1),
(89, 104, 2, 800, 1),
(90, 104, 1, 800, 1),
(98, 106, 1, 800, 1),
(99, 107, 2, 800, 23),
(100, 107, 3, 150, 16),
(101, 107, 1, 800, 45),
(102, 107, 6, 600, 2);

-- --------------------------------------------------------

--
-- Table structure for table `cartdetail`
--

CREATE TABLE `cartdetail` (
  `cartDetailId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productPriceTotal` double NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cartdetail`
--

INSERT INTO `cartdetail` (`cartDetailId`, `userId`, `productId`, `productPriceTotal`, `quantity`) VALUES
(89, 9, 1, 800, 1),
(127, 1, 1, 2400, 3),
(128, 1, 18, 13000, 2),
(129, 1, 57, 1500, 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryId` int(3) NOT NULL,
  `CategoryName` varchar(50) CHARACTER SET latin1 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryId`, `CategoryName`) VALUES
(1, 'Laptop'),
(2, 'Camera'),
(3, 'Smart Phone'),
(4, 'Tablet'),
(5, 'Video Camera');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturerId` int(11) NOT NULL,
  `manufacturerName` varchar(50) COLLATE utf8_vietnamese_ci NOT NULL,
  `logo` varchar(50) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`manufacturerId`, `manufacturerName`, `logo`) VALUES
(1, 'Apple', 'images/apple-logo.jpg'),
(2, 'Samsung', 'images/tb1.jpg'),
(3, 'Sony', 'images/sony-logo.jpg'),
(4, 'Asus', 'images/asus-logo.png'),
(5, 'Xiaomi', ''),
(6, 'Canon', '123'),
(7, 'Nikon', ''),
(8, 'Fujifilm', 'abc'),
(9, 'Nokia', ''),
(10, 'Dell', ''),
(11, 'HP', '');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productId` int(11) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `productPrice` double NOT NULL,
  `productImage` varchar(30) NOT NULL,
  `productDescript` longtext NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `manufacturerId` int(11) NOT NULL,
  `insertDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdUser` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `productName`, `productPrice`, `productImage`, `productDescript`, `CategoryId`, `manufacturerId`, `insertDate`, `createdUser`) VALUES
(1, 'Apple Iphone 8', 800, 'images/iphone8.png', 'Iphone 8', 3, 1, '2018-02-22 16:06:10', ''),
(2, 'Samsung Galaxy S8', 800, 'images/30.jpg', 'Samsung', 3, 2, '2018-02-22 16:06:10', ''),
(3, 'Iphone 5s', 150, 'images/31.jpg', 'This Certified Refurbished product is tested and Certified to look and work like new, with limited to No wear. The refurbishing process includes functionality testing, inspection, and repackaging. The product is backed by a minimum 90-day warranty, and may arrive in a generic box. The product ships with a charger and cable, but does not include headphone, Manual or SIM card. Only select sellers who maintain a high performance bar may offer Certified Refurbished products on Amazon.', 3, 1, '2018-02-22 16:06:10', ''),
(4, 'Macbook Pro MF839', 1000, 'images/26.jpg', 'Macbook', 1, 1, '2018-02-22 16:06:10', ''),
(5, 'Sony Z5', 400, 'images/32.jpg', 'Sony1', 3, 3, '2018-02-22 16:06:10', ''),
(6, 'Apple Ipad mini 2', 600, 'images/33.jpg', 'IPad', 4, 1, '2018-02-22 16:06:10', ''),
(7, 'Xiaomi redmi note 4x', 150, 'images/', 'Xiaomi redmi note 4x', 3, 5, '2018-02-22 16:06:10', ''),
(8, 'Xiaomi redmi note 5 Pro', 300, '', 'Redmi note 5', 3, 5, '2018-02-23 11:53:26', ''),
(16, 'Iphone 6', 300, '', 'Iphone 6', 3, 1, '2018-02-23 12:14:42', ''),
(18, 'Nikon D5', 6500, '', 'The Nikon D5 is an all-around camera packed with features that allow you to take pictures in almost any kind of shooting condition.\n\nThis FX-format DSLRâ€™s claim to fame are its native ISO sensitivity of ISO 102,400, boosted ISO of 3,280,000, and autofocus that help produce detailed, sharp images with accurate colors. The D5 also has a long battery life, long overall shutter life, built-in vertical grip, and the ability to capture 12 frames per second.\n\nRightly so, the D5 is dubbed the most powerful DSLR flagship in the Nikon lineup.', 2, 7, '2018-02-23 12:30:03', ''),
(19, 'Asus Zenphone 4', 250, '', 'Asus', 3, 4, '2018-02-25 00:26:39', 'admin'),
(20, 'Asus K501N', 500, '', 'The ASUS K50IN notebook is designed to provide a no-frills computing experience to users while on the move. Boasting the muscle to provide cinematic audio and visual enjoyment, users can experience immersive entertainment anytime, anywhere in comfort and style.', 1, 4, '2018-02-25 00:36:42', 'admin'),
(21, 'Lumia 525', 100, '', 'Nokia', 3, 9, '2018-03-06 19:22:45', 'admin'),
(22, 'Samsung Galaxy S9', 1000, '', 'S9', 3, 2, '2018-03-06 19:23:31', 'admin'),
(23, 'Nokia 8', 500, '', 'N8', 3, 9, '2018-03-06 19:26:16', 'admin'),
(24, 'Xiaomi Mi A1', 200, '', 'Mi A1', 3, 5, '2018-03-06 22:50:44', 'admin'),
(25, 'Iphone X', 1000, '', 'Iphone X', 3, 1, '2018-03-12 22:31:36', 'admin'),
(26, 'Nikon D90', 189.9, '', 'Fusing 12.3-megapixel image quality inherited from the award-winning D300 with groundbreaking features, the D90â€™s breathtaking, low-noise image quality is further advanced with EXPEED image processing. Split-second shutter response and continuous shooting at up to 4.5 frames-per-second provide the power to capture fast action and precise moments perfectly, while Nikonâ€™s exclusive Scene Recognition System contributes to faster 11-area autofocus performance, finer white balance detection and more. The D90 delivers the control passionate photographers demand, utilizing comprehensive exposure functions and the intelligence of 3D Color Matrix Metering II. Stunning results come to life on a 3-inch 920,000-dot color LCD monitor, providing accurate image review, Live View composition and brilliant playback of the D90â€™s cinematic-quality 24-fps HD D-Movie mode.', 2, 7, '2018-03-16 22:16:15', 'admin'),
(27, 'Nikon D3S', 1299, '', 'The D3S is uniquely qualified to meet the changing needs of photographers whose assignments demand 100% from them and their equipment. Leading with uncompromising FX-format multimedia versatility and engineered for demanding professional use at up to 9 fps, the D3S rugged magnesium alloy construction, comprehensively sealed against dust and moisture, delivers on its promises of superiority. Exacting moments in time are captured to an expanded buffer, allowing continuous capture of up to 82 JPEG (fine) or 36 14-bit NEF (RAW) images.', 2, 7, '2018-03-16 22:18:25', 'admin'),
(51, 'NIKON D7200', 1000, '', '', 2, 7, '2018-03-15 05:24:34', 'truong'),
(53, 'NIKON D3400', 999, '', '', 2, 7, '2018-03-15 05:27:56', 'truong'),
(54, 'NIKON P900', 1100, '', '', 2, 7, '2018-03-15 05:30:36', 'truong'),
(55, 'NIKON A900', 499, '', '', 2, 7, '2018-03-15 05:31:42', 'truong'),
(56, 'ASUS ZL1890', 600, '', '', 1, 4, '2018-03-15 05:34:17', 'truong'),
(57, 'ASUS NM8900', 750, '', '', 1, 4, '2018-03-15 05:35:20', 'truong'),
(58, 'ASUS KI6271', 1000, '', '', 1, 4, '2018-03-15 05:36:10', 'truong'),
(59, 'DELL JKA8789', 1900, '', '', 1, 10, '2018-03-15 05:37:44', 'truong'),
(60, 'DELL BS7128', 1500, '', '', 1, 10, '2018-03-15 05:38:34', 'truong'),
(61, 'DELL TWE152', 900, '', '', 1, 10, '2018-03-15 05:39:27', 'truong'),
(62, 'HP TEB299', 500, '', '', 1, 11, '2018-03-15 05:40:36', 'truong'),
(63, 'HP ATS1900', 1000, '', '', 1, 11, '2018-03-15 05:41:34', 'truong'),
(64, 'The New Macbook', 1000, '', '', 1, 1, '2018-03-15 05:44:01', 'truong'),
(65, 'AAK', 1000, '', '', 5, 3, '2018-03-15 05:45:37', 'truong'),
(66, 'GHGnews 142', 5000, '', '', 5, 3, '2018-03-15 05:46:50', 'truong'),
(67, 'AHSJH 122', 3400, '', '', 5, 6, '2018-03-15 05:47:57', 'truong'),
(68, 'Apple Ipad air', 800, '', '', 4, 1, '2018-03-15 05:50:56', 'truong'),
(69, 'Apple Ipad air 2', 850, '', '', 4, 1, '2018-03-15 05:51:43', 'truong'),
(70, 'Ipad mini 4', 400, '', '', 4, 1, '2018-03-15 16:10:49', 'truong'),
(71, 'Ipad Pro 2017', 750, '', '', 4, 1, '2018-03-15 16:12:58', 'truong'),
(72, 'Ipad Pro 2015', 699, '', '', 4, 1, '2018-03-15 16:15:10', 'truong'),
(73, 'Canon Camera A69', 600, '', 'Canon camera', 5, 6, '2018-03-16 23:55:16', 'admin'),
(74, 'HP Video Camera', 700, '', 'hp', 5, 11, '2018-03-16 23:56:29', 'admin'),
(75, 'Sony Video Camera', 800, '', 'sony', 5, 3, '2018-03-16 23:57:04', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `productcomment`
--

CREATE TABLE `productcomment` (
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `commentText` varchar(100) COLLATE utf8_vietnamese_ci NOT NULL,
  `star` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `productcomment`
--

INSERT INTO `productcomment` (`productId`, `userId`, `commentText`, `star`, `date`) VALUES
(1, 1, 'San pham nay dep qua !! hihi', 5, '2018-03-11 04:19:21'),
(1, 10, 'T cÅ©ng tháº¥y tháº¿', 3, '2018-03-11 05:30:24'),
(1, 4, 'T cÅ©ng thÃ­ch !! " Ä‘áº­p tay"', 3, '2018-03-11 05:31:39'),
(1, 1, 'T cÅ©ng thÃ­ch !! " Ä‘áº­p tay"', 3, '2018-03-11 05:31:49'),
(1, 1, 'We love Iphone 8', 3, '2018-03-11 05:33:02'),
(1, 6, 'Äáº¯t quÃ¡', 4, '2018-03-11 06:55:39'),
(3, 6, 'Ráº» quÃ¡', 3, '2018-03-11 07:10:18'),
(3, 1, 'Ráº» bth', 3, '2018-03-11 07:23:00'),
(3, 4, 'T Ä‘ tháº¥y ráº»', 2, '2018-03-11 07:24:37');

-- --------------------------------------------------------

--
-- Table structure for table `productimage`
--

CREATE TABLE `productimage` (
  `productId` int(11) NOT NULL,
  `ImagePath` varchar(200) COLLATE utf8_vietnamese_ci NOT NULL,
  `color` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `productimage`
--

INSERT INTO `productimage` (`productId`, `ImagePath`, `color`) VALUES
(19, 'images/Asus Zenphone 4 blue.jfif', 3),
(19, 'images/Asus Zenphone 4 pink.jfif', 6),
(19, 'images/asus-zenfone-4.jpg', 0),
(73, 'images/canon 1.jfif', 0),
(73, 'images/canon 2.jfif', 0),
(53, 'images/d34001-jpg.jpg', 0),
(57, 'images/download (1).jpg', 0),
(66, 'images/download (10).jpg', 0),
(67, 'images/download (11).jpg', 0),
(68, 'images/download (12).jpg', 0),
(69, 'images/download (13).jpg', 0),
(71, 'images/download (14).jpg', 0),
(72, 'images/download (15).jpg', 0),
(58, 'images/download (2).jpg', 0),
(59, 'images/download (3).jpg', 0),
(60, 'images/download (4).jpg', 0),
(61, 'images/download (5).jpg', 0),
(62, 'images/download (6).jpg', 0),
(63, 'images/download (7).jpg', 0),
(64, 'images/download (8).jpg', 0),
(65, 'images/download (9).jpg', 0),
(56, 'images/download.jpg', 0),
(70, 'images/download(14).jpg', 0),
(1, 'images/ip8-black.jpg', 5),
(1, 'images/ip8-gold.jpg', 4),
(1, 'images/ip8-silver.jpg', 2),
(6, 'images/Ipad Mini 2 Black.jfif', 5),
(6, 'images/Ipad Mini 2.jfif', 0),
(6, 'images/ipad-mini2.jpg', 4),
(3, 'images/iphone-5s-black.jpg', 4),
(3, 'images/iphone-5s-gray.jpg', 2),
(16, 'images/iPhone-6-gold.jpg', 4),
(16, 'images/iPhone-6-gray.jpg', 2),
(25, 'images/iphone-x-2.jpg', 5),
(25, 'images/iphone-x.jpg', 2),
(3, 'images/iphone5s-black.jpg', 5),
(20, 'images/k501.png', 0),
(20, 'images/k501n-2.png', 0),
(4, 'images/macbookpro.jpg', 0),
(23, 'images/medium-nokia-8-cu.jpg', 0),
(24, 'images/medium-xiaomi-mi-a1-11.jpg', 6),
(24, 'images/medium-xiaomi-mi-a1-12.jpg', 5),
(24, 'images/medium-xiaomi-mi-a1-13.jpg', 4),
(4, 'images/mf839-2.jpg', 0),
(26, 'images/Nikon_D90_0.jpg', 0),
(55, 'images/nikon-Coolpix-A9001-jpg.jpg', 0),
(27, 'images/nikon-d3s-2.jpg', 0),
(27, 'images/nikon-d3s-3.jpg', 0),
(27, 'images/nikon-d3s.jpg', 0),
(18, 'images/nikon-d5-front.jpg', NULL),
(18, 'images/nikon-d5-inside.jpg', NULL),
(51, 'images/Nikon-D7200.jpg', 0),
(23, 'images/nokia-8.jpg', 0),
(21, 'images/nokia-lumia-525.jpg', 0),
(54, 'images/p9001-jpg.jpg', 0),
(74, 'images/panasoic 1.jfif', 0),
(74, 'images/panasonic 2.jfif', 0),
(8, 'images/redmi-note-5-pro-blue.jpg', 3),
(8, 'images/redmi-note-5-pro-pink.jpg', 6),
(7, 'images/rmn4x-blue.jpg', 3),
(7, 'images/rmn4x-gray.jpg', 2),
(7, 'images/rmn4x.jpg', NULL),
(2, 'images/s8-black.jpg', 5),
(2, 'images/s8-blue.jpg', 3),
(2, 'images/s8-gray.jpg', 2),
(22, 'images/s9-black.jpg', 5),
(22, 'images/s9-blue.jpg', 3),
(75, 'images/sony 1.jfif', 0),
(75, 'images/sony 2.jfif', 0),
(5, 'images/Sony z5 gold.jfif', 4),
(5, 'images/sony z5 green.jfif', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userEmail` varchar(30) NOT NULL,
  `userPassword` varchar(50) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `phoneNumber` varchar(12) NOT NULL,
  `address` varchar(50) NOT NULL,
  `Role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userEmail`, `userPassword`, `userName`, `phoneNumber`, `address`, `Role`) VALUES
(1, 'admin', 'admin', 'SysAdmin', '0', '', 1),
(2, 'admin2', 'admin', '', '0', '', 2),
(3, 'admin3', 'admin', '', '0', '', 1),
(4, 'truong', 'truong', 'Truong', '0123698796', 'Nha cua truong', 2),
(5, 'linhtinh@yahoo.com', '123456', '', '0', '', 5),
(6, 'guest', '1', 'VipGuest', '0', '', 5),
(9, '123@123.com', 'pwwp', 'VÆ°Æ¡ng Anh', '32132', '', 5),
(10, 'duy', '1', 'Duy', '0', '01234', 2),
(13, 'test@test.com', '123', 'test', '1', '123', 5),
(14, 'test2@mail.com', '12', 'test2', '0', '123', 5),
(15, 'test3@test.com', '1', 'test3', '0', '123', 5),
(16, 'procc1003@yahoo.com.vn', '123456', 'VÆ°Æ¡ng Anh', '01223398697', 'hanoi', 5),
(17, 'hunglyba@balyhung.com', '123', 'LÃ½ BÃ¡ HÃ¹ng', '012345678', 'TÃ´n Äá»©c Tháº¯ng,HÃ  Ná»™i', 5),
(21, 'bancuahung@hungbaly.com', 'giongpasscuahung', 'Báº¡n cá»§a HÃ¹ng', '0123699875', 'Gáº§n nhÃ  HÃ¹ng', 5),
(22, 'thang@thang.com', '123456', 'Tháº¯ng', '0910203080', '123 LÃ² ÄÃºc', 5),
(23, 'phuonglinhle@gmail.com', '123456', 'PhÆ°Æ¡ng Linh', '0961439869', 'Hanoi, hanoi', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`billId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `billdetail`
--
ALTER TABLE `billdetail`
  ADD PRIMARY KEY (`billDetailId`),
  ADD KEY `billId` (`billId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `cartdetail`
--
ALTER TABLE `cartdetail`
  ADD PRIMARY KEY (`cartDetailId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `CartId` (`userId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturerId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `CategoryId` (`CategoryId`),
  ADD KEY `manufacturerId` (`manufacturerId`);

--
-- Indexes for table `productcomment`
--
ALTER TABLE `productcomment`
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `productimage`
--
ALTER TABLE `productimage`
  ADD UNIQUE KEY `ImagePath` (`ImagePath`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `billId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
--
-- AUTO_INCREMENT for table `billdetail`
--
ALTER TABLE `billdetail`
  MODIFY `billDetailId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
--
-- AUTO_INCREMENT for table `cartdetail`
--
ALTER TABLE `cartdetail`
  MODIFY `cartDetailId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryId` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `billdetail`
--
ALTER TABLE `billdetail`
  ADD CONSTRAINT `billdetail_ibfk_1` FOREIGN KEY (`billId`) REFERENCES `bill` (`billId`) ON DELETE CASCADE;

--
-- Constraints for table `cartdetail`
--
ALTER TABLE `cartdetail`
  ADD CONSTRAINT `cartdetail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  ADD CONSTRAINT `cartdetail_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`CategoryId`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`manufacturerId`) REFERENCES `manufacturer` (`manufacturerId`);

--
-- Constraints for table `productcomment`
--
ALTER TABLE `productcomment`
  ADD CONSTRAINT `productcomment_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  ADD CONSTRAINT `productcomment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `productimage`
--
ALTER TABLE `productimage`
  ADD CONSTRAINT `productimage_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
