import { fakerES as faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import crypto from 'crypto';
import {
  MYSQL_DATABASE,
  ADMIN_NAME,
  ADMIN_LAST_NAME,
  ADMIN_EMAIL,
  ADMIN_PHONE,
  ADMIN_PASSWORD,
  ADMIN_ROLE,
  ADMIN_ACTIVE,
} from '../../env.js';
// import { generateRandomPassword } from '../utils/generateRandomPassword.js';

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
        ref_US CHAR(9) UNIQUE NOT NULL,
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
        ref_CT CHAR(9) UNIQUE NOT NULL,
        name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company_name VARCHAR(255),
        NIF VARCHAR(20),
        address_id CHAR(36),
        active BOOLEAN NOT NULL DEFAULT true,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (address_id) REFERENCES Addresses(id_address)
    )`);

  console.log(chalk.bold.blue(`->✏️ Creando tabla Products...`));
  await db.query(`CREATE TABLE Products (
        id_product CHAR(36) PRIMARY KEY,
        ref_PR CHAR(10) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        active BOOLEAN NOT NULL DEFAULT true,
        creation_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
    )`);

  console.log(chalk.bold.blue(`->✏️ Creando tabla SalesProducts...`));
  await db.query(`CREATE TABLE SalesProducts (
        id_saleProduct CHAR(36) PRIMARY KEY,
        product_id CHAR(36) NOT NULL,
        quantity INT NOT NULL,
        description TEXT,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES Products(id_product)
    )`);

  console.log(chalk.bold.blue(`->✏️ Creando tabla Sales...`)); 
  await db.query(`CREATE TABLE Sales (
        id_sale CHAR(36) PRIMARY KEY,
        ref_SL CHAR(10) UNIQUE NOT NULL,
        user_id CHAR(36),
        saleProduct_id CHAR(36),
        customer_id CHAR(36),
        operation_status ENUM('open', 'processing', 'cancelled', 'closed') DEFAULT 'open',
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id_user),
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer),
        FOREIGN KEY (saleProduct_id) REFERENCES SalesProducts(id_saleProduct)
    )`);

  console.log(chalk.bold.blue(`->✏️ Creando tabla Visits...`));
  await db.query(`CREATE TABLE Visits (
        id_visit CHAR(36) PRIMARY KEY,
        ref_VT CHAR(10) UNIQUE NOT NULL,
        user_id CHAR(36) NOT NULL,
        customer_id CHAR(36) NOT NULL,
        visit_status ENUM('scheduled', 'cancelled', 'completed') DEFAULT 'scheduled',
        visit_date DATETIME NOT NULL,
        observations TEXT,
        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id_user),
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer)
    )`);


  console.log(chalk.bold.blue(`->✏️ Creando tabla DeliveryNotes...`));
  await db.query(`CREATE TABLE DeliveryNotes (
        id_note CHAR(36) PRIMARY KEY,
        ref_DN CHAR(10) UNIQUE NOT NULL,
        sale_id CHAR(36),
        deliverer_id CHAR(36),
        delivery_status ENUM('pending', 'readyToShipment', 'incidence', 'cancelled', 'delivering', 'delivered') DEFAULT 'pending',
        customer_id CHAR(36),
        address_id CHAR(36),
        saleProduct_id CHAR(36), 
        delivery_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (sale_id) REFERENCES Sales(id_sale),
        FOREIGN KEY (deliverer_id) REFERENCES Users(id_user),
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer),
        FOREIGN KEY (address_id) REFERENCES Addresses(id_address),
        FOREIGN KEY (saleProduct_id) REFERENCES SalesProducts(id_saleProduct)
  )`);
    
  console.log(chalk.bold.blue(`->✏️ Creando tabla Shipments...`));
  await db.query(`CREATE TABLE Shipments (
        id_shipment CHAR(36) PRIMARY KEY,
        ref_SH CHAR(10) UNIQUE NOT NULL,
        customer_id CHAR(36),
        address_id CHAR(36),
        deliveryNote_id CHAR(36),
        shipment_status ENUM('pending', 'inTransit', 'delivered', 'delayed', 'cancelled', 'refused') DEFAULT 'pending',
        tracking_number VARCHAR(255),
        additional_notes TEXT,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer),
        FOREIGN KEY (address_id) REFERENCES Addresses(id_address),
        FOREIGN KEY (deliveryNote_id) REFERENCES DeliveryNotes(id_note)
    )`);
      
  console.log(chalk.bold.blue(`->✏️ Creando tabla Invoices...`));
  await db.query(`CREATE TABLE Invoices (
        id_invoice CHAR(36) PRIMARY KEY,
        ref_IN CHAR(10) UNIQUE NOT NULL,
        agentUser_id CHAR(36),
        sale_id CHAR(36),
        customer_id CHAR(36),
        company_name VARCHAR(255),
        NIF VARCHAR(20),
        address VARCHAR(255),
        total_price DECIMAL(10,2) NOT NULL,
        including_tax DECIMAL(10,2) NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        payment_method ENUM('cash', 'card', 'transfer') DEFAULT 'transfer',
        invoice_status ENUM('pending', 'processing', 'paid', 'overdue', 'partially_paid', 'cancelled', 'refunded', 'disputed', 'sent') DEFAULT 'pending',
        due_date DATETIME,
        creation_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (agentUser_id) REFERENCES Users(id_user),
        FOREIGN KEY (sale_id) REFERENCES Sales(id_sale),
        FOREIGN KEY (customer_id) REFERENCES Customers(id_customer)
    )`);
    
    console.log(chalk.bold.blue(`->✏️ Creando tabla Payments...`));
  await db.query(`CREATE TABLE Payments (
        id_payment CHAR(36) PRIMARY KEY,
        ref_PM CHAR(10) UNIQUE NOT NULL,
        invoice_id CHAR(36),
        payment_status ENUM('pending', 'cancelled', 'paid') DEFAULT 'pending',
        payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (invoice_id) REFERENCES Invoices(id_invoice)
    )`);
  
  console.log(chalk.bold.blue(`->✏️ Creando tabla Modules...`));
  await db.query(`CREATE TABLE Modules (
        id_module CHAR(36) PRIMARY KEY,
        ref_MD CHAR(10) UNIQUE NOT NULL,
        agentUser_id CHAR(36),
        deliveryUser_id CHAR(36),
        service_type ENUM('sale', 'visit') NOT NULL,
        sale_id CHAR(36),
        visit_id CHAR(36),
        deliveryNote_id CHAR(36),
        invoice_id CHAR(36),
        payment_id CHAR(36),
        shipment_id CHAR(36),
        rating_module ENUM('1', '2', '3', '4', '5'),
        rating_comment TEXT,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (agentUser_id) REFERENCES Users(id_user),
        FOREIGN KEY (deliveryUser_id) REFERENCES Users(id_user),
        FOREIGN KEY (sale_id) REFERENCES Sales(id_sale),
        FOREIGN KEY (visit_id) REFERENCES Visits(id_visit),
        FOREIGN KEY (deliveryNote_id) REFERENCES DeliveryNotes(id_note),
        FOREIGN KEY (invoice_id) REFERENCES Invoices(id_invoice),
        FOREIGN KEY (payment_id) REFERENCES Payments(id_payment),
        FOREIGN KEY (shipment_id) REFERENCES Shipments(id_shipment)
    )`);

  console.log(chalk.bold.magenta(`->🧑‍💼 Creando usuario Owner con las variables de entorno...`));

  // Datos direccion ADMINISTRADOR
  const calle = faker.location.street();
  const address = {
    id_address: faker.string.uuid(),
    address: `Calle ${calle}`,	
    number: faker.number.int(300),
    floor: faker.number.int(10), 
    letter_number: faker.number.int(4),
    city: faker.location.city(),
    zip_code: faker.location.zipCode(),
    country: 'España'
  };
  const id_user = crypto.randomUUID();
  // const password = generateRandomPassword(10);
  const password = ADMIN_PASSWORD;
  const hashed_password = await bcrypt.hash(password, 12);
  const registration_code = crypto.randomUUID();
  const avatarRandom = 'https://i.pravatar.cc/150?u=3456';
  const currentRef = 'US-ZZ001';
  
  // Generar la nueva referencia basada en la referencia actual
  

  //! Aquí podría venir la lógica de enviar un correo electrónico con la contraseña y el registro.

  console.log(chalk.bold.magenta(`->🧑‍💼 Insertando usuario Owner...`));

  await db.query(
    `
    INSERT INTO Addresses (id_address, address, number, floor, letter_number, city, zip_code, country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      address.id_address,
      address.address,
      address.number,
      address.floor,
      address.letter_number,
      address.city,
      address.zip_code,
      address.country
    ]
  );

  await db.query(
    `
    INSERT INTO Users (id_user, ref_US, name, last_name, email, phone, password, address_id, role, avatar, active, registration_code)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      id_user,
      currentRef,
      ADMIN_NAME,
      ADMIN_LAST_NAME,
      ADMIN_EMAIL,
      ADMIN_PHONE,
      hashed_password,
      address.id_address,
      ADMIN_ROLE,
      avatarRandom,
      ADMIN_ACTIVE,
      registration_code,
    ]
  );

  console.log(chalk.bold.green(`✅ Base de datos inicializada con éxito...`));
}