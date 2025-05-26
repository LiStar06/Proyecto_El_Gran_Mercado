-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2025 at 12:45 PM
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
-- Database: `gran_mercado`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo_negocio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `tipo_negocio_id`) VALUES
(1, 'Camila Valencia', 1),
(2, 'Luis Fernando Ríos', 1),
(3, 'Valeria Torres', 1),
(4, 'Andrés Molina', 1),
(5, 'Mariana Restrepo', 1),
(6, 'Daniela Giraldo', 1),
(7, 'Juan Pablo Vélez', 1),
(8, 'Laura Cardona', 1),
(9, 'Santiago Correa', 1),
(10, 'Isabela Mejía', 1),
(11, 'Natalia Herrera', 2),
(12, 'Sebastián Orozco', 2),
(13, 'Lucía Marín', 2),
(14, 'Felipe Castaño', 2),
(15, 'Ana Sofía López', 2),
(16, 'Tomás Rincón', 2),
(17, 'Juliana Franco', 2),
(18, 'Mateo Salazar', 2),
(19, 'Gabriela Duque', 2),
(20, 'Emilio Zapata', 2),
(21, 'Rosa Muñoz', 3),
(22, 'Carlos Martínez', 3),
(23, 'Sandra Hoyos', 3),
(24, 'Oscar Perdomo', 3),
(25, 'Lina González', 3),
(26, 'Pedro Ramírez', 3),
(27, 'Mónica Quintero', 3),
(28, 'Diego Arango', 3),
(29, 'Paula Espinosa', 3),
(30, 'Jorge Acosta', 3);

-- --------------------------------------------------------

--
-- Table structure for table `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `nivel` int(11) DEFAULT 1,
  `puntos_experiencia` int(11) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jugadores`
--

INSERT INTO `jugadores` (`id`, `nombre_usuario`, `correo_electronico`, `contrasena_hash`, `nivel`, `puntos_experiencia`, `fecha_creacion`) VALUES
(1, 'Juan', 'ejemplo22@hotmail.com', '$2y$10$r0jDBbvfITT6J9PdSCBhMuQ2P77O3qkiyS2W2lpefAFx1Seilq5IK', 1, 0, '2025-05-07 07:40:11'),
(5, 'Pedro', 'pedro22@hotmail.com', '$2y$10$taTrXPyK/2o6hg8szu90UOf6zNFM1j1UqcFjlqjQYg23jI6xlnYx2', 1, 0, '2025-05-12 04:59:35'),
(7, 'Viveres y mas', 'juan22@hotmail.com', '$2y$10$ay.w4fONCYXcmA0qeQ8d.em1s360rrPJLo/JsPMFO5Npro3ncoPtO', 1, 0, '2025-05-26 09:03:56');

-- --------------------------------------------------------

--
-- Table structure for table `negocios`
--

CREATE TABLE `negocios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `jugador_id` int(11) NOT NULL,
  `tipo_negocio_id` int(11) NOT NULL,
  `saldo` decimal(10,2) DEFAULT 0.00,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `negocios`
--

INSERT INTO `negocios` (`id`, `nombre`, `jugador_id`, `tipo_negocio_id`, `saldo`, `fecha_creacion`) VALUES
(1, 'Ropas y mas', 1, 2, 6660.00, '2025-05-12 03:48:16'),
(2, 'Piedras', 5, 1, 5400.00, '2025-05-12 04:59:48'),
(5, 'De todos', 7, 3, 2000.00, '2025-05-26 10:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `niveles`
--

CREATE TABLE `niveles` (
  `id` int(11) NOT NULL,
  `numero_nivel` int(11) NOT NULL,
  `experiencia_requerida` int(11) NOT NULL,
  `descripcion_recompensas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `objetivos`
--

