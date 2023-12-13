// sacamos la variable del nombre de la DB
import { MYSQL_DATABASE } from "../../env.js";
// importamos pool de conexiones
import getPool from "./getPool.js";

//Funcion para crear tablas y hacer inserts
async function modifiDb() {
  try {
    const pool = await getPool();
    await pool.query(`USE ${MYSQL_DATABASE}`);

    //eliminamos tablas para dejar la base de datos limpia
    await pool.query(`
      DROP TABLE IF EXISTS 
        denunciar_problema,
        problema,
        barrio,
        ciudad,
        usuario
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre_usuario VARCHAR(20) UNIQUE NOT NULL,
        contrasenya VARCHAR(100) NOT NULL,
        tipo_usuario ENUM('admin', 'normal') DEFAULT 'normal',
        correo_electronico VARCHAR(100) UNIQUE NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        codigo_recuperacion_contrasenya VARCHAR(30),
        fecha_modificacion DATETIME ON UPDATE CURRENT_TIMESTAMP 
      );
      `);

    await pool.query(`CREATE TABLE IF NOT EXISTS ciudad (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(20) UNIQUE NOT NULL
     )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS barrio(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario INT NOT NULL,
        id_ciudad INT NOT NULL,
        nombre VARCHAR(40) NOT NULL, 
        FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
        FOREIGN KEY (id_ciudad) REFERENCES ciudad(id) ON DELETE CASCADE
      );
      `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS problema(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_barrio INT NOT NULL,
        titulo VARCHAR(30) NOT NULL,
        descripcion TEXT NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        fecha_resolucion DATETIME ON UPDATE CURRENT_TIMESTAMP,
        foto VARCHAR(100), 
        detalle_lugar VARCHAR(100) NOT NULL,
        estado_problema ENUM('Resuelto', 'Pendiente') DEFAULT 'Pendiente',
        FOREIGN KEY (id_barrio) REFERENCES barrio (id) ON DELETE CASCADE
      );
      `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS denunciar_problema (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario INT NOT NULL,
        id_barrio INT NOT NULL,
        fecha_denuncia DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
        FOREIGN KEY (id_barrio) REFERENCES barrio(id) ON DELETE CASCADE
      );
      `);
    console.log("Tablas creadas correctamente");
    //Creamos usuario administrador
    await pool.query(`INSERT INTO usuario (nombre_usuario, contrasenya, tipo_usuario, correo_electronico ) VALUES ('admin',
    '1a4D5p$', 'admin', 'admin@correo.com')
    `);
    //Creamos Ciudad
    await pool.query(`INSERT INTO ciudad(nombre) VALUES ('narnia')
    `);
    //Creamos Barrios
    await pool.query(`INSERT INTO barrio(id_usuario, id_ciudad, nombre) VALUES 
   (1,1,'Bosque de los Árboles Conversadores'),
   (1,1,'Cair Paravel'),
   (1,1,'Archenland'),
   (1,1,'Montañas del León'),
   (1,1,'Islas Solitarias')
    `);
    console.log("Datos creados correctamente");
  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
}

modifiDb();
