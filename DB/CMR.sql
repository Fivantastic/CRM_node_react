DROP DATABASE IF EXISTS CMR;
CREATE DATABASE CMR;
USE CMR;

-- Tabla Direcciones
CREATE TABLE Direcciones (
    id_direcciones INT AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR(255) NOT NULL,
    numero VARCHAR(20),
    piso VARCHAR(10),
    letra_numero VARCHAR(10),
    ciudad VARCHAR(100),
    codigo_postal VARCHAR(20),
    pais VARCHAR(100)
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('comercial', 'repartidor', 'administrador') NOT NULL,
    activado BOOLEAN NOT NULL DEFAULT false,
    codigo_registro CHAR(36) NOT NULL,
    avatar VARCHAR(255),
    biografia TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    direccion_id INT,
    FOREIGN KEY (direccion_id) REFERENCES Direcciones(id_direcciones)
);

-- Tabla Clientes
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion_id INT,
    FOREIGN KEY (direccion_id) REFERENCES Direcciones(id_direcciones)
);

-- Tabla Productos
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    estado_producto ENUM('activo', 'desactivado') NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla Servicios
CREATE TABLE Servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    estado ENUM('activo', 'desactivado') NOT NULL
);

-- Tabla Operaciones
CREATE TABLE Operaciones (
    id_operacion INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT,
    servicio_id INT,
    cliente_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(50),
    estado_operacion ENUM('abierto', 'cerrado') NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (producto_id) REFERENCES Productos(id_producto),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(id_servicio),
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id_cliente)
);

-- Tabla Valoraciones
CREATE TABLE Valoraciones (
    id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
    operacion_id INT NOT NULL,
    usuario_id INT NOT NULL,
    puntuacion INT NOT NULL,
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (operacion_id) REFERENCES Operaciones(id_operacion),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id_usuario)
);

-- Agregamos un índice a la columna producto_id en la tabla Operaciones
ALTER TABLE Operaciones ADD INDEX (producto_id);

-- Agregamos un índice a la columna servicio_id en la tabla Operaciones
ALTER TABLE Operaciones ADD INDEX (servicio_id);

-- Agregamos un índice a la columna cliente_id en la tabla Operaciones
ALTER TABLE Operaciones ADD INDEX (cliente_id);
