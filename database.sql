CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credenciales (
    id_credencial INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE negocios (
    id_negocio INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_negocio_juego) REFERENCES negocios_juego(id_negocio_juego)
);
CREATE TABLE negocios_juego (
    id_negocio_juego INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL
);


CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_negocio INT,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_negocio) REFERENCES negocios(id_negocio) ON DELETE CASCADE
);
CREATE TABLE productos_juego (
    id_producto_juego INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio_base DECIMAL(10,2) NOT NULL, -- Precio estándar de referencia
    id_negocio_juego INT, -- Relación con los negocios del juego
    FOREIGN KEY (id_negocio_juego) REFERENCES negocios_juego(id_negocio_juego) ON DELETE CASCADE
);


CREATE TABLE inventario (
    id_inventario INT AUTO_INCREMENT PRIMARY KEY,
    id_negocio INT,
    id_producto INT,
    cantidad INT DEFAULT 0,
    FOREIGN KEY (id_negocio) REFERENCES negocios(id_negocio) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_negocio INT,
    id_producto INT,
    cantidad INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_negocio) REFERENCES negocios(id_negocio) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

CREATE TABLE compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_negocio INT,
    id_producto INT,
    cantidad INT NOT NULL,
    costo_total DECIMAL(10,2) NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_negocio) REFERENCES negocios(id_negocio) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    impacto DECIMAL(5,2) NOT NULL, -- Puede ser positivo o negativo
    fecha_inicio TIMESTAMP NULL,
    fecha_fin TIMESTAMP NULL
);