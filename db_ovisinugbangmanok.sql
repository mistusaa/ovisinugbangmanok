-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2025 at 09:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ovisinugbangmanok`
--

-- --------------------------------------------------------

--
-- Table structure for table `addonorder`
--

CREATE TABLE `addonorder` (
  `OrderID` int(11) NOT NULL,
  `AddONID` int(11) NOT NULL,
  `Qty_ordered` int(11) DEFAULT NULL,
  `SellingPrice` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `addonproduct`
--

CREATE TABLE `addonproduct` (
  `AddONID` int(11) NOT NULL,
  `AddONName` varchar(100) DEFAULT NULL,
  `Qty` int(11) DEFAULT NULL,
  `SellingPrice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addonproduct`
--

INSERT INTO `addonproduct` (`AddONID`, `AddONName`, `Qty`, `SellingPrice`) VALUES
(1, 'Extra Rice', 100, 10.00),
(2, 'Garlic Sauce', 50, 20.00),
(3, 'Spicy Sauce', 75, 15.00);

-- --------------------------------------------------------

--
-- Table structure for table `cashier`
--

CREATE TABLE `cashier` (
  `staff_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cook`
--

CREATE TABLE `cook` (
  `staff_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cook`
--

INSERT INTO `cook` (`staff_id`, `name`, `role`, `salary`) VALUES
(201, 'Ana Reyes', 'Cook', 18000.00);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `first_name`) VALUES
(101, 'John Doe'),
(102, 'Marie Susan'),
(103, 'Kier Sollano');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_details`
--

