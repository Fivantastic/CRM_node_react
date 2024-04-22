import bcrypt from "bcrypt";
import chalk from "chalk"; // Importa chalk para dar estilo a la salida
import { MYSQL_DATABASE, ADMIN_NAME, ADMIN_LAST_NAME, ADMIN_EMAIL, ADMIN_PHONE, ADMIN_ROLE, ADMIN_ACTIVE } from "../../env.js";
import { generateRandomPassword } from "../utils/generateRandomPassword.js";

export async function createDBSchema(db) {
    console.log(chalk.bold.yellow("Borrando base de datos (si existe)... 💣"));
    await db.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE}`);

    console.log(chalk.bold.green(`Creando base de datos ${MYSQL_DATABASE}... ✏️`));
    await db.query(`CREATE DATABASE ${MYSQL_DATABASE}`);
    await db.query(`USE ${MYSQL_DATABASE}`);

    console.log(chalk.bold.blue(`->✏️ Creando tabla Addresses...`));
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

    console.log(chalk.bold.blue(`->✏️ Creando tabla Users...`));
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

    console.log(chalk.bold.blue(`->✏️ Creando tabla Customers...`));
    await db.query(`CREATE TABLE Customers (
        id_customer CHAR(36) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address_id CHAR(36),
        FOREIGN KEY (address_id) REFERENCES Addresses(id_address)
    )`);

    console.log(chalk.bold.blue(`->✏️ Creando tabla Products...`));
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

    console.log(chalk.bold.blue(`->✏️ Creando tabla Services...`));
    await db.query(`CREATE TABLE Services (
        id_service CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        status ENUM('active', 'inactive') NOT NULL
    )`);

    console.log(chalk.bold.blue(`->✏️ Creando tabla Operations...`));
    await db.query(`CREATE TABLE Operations (
        id_operation CHAR(36) PRIMARY KEY,
        user_id CHAR(36),
        product_id CHAR(36),
        service_id CHAR(36),
        customer_id CHAR(36),
        type VARCHAR(50),
        operation_status ENUM('open', 'closed') NOT NULL,
        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id_user),
        FOREIGN KEY (product_id) REFERENCES Products(id_product),
        FOREIGN KEY (service_id) REFERENCES Services(id_service),
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer)
    )`);

    console.log(chalk.bold.blue(`->✏️ Creando tabla Ratings...`));
    await db.query(`CREATE TABLE Ratings (
        id_rating CHAR(36) PRIMARY KEY,
        operation_id CHAR(36),
        user_id CHAR(36),
        score CHAR(36) NOT NULL,
        commentary TEXT,
        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (operation_id) REFERENCES Operations(id_operation),
        FOREIGN KEY (user_id) REFERENCES Users(id_user)
    )`);

    console.log(chalk.bold.blue(`->✏️ Creando índices en la tabla Operations...`));
    await db.query(`ALTER TABLE Operations ADD INDEX (product_id)`);
    await db.query(`ALTER TABLE Operations ADD INDEX (service_id)`);
    await db.query(`ALTER TABLE Operations ADD INDEX (customer_id)`);

    console.log(chalk.bold.magenta(`->🧑‍💼 Creando usuario Owner con las variables de entorno...`));

    const id_user = crypto.randomUUID();
    const password = generateRandomPassword(10);
    const hashed_password = await bcrypt.hash(password, 12);
    const registration_code = crypto.randomUUID();

    //! Aquí podría venir la lógica de enviar un correo electrónico con la contraseña y el registro.

    console.log(chalk.bold.yellow('--------------------------------------------------------'));
    console.log(chalk.bold.yellow('ID de usuario:', id_user));
    console.log(chalk.bold.yellow('Contraseña:', password));
    console.log(chalk.bold.yellow('Código de registro:', registration_code));
    console.log(chalk.bold.yellow('--------------------------------------------------------'));

    console.log(chalk.bold.magenta(`->🧑‍💼 Insertando usuario Owner...`));

    await db.query(`
    INSERT INTO Users (id_user, name, last_name, email, phone, password, role, active, registration_code)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id_user, ADMIN_NAME, ADMIN_LAST_NAME, ADMIN_EMAIL, ADMIN_PHONE, hashed_password, ADMIN_ROLE, ADMIN_ACTIVE, registration_code]);

    console.log(chalk.bold.green(`✅ Base de datos inicializada con éxito...`));
}
