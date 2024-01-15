// sacamos la variable del namede la DB
import { MYSQL_DATABASE } from '../../env.js';
// importamos pool de conexiones
import getPool from './getPool.js';

//Funcion para crear tablas y hacer inserts
async function modifiDb() {
  try {
    const pool = await getPool();
    await pool.query(`USE ${MYSQL_DATABASE}`);

    //eliminamos tablas para dejar la base de datos limpia
    await pool.query(`
      DROP TABLE IF EXISTS 
        problem_report,
        problem,
        district,
        city,
        user
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS  user (
        id_user INT PRIMARY KEY AUTO_INCREMENT,
        user_name VARCHAR(20) UNIQUE NOT NULL,
        pass VARCHAR(100) NOT NULL,
        pass VARCHAR(100) NOT NULL,
        user_type ENUM('admin', 'normal') DEFAULT 'normal',
        email VARCHAR(100) UNIQUE NOT NULL,
        registrationCode CHAR(30),
        create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        recovery_code VARCHAR(30),
        update_date DATETIME ON UPDATE CURRENT_TIMESTAMP 
      );
      `);

    await pool.query(`CREATE TABLE IF NOT EXISTS city (
      id_city INT PRIMARY KEY AUTO_INCREMENT,
      city_name VARCHAR(20) UNIQUE NOT NULL
     )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS district (
        id_district INT PRIMARY KEY AUTO_INCREMENT,
        id_city INT NOT NULL,
        district_name VARCHAR(40) NOT NULL, 
        FOREIGN KEY (id_city) REFERENCES city(id_city) ON DELETE CASCADE
      );
      `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS problem(
        id_problem INT PRIMARY KEY AUTO_INCREMENT,
        id_district INT NOT NULL,
        title VARCHAR(30) NOT NULL,
        description TEXT NOT NULL,
        create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        solution_date DATETIME ON UPDATE CURRENT_TIMESTAMP,
        photo VARCHAR(100), 
        place_detail VARCHAR(100) NOT NULL,
        problem_status ENUM('Resuelto', 'Pendiente') DEFAULT 'Pendiente',
        FOREIGN KEY (id_district) REFERENCES district(id_district) ON DELETE CASCADE
      );
      `);

    //Pendiente de uso para la próxima implementación de votos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS problem_report (
        id_problem_report INT PRIMARY KEY AUTO_INCREMENT,
        id_user INT NOT NULL,
        id_district INT NOT NULL,
        report_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_user) REFERENCES  user(id_user) ON DELETE CASCADE,
        FOREIGN KEY (id_district) REFERENCES district(id_district) ON DELETE CASCADE
      );
      `);

    console.log('Tablas creadas correctamente');

   

    


    //Creamos usuario administrador
    await pool.query(`INSERT INTO  user (user_name, pass, email ) VALUES
     ('tanjiro','1a4D5p$','tanjiro@correo.com')
    `);
    //Creamos city
    await pool.query(`INSERT INTO city(city_name) VALUES ('narnia')
    `);
    //Creamos districts
    await pool.query(`INSERT INTO district (id_city, district_name) VALUES 
      (1,'Bosque de los Árboles Conversadores'),
      (1,'Cair Paravel'),
      (1,'Archenland'),
      (1,'Montañas del León'),
      (1,'Islas Solitarias')
    `);
    console.log('Datos creados correctamente');
  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
}

modifiDb();
