import { MYSQL_DATABASE, JWT_SECRET } from "../../env.js";
import jwt from "jsonwebtoken";

export async function createDBSchema(db) {
    console.log("Borrando base de datos (si existe)...💣");
    await db.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE}`);

    console.log(`Creando base de datos ${MYSQL_DATABASE}...✏️`);
    await db.query(`CREATE DATABASE ${MYSQL_DATABASE}`);
    await db.query(`USE ${MYSQL_DATABASE}`);

    console.log(`-> Creando tabla Direcciones...✏️`);
    await db.query(`CREATE TABLE Direcciones (
        id_direcciones CHAR(36) PRIMARY KEY,
        direccion VARCHAR(255) NOT NULL,
        numero VARCHAR(20),
        piso VARCHAR(10),
        letra_numero VARCHAR(10),
        ciudad VARCHAR(100),
        codigo_postal VARCHAR(20),
        pais VARCHAR(100)
    )`);

    console.log(`-> Creando tabla Usuarios...✏️`);
    await db.query(`CREATE TABLE Usuarios (
        id_usuario CHAR(36) PRIMARY KEY,
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
        direccion_id CHAR(36),
        token VARCHAR(500),
        FOREIGN KEY (direccion_id) REFERENCES Direcciones(id_direcciones)
    )`);

    console.log(`-> Creando tabla Clientes...✏️`);
    await db.query(`CREATE TABLE Clientes (
        id_cliente CHAR(36) PRIMARY KEY,
        nombre VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        telefono VARCHAR(20),
        direccion_id CHAR(36),
        FOREIGN KEY (direccion_id) REFERENCES Direcciones(id_direcciones)
    )`);

    console.log(`-> Creando tabla Productos...✏️`);
    await db.query(`CREATE TABLE Productos (
        id_producto CHAR(36) PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        estado_producto ENUM('activo', 'desactivado') NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
    )`);

    console.log(`-> Creando tabla Servicios...✏️`);
    await db.query(`CREATE TABLE Servicios (
        id_servicio CHAR(36) PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        estado ENUM('activo', 'desactivado') NOT NULL
    )`);

    console.log(`-> Creando tabla Operaciones...✏️`);
    await db.query(`CREATE TABLE Operaciones (
        id_operacion CHAR(36) PRIMARY KEY,
        usuario_id CHAR(36) ,
        producto_id CHAR(36),
        servicio_id CHAR(36),
        cliente_id CHAR(36),
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        tipo VARCHAR(50),
        estado_operacion ENUM('abierto', 'cerrado') NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES Usuarios(id_usuario),
        FOREIGN KEY (producto_id) REFERENCES Productos(id_producto),
        FOREIGN KEY (servicio_id) REFERENCES Servicios(id_servicio),
        FOREIGN KEY (cliente_id) REFERENCES Clientes(id_cliente)
    )`);

    console.log(`-> Creando tabla Valoraciones...✏️`);
    await db.query(`CREATE TABLE Valoraciones (
        id_valoracion CHAR(36) PRIMARY KEY,
        operacion_id CHAR(36) ,
        usuario_id CHAR(36) ,
        puntuacion CHAR(36) NOT NULL,
        comentario TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (operacion_id) REFERENCES Operaciones(id_operacion),
        FOREIGN KEY (usuario_id) REFERENCES Usuarios(id_usuario)
    )`);

    console.log(`-> Creando índices en la tabla Operaciones...✏️`);
    await db.query(`ALTER TABLE Operaciones ADD INDEX (producto_id)`);
    await db.query(`ALTER TABLE Operaciones ADD INDEX (servicio_id)`);
    await db.query(`ALTER TABLE Operaciones ADD INDEX (cliente_id)`);

    console.log(`-> Insertando usuario administrador...🧑‍💼`);
    const adminPayload = {
        email: 'admin@test.com',
        nombre: 'Admin',
        apellidos: 'Test',
        rol: 'administrador',
    };
    
    const adminToken = jwt.sign(adminPayload, JWT_SECRET, { expiresIn: '7d' }); // Genera el token JWT

    await db.query(`
        INSERT INTO Usuarios (id_usuario, email, nombre, apellidos, contraseña, rol, activado, codigo_registro, token)
        VALUES (UUID(), '${adminPayload.email}', '${adminPayload.nombre}', '${adminPayload.apellidos}', '1234', '${adminPayload.rol}', true, '0000_0000_0000_0000', '${adminToken}')
    `);

    console.log(`Base de datos inicializada con éxito...✅`);
}
