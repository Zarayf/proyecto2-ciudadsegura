//Importamos pool
import getPool from "../../db/getPool.js";

const editProblemsModel = async (
  //Va a recibir estos parámetros
  id_problem,
  problem_status
) => {
  //Llamamos a la pool de conexiones
  const pool = await getPool();

  //hacemos consulta a la base de datos para actualizar cambios
  await pool.query(
    `UPDATE problem 
  SET
    problem_status = ?
WHERE id_problem = ?`,
    [problem_status, id_problem]
  );
};

export default editProblemsModel;
