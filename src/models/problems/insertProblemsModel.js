// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para agregar una nueva entrada.
const insertProblemsModel = async (
  id_district,
  title,
  description,
  photo,
  place_detail
) => {
  const pool = await getPool();

  // Insertamos la entrada.
  const problem = await pool.query(
    `INSERT INTO problem( 
            id_district,
            title,
            description,
            photo,
            place_detail
            ) VALUES(?, ?, ?, ?, ?)`,
    [id_district, title, description, photo, place_detail]
  );

  return problem;
};

export default insertProblemsModel;
