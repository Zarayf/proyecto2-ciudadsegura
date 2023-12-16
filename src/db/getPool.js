import mysql from "mysql2/promise";

// Obtenemos las variables de entorno necesarias mediante destructuring.
import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "../../env.js";

let pool;
// funcion para conectar con la db
const getPool = async () => {
  try {
    // Si la variable "pool" es undefined...
    if (!pool) {
      // Creamos una pool temporal.
      const poolTemp = mysql.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
      });

      // Con el pool temporal creamos la base de datos si no existe.
      await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

      // Creamos un grupo de conexiones.
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z",
      });
    }

    // Retornamos un pool.
    return pool;
  } catch (err) {
    console.error(err);
  }
};

// Exportamos la función.
export default getPool;