CREATE TABLE `objetivos` (
  `id` int(11) NOT NULL,
  `nivel_id` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo_objetivo` enum('vender','ganar','poseer_producto') NOT NULL,
  `valor_meta` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `objetivos_jugador`
--

CREATE TABLE `objetivos_jugador` (
  `id` int(11) NOT NULL,
  `jugador_id` int(11) NOT NULL,
  `objetivo_id` int(11) NOT NULL,
  `progreso` int(11) DEFAULT 0,
  `completado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ofertas`
--

CREATE TABLE `ofertas` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `porcentaje_descuento` decimal(5,2) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `usos_maximos_por_jugador` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ofertas`
--

INSERT INTO `ofertas` (`id`, `producto_id`, `porcentaje_descuento`, `fecha_inicio`, `fecha_fin`, `usos_maximos_por_jugador`) VALUES
(1, 1, 15.00, '2025-05-05', '2025-05-12', 1),
(2, 5, 20.00, '2025-05-05', '2025-05-10', 2),
(3, 9, 10.00, '2025-05-05', '2025-05-15', 3);

-- --------------------------------------------------------

--
-- Table structure for table `prestamos`
--

CREATE TABLE `prestamos` (
  `id` int(11) NOT NULL,
  `jugador_id` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `monto_del_prestamo` decimal(10,2) NOT NULL,
  `monto_de_cuotas` decimal(10,2) NOT NULL,
  `numero_cuotas` int(11) NOT NULL,
  `cuotas_pagas` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prestamos`
--

INSERT INTO `prestamos` (`id`, `jugador_id`, `monto`, `monto_del_prestamo`, `monto_de_cuotas`, `numero_cuotas`, `cuotas_pagas`) VALUES
(2, 1, 0.00, 2100.00, 210.00, 11, 11),
(3, 1, 2310.00, 2100.00, 210.00, 11, 0);

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `precio_base` decimal(10,2) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `categoria`, `precio_base`, `descripcion`) VALUES
(1, 'Anillo de oro', 'Joyeria', 800.00, 'Anillo de oro de 18 quilates.'),
(2, 'Collar de plata', 'Joyeria', 400.00, 'Collar elegante de plata esterlina.'),
(3, 'Reloj de lujo', 'Joyeria', 1500.00, 'Reloj suizo de alta gama.'),
(4, 'Camisa de algodón', 'Tienda de Ropas', 30.00, 'Camisa casual de algodón.'),
(5, 'Pantalón de mezclilla', 'Tienda de Ropas', 45.00, 'Jeans clásicos resistentes.'),
(6, 'Chaqueta impermeable', 'Tienda de Ropas', 90.00, 'Chaqueta contra lluvia y viento.'),
(7, 'Arroz (1 kg)', 'Tienda de viveres', 3.00, 'Arroz blanco de grano largo.'),
(8, 'Aceite vegetal (1 L)', 'Tienda de viveres', 4.50, 'Aceite vegetal para cocinar.'),
(9, 'Pan (500 g)', 'Tienda de viveres', 2.00, 'Pan fresco artesanal.');

-- --------------------------------------------------------

--
-- Table structure for table `productos_negocio`
--

CREATE TABLE `productos_negocio` (
  `id` int(11) NOT NULL,
  `negocio_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 0,
  `precio_compra` decimal(10,2) DEFAULT NULL,
  `precio_venta` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos_negocio`
--

INSERT INTO `productos_negocio` (`id`, `negocio_id`, `producto_id`, `cantidad`, `precio_compra`, `precio_venta`) VALUES
(24, 1, 4, 9, 30.00, 40.00),
(25, 1, 6, 0, 70.00, 80.00),
(26, 1, 5, 3, 45.00, 60.00),
(27, 2, 3, 0, 1500.00, 1800.00),
(28, 2, 1, 1, 800.00, 1200.00),
(29, 2, 2, 0, 400.00, 600.00);

-- --------------------------------------------------------

--
-- Table structure for table `tipos_negocio`
--

CREATE TABLE `tipos_negocio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `saldo_inicial` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tipos_negocio`
--

INSERT INTO `tipos_negocio` (`id`, `nombre`, `descripcion`, `saldo_inicial`) VALUES
(1, 'Joyería', 'Negocio especializado en la venta de joyas y accesorios de lujo.', 5000.00),
(2, 'Tienda de Ropas', 'Venta de ropa casual, formal y de temporada.', 3000.00),
(3, 'Tienda de viveres', 'Tienda de productos alimenticios y artículos de primera necesidad.', 2000.00);

-- --------------------------------------------------------

--
-- Table structure for table `transacciones`
--

CREATE TABLE `transacciones` (
  `id` int(11) NOT NULL,
  `negocio_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `tipo` enum('compra','venta') NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `jugador_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transacciones`
--

INSERT INTO `transacciones` (`id`, `negocio_id`, `producto_id`, `tipo`, `cantidad`, `precio_unitario`, `precio_total`, `fecha`, `jugador_id`) VALUES
(13, 1, 5, 'compra', 2, 45.00, 90.00, '2025-05-19 11:33:08', 1),
(14, 1, 6, 'venta', 3, 85.00, 255.00, '2025-05-19 12:56:37', 1),
(15, 1, 4, 'venta', 3, 40.00, 120.00, '2025-05-19 13:10:05', 1),
(16, 1, 5, 'compra', 5, 45.00, 225.00, '2025-05-19 19:01:24', 1),
(17, 1, 6, 'venta', 1, 85.00, 85.00, '2025-05-19 21:10:56', 1),
(18, 2, 2, 'compra', 1, 400.00, 400.00, '2025-05-19 21:13:11', 5),
(19, 2, 3, 'venta', 2, 1800.00, 3600.00, '2025-05-19 21:38:27', 5),
(20, 2, 2, 'venta', 3, 600.00, 1800.00, '2025-05-19 21:38:49', 5),
(21, 1, 5, 'venta', 2, 60.00, 120.00, '2025-05-24 11:59:43', 1),
(22, 1, 4, 'compra', 4, 30.00, 120.00, '2025-05-24 12:00:32', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usos_ofertas_jugador`
--

CREATE TABLE `usos_ofertas_jugador` (
  `id` int(11) NOT NULL,
  `jugador_id` int(11) NOT NULL,
  `oferta_id` int(11) NOT NULL,
  `veces_usada` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `jugador_id` int(11) NOT NULL,
  `negocio_id` int(11) NOT NULL,
  `cliente_id` int(10) UNSIGNED NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ventas`
--

INSERT INTO `ventas` (`id`, `jugador_id`, `negocio_id`, `cliente_id`, `producto_id`, `cantidad`, `precio_unitario`, `monto`, `fecha`) VALUES
(5, 1, 1, 13, 5, 2, 60.00, 120.00, '2025-05-19 08:49:20'),
(6, 1, 1, 13, 6, 3, 85.00, 255.00, '2025-05-19 08:56:37'),
(7, 1, 1, 11, 4, 3, 40.00, 120.00, '2025-05-19 09:10:05'),
(8, 1, 1, 12, 6, 1, 85.00, 85.00, '2025-05-19 17:10:56'),
(9, 5, 2, 2, 3, 2, 1800.00, 3600.00, '2025-05-19 17:38:27'),
(10, 5, 2, 2, 2, 3, 600.00, 1800.00, '2025-05-19 17:38:49'),
(11, 1, 1, 15, 5, 2, 60.00, 120.00, '2025-05-24 07:59:43');

--
-- Triggers `ventas`
--
DELIMITER $$
CREATE TRIGGER `actualizar_capital_despues_venta` AFTER INSERT ON `ventas` FOR EACH ROW BEGIN
    UPDATE negocios
    SET saldo = saldo + NEW.monto
    WHERE id = NEW.negocio_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `descontar_stock_despues_venta` AFTER INSERT ON `ventas` FOR EACH ROW BEGIN
  UPDATE productos_negocio
  SET cantidad = cantidad - NEW.cantidad
  WHERE producto_id = NEW.producto_id AND negocio_id = NEW.negocio_id;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_negocio_id` (`tipo_negocio_id`);

--
-- Indexes for table `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- Indexes for table `negocios`
--
ALTER TABLE `negocios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugador_id` (`jugador_id`),
  ADD KEY `tipo_negocio_id` (`tipo_negocio_id`);

--
-- Indexes for table `niveles`
--
ALTER TABLE `niveles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_nivel` (`numero_nivel`);

--
-- Indexes for table `objetivos`
--
ALTER TABLE `objetivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nivel_id` (`nivel_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indexes for table `objetivos_jugador`
--
ALTER TABLE `objetivos_jugador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugador_id` (`jugador_id`),
  ADD KEY `objetivo_id` (`objetivo_id`);

--
-- Indexes for table `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indexes for table `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugador_id` (`jugador_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productos_negocio`
--
ALTER TABLE `productos_negocio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `negocio_id` (`negocio_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indexes for table `tipos_negocio`
--
ALTER TABLE `tipos_negocio`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indexes for table `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `negocio_id` (`negocio_id`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `fk_transacciones_jugador` (`jugador_id`);

--
-- Indexes for table `usos_ofertas_jugador`
--
ALTER TABLE `usos_ofertas_jugador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugador_id` (`jugador_id`),
  ADD KEY `oferta_id` (`oferta_id`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugador_id` (`jugador_id`),
  ADD KEY `negocio_id` (`negocio_id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `negocios`
--
ALTER TABLE `negocios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `niveles`
--
ALTER TABLE `niveles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `objetivos`
--
ALTER TABLE `objetivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `objetivos_jugador`
--
ALTER TABLE `objetivos_jugador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `productos_negocio`
--
ALTER TABLE `productos_negocio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tipos_negocio`
--
ALTER TABLE `tipos_negocio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `usos_ofertas_jugador`
--
ALTER TABLE `usos_ofertas_jugador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`tipo_negocio_id`) REFERENCES `tipos_negocio` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `negocios`
--
ALTER TABLE `negocios`
  ADD CONSTRAINT `negocios_ibfk_1` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`),
  ADD CONSTRAINT `negocios_ibfk_2` FOREIGN KEY (`tipo_negocio_id`) REFERENCES `tipos_negocio` (`id`);

--
-- Constraints for table `objetivos`
--
ALTER TABLE `objetivos`
  ADD CONSTRAINT `objetivos_ibfk_1` FOREIGN KEY (`nivel_id`) REFERENCES `niveles` (`id`),
  ADD CONSTRAINT `objetivos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Constraints for table `objetivos_jugador`
--
ALTER TABLE `objetivos_jugador`
  ADD CONSTRAINT `objetivos_jugador_ibfk_1` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`),
  ADD CONSTRAINT `objetivos_jugador_ibfk_2` FOREIGN KEY (`objetivo_id`) REFERENCES `objetivos` (`id`);

--
-- Constraints for table `ofertas`
--
ALTER TABLE `ofertas`
  ADD CONSTRAINT `ofertas_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Constraints for table `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`);

--
-- Constraints for table `productos_negocio`
--
ALTER TABLE `productos_negocio`
  ADD CONSTRAINT `productos_negocio_ibfk_1` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`),
  ADD CONSTRAINT `productos_negocio_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Constraints for table `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `fk_transacciones_jugador` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`),
  ADD CONSTRAINT `transacciones_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Constraints for table `usos_ofertas_jugador`
--
ALTER TABLE `usos_ofertas_jugador`
  ADD CONSTRAINT `usos_ofertas_jugador_ibfk_1` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`),
  ADD CONSTRAINT `usos_ofertas_jugador_ibfk_2` FOREIGN KEY (`oferta_id`) REFERENCES `ofertas` (`id`);

--
-- Constraints for table `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`),
  ADD CONSTRAINT `ventas_ibfk_3` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `ventas_ibfk_4` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
