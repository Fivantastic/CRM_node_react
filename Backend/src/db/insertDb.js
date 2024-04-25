import chalk from 'chalk';
import { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT } from '../../env.js';
import { getDBPool } from './getPool.js'; 
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const id_address = crypto.randomUUID();
const id_user = crypto.randomUUID();
const id_customer = crypto.randomUUID();
const id_sales = crypto.randomUUID();
const id_product = crypto.randomUUID();
const saleProduct_id = crypto.randomUUID();





const pool = getDBPool();

// Función para insertar datos de prueba
export async function insertTestData() {
  console.log(chalk.bold.blue(`->✏️ Insertando datos de prueba...`));

  try {
    // Insertar datos en la tabla Users
    console.log(chalk.bold.blue(`->✏️ Insertando datos en Users...`));
    await pool.query(`
      INSERT INTO Users (id_user, name, last_name, email, phone, password, role, active, registration_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
       id_user,
      'John',
      'Doe',
      'john12@example.com',
      '123456789',
      await bcrypt.hash('password123', 12),
      'admin',
      true,
      crypto.randomUUID()
    ]);

    // Insertar datos en la tabla Addresses
    console.log(chalk.bold.blue(`->✏️ Insertando datos en Addresses...`));
    await pool.query(`
      INSERT INTO Addresses (id_address, address, number, floor, letter_number, city, zip_code, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
       id_address,
      '123 Main Street',
      '10',
      '3',
      'B',
      'New York',
      '10001',
      'USA'
    ]);

    // Insertar datos en la tabla Customers
    console.log(chalk.bold.blue(`->✏️ Insertando datos en Customers...`));
    await pool.query(`
      INSERT INTO Customers (id_customer, name, email, phone, address_id)
      VALUES (?, ?, ?, ?, ?)
    `, [
       id_customer,
      'Jane Doe',
      'jane@example.com',
      '987654321',
      id_address
        ]);

    // Insertar datos en la tabla Products
    console.log(chalk.bold.blue(`->✏️ Insertando datos en Products...`));
    await pool.query(`
      INSERT INTO Products (id_product, name, description, price, stock, product_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
        id_product,
      'Product 1',
      'Description of Product 1',
      10.99,
      100,
      'active'
    ]);

      // Insertar datos en la tabla SalesProducts
      console.log(chalk.bold.blue(`->✏️ Insertando datos en SalesProducts...`));
      await pool.query(`
        INSERT INTO SalesProducts (id_saleProduct, product_id, quantity, description)
        VALUES (?, ?, ?, ?)
      `, [
        saleProduct_id,
        id_product,
        2,
        'Description of Product 1'
      ]);

    // Insertar datos en la tabla Sales
    console.log(chalk.bold.blue(`->✏️ Insertando datos en Sales...`));
    await pool.query(`
      INSERT INTO Sales (id_sale, user_id,saleProdut_id, customer_id, operation_status)
      VALUES (?, ?, ?, ?, ?)
    `, [
      id_sales,
      id_user,
      saleProduct_id,
      id_customer,
      'open'
    ]);

  

    // Insertar datos en la tabla Visits
    console.log(chalk.bold.blue(`->✏️ Insertando datos en Visits...`));
    await pool.query(`
      INSERT INTO Visits (id_visit, user_id, customer_id, visit_status, visit_date, observations, rating_visit)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      crypto.randomUUID(),
      id_user,
      id_customer,
      'scheduled',
      new Date().toISOString().slice(0, 19).replace('T', ' '),
      'Scheduled visit',
      null
    ]);

    // Insertar datos en la tabla DeliveryNotes
    console.log(chalk.bold.blue(`->✏️ Insertando datos en DeliveryNotes...`));
    await pool.query(`
      INSERT INTO DeliveryNotes (id_note, sale_id, deliverer_id, delivery_status, delivery_date)
      VALUES (?, ?, ?, ?, ?)
    `, [
      crypto.randomUUID(),
      id_sales,
      id_user,
      'pending',
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    ]);

    // Insertar datos en la tabla Modules
    console.log(chalk.bold.blue(`->✏️ Insertando datos en Modules...`));
    await pool.query(`
      INSERT INTO Modules (id_module, user_id, service_type, sale_id, visit_id, deliveryNote_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      crypto.randomUUID(),
      id_user,
      'sale',
      id_sales,
      null,
      null
    ]);

    console.log(chalk.bold.green(`✅ Datos de prueba insertados con éxito...`));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red(`❌ Error al insertar datos de prueba: ${error.message}`));
    process.exit(1);
  }
}

// Llamamos a la función para insertar los datos de prueba
insertTestData();
