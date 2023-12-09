//importa el módulo "dotenv"
import dotenv from 'dotenv/config';

//importamos la versión asíncrona del módulo "mysql2"
import mysql from "mysql2/promise";

//importamos las variables de entorno
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

//declaramos una variable para guardar el pool de la conexión
let pool;

// Función que retorna un pool de conexiones con la base de datos.
const getPool = async () => {
//añadimos un try para capturar los posibles errores
  try {
  if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z", //El valor Z establece la zona horaria como UTC.
      });
    }
      pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`)
      return pool;
  } catch (error) {
    console.error(error);  
}
  
}

export default getPool;
