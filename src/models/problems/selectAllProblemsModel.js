// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

const selectAllProblemsModel = async (id_district) => {
  const pool = await getPool();

  const [problems] = await pool.query(
    `
                SELECT 
                    P.id_district,
                    P.id_problem,
                    P.title,
                    P.description, 
                    P.create_date,
                    P.photo,
                    P.place_detail,
                    P.problem_status,
                    district.district_name
                FROM problem P
                JOIN district ON p.id_district = district.id_district 
                WHERE P.id_district=?
            `,
    [id_district]
  );

  return problems;
};

export default selectAllProblemsModel;
