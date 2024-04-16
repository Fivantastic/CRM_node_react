import { MYSQL_DATABASE } from '../../env.js'
import { getPool } from './getPool.js'

async function initDb () {
  try {
    const pool = await getPool()
    await pool.query(`USE ${MYSQL_DATABASE}`)
    
    await pool.query('DROP TABLE IF EXISTS Operaciones')
    await pool.query('DROP TABLE IF EXISTS Clientes')
    await pool.query('DROP TABLE IF EXISTS Productos')
    await pool.query('DROP TABLE IF EXISTS Usuarios')

    await pool.query(`
    CREATE TABLE Usuarios (
      usuario_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      nombre VARCHAR (50) NOT NULL,
      apellidos VARCHAR(255),
      contraseña VARCHAR(30) NOT NULL,
      rol ENUM('comercial', 'repartidor', 'administrador') NOT NULL,
      activado BOOLEAN NOT NULL DEFAULT false,
      codigo_registro CHAR(36) NOT NULL,
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

  );`)

  await pool.query(`
  INSERT INTO Usuarios (email, nombre, apellidos, contraseña, rol, activado, codigo_registro)
  VALUES ('admin@test.com', 'Admin', 'Test', '1234', 'administrador', true, '0000_0000_0000_0000');
  
  `)

    console.log('Base de datos inicializada ✅')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

initDb()