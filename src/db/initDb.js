// sacamos la variable del nombre de la DB
import { MYSQL_DATABASE } from "../../env.js";
// importamos la conexion
import getPool from "./getPool.js";

// creamos el inicio de la estructura de la DB
// aqui iran las tablas!

async function modifiDb() {
  try {
    const pool = await getPool();
    await pool.query(`USE ${MYSQL_DATABASE}`);
    // el codigo siguiente  es para cuando tengamos las tablas
    // y queremos borrarlas solo para hacer pruebas sin datos dentro !!
    // await pool.query(`DROP TABLE IF EXISTS `);
    // console.log("tablas eliminadas para ser creadas");
     
    await pool.query(`CREATE TABLE IF NOT EXISTS usuario (
      id_usuario INT PRIMARY KEY AUTO_INCREMENT,
      nombre_usuario VARCHAR(20) UNIQUE NOT NULL,
      contrasenya VARCHAR(20) NOT NULL,
      dni VARCHAR(9) UNIQUE NOT NULL,
      tipo_usuario ENUM('admin', 'normal') DEFAULT 'normal',
      correo_electronico VARCHAR(20) UNIQUE NOT NULL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      codigo_registro VARCHAR(30),
      codigo_recuperacion_contrasenya ,
      fecha_modificacion DATETIME ON UPDATE CURRENT_TIMESTAMP 
     )`);

     await pool.query(`CREATE TABLE IF NOT EXISTS ciudad (
      id_ciudad INT PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(20) UNIQUE NOT NULL
     )`);

     await pool.query(`CREATE TABLE IF NOT EXISTS barrio(
      id_barrio INT PRIMARY KEY AUTO_INCREMENT,
      id_usuario INT NOT NULL,
      id_ciudad INT NOT NULL,
      barrio VARCHAR(20) NOT NULL, 
      FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
      FOREIGN KEY (id_ciudad) REFERENCES ciudad(id_ciudad) ON DELETE CASCADE
     )`);

     await pool.query(`CREATE TABLE IF NOT EXISTS problema(
      id_problema INT PRIMARY KEY AUTO_INCREMENT,
      id_barrio INT NOT NULL,
      titulo VARCHAR(30) NOT NULL,
      descripcion TEXT NOT NULL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      fecha_resolucion DATETIME ON UPDATE CURRENT_TIMESTAMP,
      foto VARCHAR(100), 
      calle VARCHAR(50) NOT NULL,
      numero INT,
      FOREIGN KEY (id_barrio) REFERENCES barrio (id_barrio) ON DELETE CASCADE
     )`);

     await pool.query(`CREATE TABLE IF NOT EXISTS denunciar_problema (
      id_problema_denunciado INT PRIMARY KEY AUTO_INCREMENT,
      id_usuario INT NOT NULL,
      id_barrio INT NOT NULL,
      fecha_denuncia DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
      FOREIGN KEY (id_barrio) REFERENCES barrio(id_barrio) ON DELETE CASCADE
     )`);

     await pool.query(`INSERT INTO usuario (nombre_usuario, contrasenya, dni, tipo_usuario, correo_electronico ) VALUES ('admin', 
     '1@2B3C4D5e','12345678z', 'admin', 'correo@correo.com' );
     )`);

  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
}

modifiDb();
// ! para iniciar la base de datos utiliza el scrip del package.json
