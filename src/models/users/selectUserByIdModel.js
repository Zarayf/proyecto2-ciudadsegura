import getPool from '../../db/getPool.js';

const selectUserByIdModel = async (userId) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT id_user, user_name, email, create_date
            FROM user
            WHERE id_user = ?
        `,
    [userId]
  );

  return user[0];
};

export default selectUserByIdModel;
