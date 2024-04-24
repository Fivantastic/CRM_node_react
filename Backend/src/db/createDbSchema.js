import bcrypt from 'bcrypt';
import chalk from 'chalk';
import crypto from 'crypto';
import {
  MYSQL_DATABASE,
  ADMIN_NAME,
  ADMIN_LAST_NAME,
  ADMIN_EMAIL,
  ADMIN_PHONE,
  ADMIN_ROLE,
  ADMIN_ACTIVE,
} from '../../env.js';
import { generateRandomPassword } from '../utils/generateRandomPassword.js';

export async function createDBSchema(db) {
  console.log(chalk.bold.yellow('Borrando base de datos (si existe)... 💣'));
  await db.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE}`);

  console.log(
    chalk.bold.green(`Creando base de datos ${MYSQL_DATABASE}... ✏️`)
  );
  await db.query(`CREATE DATABASE ${MYSQL_DATABASE}`);
  await db.query(`USE ${MYSQL_DATABASE}`);

  console.log(chalk.bold.blue(`->✏️ Creando tabla Addresses...`));
  await db.query(`CREATE TABLE Addresses (
        id_address CHAR(36) PRIMARY KEY,
        address VARCHAR(255),
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
        address_id CHAR(36),
        role ENUM('salesAgent', 'deliverer', 'admin') NOT NULL,
        active BOOLEAN NOT NULL DEFAULT false,
        registration_code CHAR(36) NOT NULL,
        avatar VARCHAR(255),
        biography TEXT,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
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

  console.log(chalk.bold.blue(`->✏️ Creando tabla SalesProducts...`));
  await db.query(`CREATE TABLE SalesProducts (
        id_saleProduct CHAR(36) PRIMARY KEY,
        product_id CHAR(36) NOT NULL,
        quantity INT NOT NULL,
        description TEXT,
        FOREIGN KEY (product_id) REFERENCES Products(id_product)
    )`);

  console.log(chalk.bold.blue(`->✏️ Creando tabla Sales...`)); //Modulo de ventas
  await db.query(`CREATE TABLE Sales (
        id_sale CHAR(36) PRIMARY KEY,
        user_id CHAR(36),
        saleProdut_id CHAR(36),
        customer_id CHAR(36),
        operation_status ENUM('open', 'closed') DEFAULT 'open',
        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id_user),
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer),
        FOREIGN KEY (saleProdut_id) REFERENCES SalesProducts(id_saleProduct)
    )`);

  console.log(chalk.bold.blue(`->✏️ Creando tabla Visits...`));
  await db.query(`CREATE TABLE Visits (
        id_visit CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        customer_id CHAR(36) NOT NULL,
        visit_status ENUM('scheduled', 'completed') DEFAULT 'scheduled',
        visit_date DATETIME NOT NULL,
        observations TEXT,
        rating_visit ENUM('1', '2', '3', '4', '5'),
        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id_user),
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer)
    )`);


    console.log(chalk.bold.blue(`->✏️ Creando tabla DeliveryNotes...`));
    await db.query(`
        CREATE TABLE DeliveryNotes (
            id_note INT AUTO_INCREMENT PRIMARY KEY, -- Autoincrementado
            sale_id CHAR(36),
            deliverer_id CHAR(36),
            delivery_status ENUM('pending', 'delivered') NOT NULL,
            delivery_date DATETIME DEFAULT NOW(), -- Fecha de creación
            address_id CHAR(36),
            product_id CHAR(36), -- Para almacenar referencia a un producto
            FOREIGN KEY (sale_id) REFERENCES Sales(id_sale),
            FOREIGN KEY (deliverer_id) REFERENCES Users(id_user),
            FOREIGN KEY (address_id) REFERENCES Addresses(id_address),
            FOREIGN KEY (product_id) REFERENCES Products(id_product) -- Nueva clave foránea
        )`);


  console.log(chalk.bold.blue(`->✏️ Creando tabla Modules...`));
  await db.query(`CREATE TABLE Modules (
        id_module CHAR(36) PRIMARY KEY,
        user_id CHAR(36),
        service_type ENUM('sale', 'visit', 'deliveryNote') NOT NULL,
        sale_id CHAR(36),
        visit_id CHAR(36),
        deliveryNote_id CHAR(36),
        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id_user),
        FOREIGN KEY (sale_id) REFERENCES Sales(id_sale),
        FOREIGN KEY (visit_id) REFERENCES Visits(id_visit),
        FOREIGN KEY (deliveryNote_id) REFERENCES DeliveryNotes(id_note)
    )`);

  console.log(
    chalk.bold.magenta(
      `->🧑‍💼 Creando usuario Owner con las variables de entorno...`
    )
  );

  const id_user = crypto.randomUUID();
  const password = generateRandomPassword(10);
  const hashed_password = await bcrypt.hash(password, 12);
  const registration_code = crypto.randomUUID();

  //! Aquí podría venir la lógica de enviar un correo electrónico con la contraseña y el registro.

  console.log(
    chalk.bold.yellow(
      '--------------------------------------------------------'
    )
  );
  console.log(chalk.bold.yellow('ID de usuario:', id_user));
  console.log(chalk.bold.yellow('Contraseña:', password));
  console.log(chalk.bold.yellow('Código de registro:', registration_code));
  console.log(
    chalk.bold.yellow(
      '--------------------------------------------------------'
    )
  );

  console.log(chalk.bold.magenta(`->🧑‍💼 Insertando usuario Owner...`));

  await db.query(
    `
    INSERT INTO Users (id_user, name, last_name, email, phone, password, role, active, registration_code)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      id_user,
      ADMIN_NAME,
      ADMIN_LAST_NAME,
      ADMIN_EMAIL,
      ADMIN_PHONE,
      hashed_password,
      ADMIN_ROLE,
      ADMIN_ACTIVE,
      registration_code,
    ]
  );

  console.log(chalk.bold.green(`✅ Base de datos inicializada con éxito...`));
}
