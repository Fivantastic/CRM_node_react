import { MYSQL_DATABASE } from '../../env.js'
import { getPool } from './getPool.js'

async function initDb () {
  try {
    const pool = await getPool()
    await pool.query(`USE ${MYSQL_DATABASE}`)
    await pool.query('DROP TABLE IF EXISTS users')
    await pool.query(`
    CREATE TABLE Usuarios (
      usuario_id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE,
      nombre_apellidos VARCHAR(255),
      contraseña VARCHAR(255),
      rol ENUM('comercial', 'repartidor', 'administrador'),
      activado BOOLEAN DEFAULT false,
      codigo_registro CHAR(36),
      avatar VARCHAR(255),
      biografia TEXT,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      fecha_actualizacion DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
    );`)

    await pool.query(`
    CREATE TABLE Clientes (
      cliente_id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255),
      email VARCHAR(255),
      telefono VARCHAR(20),
      direccion VARCHAR(255),
      usuario_id INT,
      FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
  );`)
    await pool.query(`
    CREATE TABLE Operaciones (
      operacion_id INT AUTO_INCREMENT PRIMARY KEY,
      cliente_id INT,
      fecha_operacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      valoracion_servicio INT,
      FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      fecha_actualizacion DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP

  );`)
    await pool.query(`
    CREATE TABLE Productos (
      producto_id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255),
      descripcion TEXT,
      precio DECIMAL(10, 2),
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      fecha_actualizacion DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP

  );
    `)
    console.log('Database initalizated ✅')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

initDb()