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
  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
}

modifiDb();
// ! para iniciar la base de datos utiliza el scrip del package.json
