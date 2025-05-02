-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2025 at 08:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `el_gran_mercado`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_negocio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `compras`
--

CREATE TABLE `compras` (
  `id_compra` int(11) NOT NULL,
  `id_negocio` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_total` decimal(10,2) NOT NULL,
  `fecha_compra` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `compras`
--
DELIMITER $$
CREATE TRIGGER `trg_actualizar_inventario_compra` AFTER INSERT ON `compras` FOR EACH ROW BEGIN
  DECLARE existe INT;

  SELECT COUNT(*) INTO existe
  FROM inventario
  WHERE id_negocio = NEW.id_negocio AND id_producto = NEW.id_producto;

  IF existe > 0 THEN
    -- Si ya existe el producto en el inventario, actualiza cantidad
    UPDATE inventario
    SET cantidad = cantidad + NEW.cantidad
    WHERE id_negocio = NEW.id_negocio AND id_producto = NEW.id_producto;
  ELSE
    -- Si no existe, lo inserta
    INSERT INTO inventario (id_negocio, id_producto, cantidad)
    VALUES (NEW.id_negocio, NEW.id_producto, NEW.cantidad);
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_restaurar_capital_compra` AFTER INSERT ON `compras` FOR EACH ROW BEGIN
  UPDATE negocios
  SET capital_actual = capital_actual - NEW.costo_total
  WHERE id_negocio = NEW.id_negocio;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `credenciales`
--

CREATE TABLE `credenciales` (
  `id_credencial` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `credenciales`
--

INSERT INTO `credenciales` (`id_credencial`, `id_usuario`, `username`, `password_hash`) VALUES
(1, 1, 'ejemplo22@hotmail.com', '$2y$10$gnDW85WE9tZTK4vSXV0IquunJWI2LGbfRErKEmpJt3KFvIfN7TFQC');

-- --------------------------------------------------------

--
-- Table structure for table `gastos_negocio`
--

CREATE TABLE `gastos_negocio` (
  `id_gasto` int(11) NOT NULL,
  `id_negocio_juego` int(11) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventario_juego`
--

CREATE TABLE `inventario_juego` (
  `id_inventario` int(11) NOT NULL,
  `id_negocio_juego` int(11) DEFAULT NULL,
  `id_producto_juego` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventario_juego`
--

INSERT INTO `inventario_juego` (`id_inventario`, `id_negocio_juego`, `id_producto_juego`, `cantidad`) VALUES
(1, 1, 1, 20),
(2, 1, 2, 30),
(3, 1, 3, 10),
(4, 1, 4, 50),
(5, 1, 5, 15),
(6, 1, 6, 25),
(7, 1, 7, 40),
(8, 1, 8, 35),
(9, 1, 9, 18),
(10, 1, 10, 50),
(11, 2, 11, 100),
(12, 2, 12, 80),
(13, 2, 13, 90),
(14, 2, 14, 120),
(15, 2, 15, 60),
(16, 2, 16, 40),
(17, 2, 17, 50),
(18, 2, 18, 70),
(19, 2, 19, 60),
(20, 2, 20, 55),
(21, 3, 21, 5),
(22, 3, 22, 8),
(23, 3, 23, 12),
(24, 3, 24, 7),
(25, 3, 25, 15),
(26, 3, 26, 10),
(27, 3, 27, 6),
(28, 3, 28, 14),
(29, 3, 29, 9),
(30, 3, 30, 20);

-- --------------------------------------------------------

--
-- Table structure for table `logros`
--

CREATE TABLE `logros` (
  `id_logro` int(11) NOT NULL,
  `nombre_logro` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `puntos` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `misiones`
--

CREATE TABLE `misiones` (
  `id_mision` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `recompensa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `misiones_usuario`
--

CREATE TABLE `misiones_usuario` (
  `id_mision` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `completada` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `negocios`
--

CREATE TABLE `negocios` (
  `id_negocio` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_negocio_juego` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `negocios_juego`
--

CREATE TABLE `negocios_juego` (
  `id_negocio_juego` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `capital_inicial` decimal(15,2) DEFAULT 1000.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `negocios_juego`
--

INSERT INTO `negocios_juego` (`id_negocio_juego`, `nombre`, `categoria`, `capital_inicial`) VALUES
(1, 'Ferretería', 'Ferretería', 1000.00),
(2, 'Colmado', 'Colmado', 1000.00),
(3, 'Electrodomésticos', 'Electrodomésticos', 1000.00);

-- --------------------------------------------------------

--
-- Table structure for table `niveles`
--

CREATE TABLE `niveles` (
  `nivel` int(11) NOT NULL,
  `xp_necesaria` int(11) DEFAULT NULL,
  `recompensa_dinero` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id_notificacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `leido` tinyint(1) DEFAULT 0,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ofertas`
--

CREATE TABLE `ofertas` (
  `id_evento` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `impacto` decimal(5,2) NOT NULL,
  `fecha_inicio` timestamp NULL DEFAULT NULL,
  `fecha_fin` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `preferencias_clientes`
--

CREATE TABLE `preferencias_clientes` (
  `id_cliente` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_deseada` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_negocio` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos_juego`
--

CREATE TABLE `productos_juego` (
  `id_producto_juego` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `precio_base` decimal(10,2) NOT NULL,
  `id_negocio_juego` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos_juego`
--

INSERT INTO `productos_juego` (`id_producto_juego`, `nombre`, `categoria`, `precio_base`, `id_negocio_juego`) VALUES
(1, 'Martillo', 'Herramientas', 15.00, 1),
(2, 'Destornillador', 'Herramientas', 8.50, 1),
(3, 'Taladro', 'Herramientas eléctricas', 75.00, 1),
(4, 'Caja de clavos', 'Materiales', 5.00, 1),
(5, 'Sierra manual', 'Herramientas', 20.00, 1),
(6, 'Llave inglesa', 'Herramientas', 12.00, 1),
(7, 'Cinta métrica', 'Herramientas', 7.00, 1),
(8, 'Pegamento industrial', 'Materiales', 6.50, 1),
(9, 'Pintura acrílica', 'Pinturas', 18.00, 1),
(10, 'Brocha', 'Pinturas', 3.50, 1),
(11, 'Arroz 1kg', 'Alimentos', 2.00, 2),
(12, 'Aceite vegetal', 'Alimentos', 3.50, 2),
(13, 'Azúcar 1kg', 'Alimentos', 2.20, 2),
(14, 'Sal 1kg', 'Alimentos', 1.00, 2),
(15, 'Galletas dulces', 'Snacks', 1.50, 2),
(16, 'Leche en polvo', 'Lácteos', 4.00, 2),
(17, 'Detergente', 'Limpieza', 3.00, 2),
(18, 'Jabón de baño', 'Higiene', 1.20, 2),
(19, 'Papel higiénico', 'Higiene', 2.50, 2),
(20, 'Refresco 2L', 'Bebidas', 2.80, 2),
(21, 'Refrigerador', 'Electrodomésticos', 350.00, 3),
(22, 'Microondas', 'Electrodomésticos', 120.00, 3),
(23, 'Licuadora', 'Electrodomésticos', 45.00, 3),
(24, 'Televisor 32\"', 'Electrodomésticos', 220.00, 3),
(25, 'Plancha eléctrica', 'Electrodomésticos', 30.00, 3),
(26, 'Cafetera', 'Electrodomésticos', 55.00, 3),
(27, 'Aspiradora', 'Electrodomésticos', 150.00, 3),
(28, 'Ventilador', 'Electrodomésticos', 40.00, 3),
(29, 'Horno eléctrico', 'Electrodomésticos', 100.00, 3),
(30, 'Batidora de mano', 'Electrodomésticos', 25.00, 3);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `experiencia` int(11) DEFAULT 0,
  `nivel` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `fecha_registro`, `experiencia`, `nivel`) VALUES
(1, 'Juan', 'ejemplo22@hotmail.com', '2025-04-13 22:16:42', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuario_logros`
--

CREATE TABLE `usuario_logros` (
  `id_usuario` int(11) NOT NULL,
  `id_logro` int(11) NOT NULL,
  `fecha_logro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_negocio` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_venta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `ventas`
--
DELIMITER $$
CREATE TRIGGER `trg_actualizar_inventario_venta` AFTER INSERT ON `ventas` FOR EACH ROW BEGIN
  UPDATE inventario
  SET cantidad = GREATEST(cantidad - NEW.cantidad, 0)
  WHERE id_negocio = NEW.id_negocio AND id_producto = NEW.id_producto;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_aumentar_capital_venta` AFTER INSERT ON `ventas` FOR EACH ROW BEGIN
  UPDATE negocios
  SET capital_actual = capital_actual + NEW.total
  WHERE id_negocio = NEW.id_negocio;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `vista_productos_mas_vendidos`
-- (See below for the actual view)
--
CREATE TABLE `vista_productos_mas_vendidos` (
`nombre` varchar(100)
,`total_vendidos` decimal(32,0)
,`ingresos_totales` decimal(32,2)
);

-- --------------------------------------------------------

--
-- Structure for view `vista_productos_mas_vendidos`
--
DROP TABLE IF EXISTS `vista_productos_mas_vendidos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_productos_mas_vendidos`  AS SELECT `p`.`nombre` AS `nombre`, sum(`v`.`cantidad`) AS `total_vendidos`, sum(`v`.`total`) AS `ingresos_totales` FROM (`ventas` `v` join `productos` `p` on(`v`.`id_producto` = `p`.`id_producto`)) GROUP BY `p`.`id_producto` ORDER BY sum(`v`.`cantidad`) DESC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `id_negocio` (`id_negocio`);

--
-- Indexes for table `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `id_negocio` (`id_negocio`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `fk_compras_clientes` (`id_cliente`);

--
-- Indexes for table `credenciales`
--
ALTER TABLE `credenciales`
  ADD PRIMARY KEY (`id_credencial`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `gastos_negocio`
--
ALTER TABLE `gastos_negocio`
  ADD PRIMARY KEY (`id_gasto`),
  ADD KEY `id_negocio_juego` (`id_negocio_juego`);

--
-- Indexes for table `inventario_juego`
--
ALTER TABLE `inventario_juego`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `fk_inventario_negocio_idx` (`id_negocio_juego`),
  ADD KEY `fk_inventario_producto_idx` (`id_producto_juego`);

--
-- Indexes for table `logros`
--
ALTER TABLE `logros`
  ADD PRIMARY KEY (`id_logro`);

--
-- Indexes for table `misiones`
--
ALTER TABLE `misiones`
  ADD PRIMARY KEY (`id_mision`);

--
-- Indexes for table `misiones_usuario`
--
ALTER TABLE `misiones_usuario`
  ADD PRIMARY KEY (`id_mision`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `negocios`
--
ALTER TABLE `negocios`
  ADD PRIMARY KEY (`id_negocio`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_negocio_juego` (`id_negocio_juego`);

--
-- Indexes for table `negocios_juego`
--
ALTER TABLE `negocios_juego`
  ADD PRIMARY KEY (`id_negocio_juego`);

--
-- Indexes for table `niveles`
--
ALTER TABLE `niveles`
  ADD PRIMARY KEY (`nivel`);

--
-- Indexes for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id_notificacion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`id_evento`);

--
-- Indexes for table `preferencias_clientes`
--
ALTER TABLE `preferencias_clientes`
  ADD PRIMARY KEY (`id_cliente`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_negocio` (`id_negocio`);

--
-- Indexes for table `productos_juego`
--
ALTER TABLE `productos_juego`
  ADD PRIMARY KEY (`id_producto_juego`),
  ADD KEY `id_negocio_juego` (`id_negocio_juego`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usuario_logros`
--
ALTER TABLE `usuario_logros`
  ADD PRIMARY KEY (`id_usuario`,`id_logro`),
  ADD KEY `id_logro` (`id_logro`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_negocio` (`id_negocio`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `credenciales`
--
ALTER TABLE `credenciales`
  MODIFY `id_credencial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gastos_negocio`
--
ALTER TABLE `gastos_negocio`
  MODIFY `id_gasto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventario_juego`
--
ALTER TABLE `inventario_juego`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `logros`
--
ALTER TABLE `logros`
  MODIFY `id_logro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `misiones`
--
ALTER TABLE `misiones`
  MODIFY `id_mision` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `negocios`
--
ALTER TABLE `negocios`
  MODIFY `id_negocio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `negocios_juego`
--
ALTER TABLE `negocios_juego`
  MODIFY `id_negocio_juego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id_notificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `id_evento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `productos_juego`
--
ALTER TABLE `productos_juego`
  MODIFY `id_producto_juego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_negocio`) REFERENCES `negocios` (`id_negocio`);

--
-- Constraints for table `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`id_negocio`) REFERENCES `negocios` (`id_negocio`) ON DELETE CASCADE,
  ADD CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_compras_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);

--
-- Constraints for table `credenciales`
--
ALTER TABLE `credenciales`
  ADD CONSTRAINT `credenciales_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Constraints for table `gastos_negocio`
--
ALTER TABLE `gastos_negocio`
  ADD CONSTRAINT `gastos_negocio_ibfk_1` FOREIGN KEY (`id_negocio_juego`) REFERENCES `negocios_juego` (`id_negocio_juego`);

--
-- Constraints for table `inventario_juego`
--
ALTER TABLE `inventario_juego`
  ADD CONSTRAINT `fk_inventario_negocio` FOREIGN KEY (`id_negocio_juego`) REFERENCES `negocios_juego` (`id_negocio_juego`),
  ADD CONSTRAINT `fk_inventario_producto` FOREIGN KEY (`id_producto_juego`) REFERENCES `productos_juego` (`id_producto_juego`);

--
-- Constraints for table `misiones_usuario`
--
ALTER TABLE `misiones_usuario`
  ADD CONSTRAINT `misiones_usuario_ibfk_1` FOREIGN KEY (`id_mision`) REFERENCES `misiones` (`id_mision`),
  ADD CONSTRAINT `misiones_usuario_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Constraints for table `negocios`
--
ALTER TABLE `negocios`
  ADD CONSTRAINT `negocios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `negocios_ibfk_2` FOREIGN KEY (`id_negocio_juego`) REFERENCES `negocios_juego` (`id_negocio_juego`);

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Constraints for table `preferencias_clientes`
--
ALTER TABLE `preferencias_clientes`
  ADD CONSTRAINT `preferencias_clientes_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  ADD CONSTRAINT `preferencias_clientes_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_negocio`) REFERENCES `negocios` (`id_negocio`) ON DELETE CASCADE;

--
-- Constraints for table `productos_juego`
--
ALTER TABLE `productos_juego`
  ADD CONSTRAINT `productos_juego_ibfk_1` FOREIGN KEY (`id_negocio_juego`) REFERENCES `negocios_juego` (`id_negocio_juego`) ON DELETE CASCADE;

--
-- Constraints for table `usuario_logros`
--
ALTER TABLE `usuario_logros`
  ADD CONSTRAINT `usuario_logros_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_logros_ibfk_2` FOREIGN KEY (`id_logro`) REFERENCES `logros` (`id_logro`) ON DELETE CASCADE;

--
-- Constraints for table `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_negocio`) REFERENCES `negocios` (`id_negocio`) ON DELETE CASCADE,
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
