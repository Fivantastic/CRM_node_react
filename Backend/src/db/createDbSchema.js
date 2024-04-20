import { MYSQL_DATABASE, JWT_SECRET } from "../../env.js";
import jwt from "jsonwebtoken";

export async function createDBSchema(db) {
    console.log("Borrando base de datos (si existe)...💣");
    await db.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE}`);

    console.log(`Creando base de datos ${MYSQL_DATABASE}...✏️`);
    await db.query(`CREATE DATABASE ${MYSQL_DATABASE}`);
    await db.query(`USE ${MYSQL_DATABASE}`);

    console.log(`-> Creando tabla Addresses...✏️`);
    await db.query(`CREATE TABLE Addresses (
        id_address CHAR(36) PRIMARY KEY,
        address VARCHAR(255) NOT NULL,
        number VARCHAR(20),
        floor VARCHAR(10),
        letter_number VARCHAR(10),
        city VARCHAR(100),
        zip_code VARCHAR(20),
        country VARCHAR(100)
    )`);

    console.log(`-> Creando tabla Users...✏️`);
    await db.query(`CREATE TABLE Users (
        id_user CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        role ENUM('seller', 'deliverer', 'admin') NOT NULL,
        active BOOLEAN NOT NULL DEFAULT false,
        registration_code CHAR(36) NOT NULL,
        avatar VARCHAR(255),
        biography TEXT,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        address_id CHAR(36),
        FOREIGN KEY (address_id) REFERENCES Addresses(id_address)
    )`);

    console.log(`-> Creando tabla Customers...✏️`);
    await db.query(`CREATE TABLE Customers (
        id_customer CHAR(36) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address_id CHAR(36),
        FOREIGN KEY (address_id) REFERENCES Addresses(id_address)
    )`);

    console.log(`-> Creando tabla Products...✏️`);
    await db.query(`CREATE TABLE Products (
        id_product CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        product_status ENUM('active', 'inactive') NOT NULL,
        creation_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
    )`);

    console.log(`-> Creando tabla Services...✏️`);
    await db.query(`CREATE TABLE Services (
        id_service CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        status ENUM('active', 'inactive') NOT NULL
    )`);

    console.log(`-> Creando tabla Operations...✏️`);
    await db.query(`CREATE TABLE Operations (
        id_operation CHAR(36) PRIMARY KEY,
        user_id CHAR(36) ,
        product_id CHAR(36),
        service_id CHAR(36),
        customer_id CHAR(36),
        tipe VARCHAR(50),
        operation_status ENUM('open', 'closed') NOT NULL,
        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id_user),
        FOREIGN KEY (product_id) REFERENCES Products(id_product),
        FOREIGN KEY (service_id) REFERENCES Services(id_service),
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer)
    )`);

    console.log(`-> Creando tabla Ratings...✏️`);
    await db.query(`CREATE TABLE Ratings (
        id_rating CHAR(36) PRIMARY KEY,
        operation_id CHAR(36) ,
        user_id CHAR(36) ,
        score CHAR(36) NOT NULL,
        commentary TEXT,
        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (operation_id) REFERENCES Operations(id_operation),
        FOREIGN KEY (user_id) REFERENCES Users(id_user)
    )`);

    console.log(`-> Creando índices en la tabla Operations...✏️`);
    await db.query(`ALTER TABLE Operations ADD INDEX (product_id)`);
    await db.query(`ALTER TABLE Operations ADD INDEX (service_id)`);
    await db.query(`ALTER TABLE Operations ADD INDEX (customer_id)`);

    console.log(`-> Insertando usuario Owner...🧑‍💼`);

    await db.query(`
        INSERT INTO Users (id_user, email, name, last_name, password, role, active, registration_code)
        VALUES (UUID(), 'admin@test.com', 'admin', 'Owner', '$2a$12$PdtHXSVaA9do.Rbo2LV9lOalgFoCYrVvgQZKxMirGmHDVfyA.PXFq', 'admin', 1, UUID())
    `);
    console.log('-------------------------------------------');
    console.log('contraseña del Admin: "123456" sin hashear');
    console.log('-------------------------------------------');

    console.log(`Base de datos inicializada con éxito...✅`);
}