CREATE TABLE `inventory_details` (
  `inventory_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_details`
--

INSERT INTO `inventory_details` (`inventory_id`, `item_id`, `quantity`, `cost`, `subtotal`) VALUES
(1, 101, 5, 20.00, 100.00),
(1, 102, 3, 15.00, 45.00),
(1, 103, 2, 50.00, 100.00),
(2, 104, 4, 30.00, 120.00);

-- --------------------------------------------------------

--
-- Table structure for table `inventory_make`
--

CREATE TABLE `inventory_make` (
  `InventoryID` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `ManagerID` int(11) DEFAULT NULL,
  `CookID` int(11) DEFAULT NULL,
  `Total_make` int(11) DEFAULT NULL,
  `TotalCost` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_make`
--

INSERT INTO `inventory_make` (`InventoryID`, `date`, `ManagerID`, `CookID`, `Total_make`, `TotalCost`) VALUES
(1, '2025-03-12', 101, 201, 50, 2000.00),
(2, '2025-03-11', 101, 201, 50, 2000.00),
(3, '2025-03-10', 101, 201, 30, 1500.00),
(4, '2025-03-09', 101, 201, 20, 1000.00),
(5, '2025-03-11', 101, 201, 15, 500.00),
(6, '2025-03-13', 101, 201, 50, 5000.00);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_name`, `quantity`) VALUES
(1, 'Chicken Leg Quarter', 100),
(2, 'Soy Sauce', 200),
(3, 'Vinegar', 150),
(4, 'Chicken Pecho', 3),
(101, 'Chicken', 6),
(102, 'Soy Sauce', 10),
(103, 'Vinegar', 15),
(104, 'Garlic', 22);

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `staff_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`staff_id`, `name`, `role`, `salary`) VALUES
(101, 'Juan Dela Cruz', 'Manager', 20000.00);

-- --------------------------------------------------------

--
-- Table structure for table `ordertable`
--

CREATE TABLE `ordertable` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordertable`
--

INSERT INTO `ordertable` (`order_id`, `customer_id`, `staff_id`, `order_date`, `total_amount`) VALUES
(1, 101, 101, '2025-03-14', 219.00),
(2, 101, 101, '2025-03-14', 219.00),
(3, 101, 101, '2025-03-14', 210.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_details_normalmeat`
--

CREATE TABLE `order_details_normalmeat` (
  `order_details_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `InventoryID` int(11) DEFAULT NULL,
  `SellingPrice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details_normalmeat`
--

INSERT INTO `order_details_normalmeat` (`order_details_id`, `order_id`, `product_id`, `quantity`, `subtotal`, `InventoryID`, `SellingPrice`) VALUES
(1, 0, 'combo1', 1, 120.00, NULL, 120.00),
(2, 0, 'combo2', 1, 99.00, NULL, 99.00),
(3, 0, 'combo1', 1, 120.00, NULL, 120.00),
(4, 0, 'combo2', 1, 99.00, NULL, 99.00),
(5, 1, 'combo1', 1, 120.00, NULL, 120.00),
(6, 1, 'combo2', 1, 99.00, NULL, 99.00),
(7, 2, 'combo2', 1, 99.00, NULL, 99.00),
(8, 2, 'combo1', 1, 120.00, NULL, 120.00),
(9, 3, 'combo1', NULL, NULL, NULL, 120.00),
(10, 3, 'meal1', NULL, NULL, NULL, 90.00);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` varchar(50) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `SellingPrice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `description`, `SellingPrice`) VALUES
('coke', 'Coke', 'Coca-cola', 25.00),
('combo1', 'Combo Meal 1', '1 Pcs Pecho, Unli Rice, Unli Juice, Peri Peri Sauce', 120.00),
('combo2', 'Combo Meal 2', '1 Pcs Paa, Unli Rice, Unli Juice, Peri Peri Sauce', 99.00),
('liver', 'Chicken Liver', 'Grilled Chicken Liver', 15.00),
('meal1', 'Meal 1', '1 Pcs Pecho, Peri Peri Sauce', 90.00),
('meal2', 'Meal 2', '1 Pcs Paa, Peri Peri Sauce', 80.00),
('rice', 'Rice', 'Extra rice', 20.00),
('sprite', 'Sprite', 'Lemon Lime Soda', 25.00);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `shift` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `name`, `role`, `hire_date`, `salary`, `shift`) VALUES
(101, 'Juan Dela Cruz', 'Manager', '2022-01-01', 20000.00, 'Day'),
(201, 'Ana Reyes', 'Cook', '2023-05-10', 18000.00, 'Night');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplier_id`, `name`, `address`, `contact`) VALUES
(1, 'Fresh Farm Supplies', '123 Poultry Lane, Cebu', '09171234567'),
(2, 'AgriPro Distributors', '456 Agri St., Davao', '09181234567');

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

CREATE TABLE `supply` (
  `supply_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supply`
--

INSERT INTO `supply` (`supply_id`, `date`, `staff_id`, `total_amount`, `supplier_id`) VALUES
(1001, '2025-03-10', 101, 5500.00, 1),
(1002, '2025-03-11', 101, 3400.00, 2);

-- --------------------------------------------------------

--
-- Table structure for table `supplydetails_addon`
--

CREATE TABLE `supplydetails_addon` (
  `supply_id` int(11) NOT NULL,
  `AddONID` int(11) NOT NULL,
  `Qty` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `Subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplydetails_addon`
--

INSERT INTO `supplydetails_addon` (`supply_id`, `AddONID`, `Qty`, `price`, `Subtotal`) VALUES
(1001, 1, 40, 10.00, 400.00),
(1001, 2, 30, 20.00, 600.00),
(1002, 2, 15, 20.00, 300.00);

-- --------------------------------------------------------

--
-- Table structure for table `supply_details`
--

CREATE TABLE `supply_details` (
  `supply_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `supply_amount` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supply_details`
--

INSERT INTO `supply_details` (`supply_id`, `item_id`, `quantity`, `supply_amount`, `subtotal`) VALUES
(1001, 1, 30, 150.00, 4500.00),
(1001, 2, 10, 50.00, 500.00),
(1002, 2, 10, 50.00, 500.00),
(1002, 3, 20, 45.00, 900.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addonorder`
--
ALTER TABLE `addonorder`
  ADD PRIMARY KEY (`OrderID`,`AddONID`),
  ADD KEY `AddONID` (`AddONID`);

--
-- Indexes for table `addonproduct`
--
ALTER TABLE `addonproduct`
  ADD PRIMARY KEY (`AddONID`);

