import mysql from "mysql2/promise";

import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from ".env";

let pool;

// Función que retorna un pool de conexiones con la base de datos.
const getPool = async () => {
  if (!pool) {
      const poolTemp = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z",
      });
    }
      return await pool.getPool();
}

export default getPool;
