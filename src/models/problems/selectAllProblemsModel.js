// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para obtener el listado de entradas.
const selectAllProblemsModel = async (id_district) => {
  const pool = await getPool();

  // Obtenemos el listado de entradas.
  const [problems] = await pool.query(
    `
                SELECT 
                    P.id_problem,
                    P.title,
                    P.description, 
                    P.create_date,
                    P.photo,
                    P.place_detail,
                    P.problem_status
                FROM problem P
            `
  );

  return problems;
};

export default selectAllProblemsModel;