--
-- Indexes for table `cashier`
--
ALTER TABLE `cashier`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `cook`
--
ALTER TABLE `cook`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `inventory_details`
--
ALTER TABLE `inventory_details`
  ADD PRIMARY KEY (`inventory_id`,`item_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `inventory_make`
--
ALTER TABLE `inventory_make`
  ADD PRIMARY KEY (`InventoryID`),
  ADD KEY `ManagerID` (`ManagerID`),
  ADD KEY `CookID` (`CookID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `order_details_normalmeat`
--
ALTER TABLE `order_details_normalmeat`
  ADD PRIMARY KEY (`order_details_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `InventoryID` (`InventoryID`),
  ADD KEY `order_details_normalmeat_ibfk_2` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `supply`
--
ALTER TABLE `supply`
  ADD PRIMARY KEY (`supply_id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `supplydetails_addon`
--
ALTER TABLE `supplydetails_addon`
  ADD PRIMARY KEY (`supply_id`,`AddONID`),
  ADD KEY `AddONID` (`AddONID`);

--
-- Indexes for table `supply_details`
--
ALTER TABLE `supply_details`
  ADD PRIMARY KEY (`supply_id`,`item_id`),
  ADD KEY `item_id` (`item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ordertable`
--
ALTER TABLE `ordertable`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_details_normalmeat`
--
ALTER TABLE `order_details_normalmeat`
  MODIFY `order_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addonorder`
--
ALTER TABLE `addonorder`
  ADD CONSTRAINT `addonorder_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `ordertable` (`order_id`),
  ADD CONSTRAINT `addonorder_ibfk_2` FOREIGN KEY (`AddONID`) REFERENCES `addonproduct` (`AddONID`);

--
-- Constraints for table `cashier`
--
ALTER TABLE `cashier`
  ADD CONSTRAINT `cashier_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Constraints for table `cook`
--
ALTER TABLE `cook`
  ADD CONSTRAINT `cook_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Constraints for table `inventory_details`
--
ALTER TABLE `inventory_details`
  ADD CONSTRAINT `inventory_details_ibfk_1` FOREIGN KEY (`inventory_id`) REFERENCES `inventory_make` (`InventoryID`),
  ADD CONSTRAINT `inventory_details_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);

--
-- Constraints for table `inventory_make`
--
ALTER TABLE `inventory_make`
  ADD CONSTRAINT `inventory_make_ibfk_1` FOREIGN KEY (`ManagerID`) REFERENCES `manager` (`staff_id`),
  ADD CONSTRAINT `inventory_make_ibfk_2` FOREIGN KEY (`CookID`) REFERENCES `cook` (`staff_id`);

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Constraints for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD CONSTRAINT `ordertable_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  ADD CONSTRAINT `ordertable_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Constraints for table `order_details_normalmeat`
--
ALTER TABLE `order_details_normalmeat`
  ADD CONSTRAINT `order_details_normalmeat_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `ordertable` (`order_id`),
  ADD CONSTRAINT `order_details_normalmeat_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `order_details_normalmeat_ibfk_3` FOREIGN KEY (`InventoryID`) REFERENCES `inventory_make` (`InventoryID`);

--
-- Constraints for table `supply`
--
ALTER TABLE `supply`
  ADD CONSTRAINT `supply_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `supply_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`);

--
-- Constraints for table `supplydetails_addon`
--
ALTER TABLE `supplydetails_addon`
  ADD CONSTRAINT `supplydetails_addon_ibfk_1` FOREIGN KEY (`supply_id`) REFERENCES `supply` (`supply_id`),
  ADD CONSTRAINT `supplydetails_addon_ibfk_2` FOREIGN KEY (`AddONID`) REFERENCES `addonproduct` (`AddONID`);

--
-- Constraints for table `supply_details`
--
ALTER TABLE `supply_details`
  ADD CONSTRAINT `supply_details_ibfk_1` FOREIGN KEY (`supply_id`) REFERENCES `supply` (`supply_id`),
  ADD CONSTRAINT `supply_details_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
