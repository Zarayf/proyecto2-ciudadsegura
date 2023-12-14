// Importamos las dependencias.
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";
// importamos los errores
import {
  userAlreadyRegisteredError,
  emailAlreadyRegisteredError,
} from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
const insertUserModel = async (user_name, password, email) => {
  const pool = await getPool();

  // Buscamos en la base de datos algún usuario con ese nombre.
  let [user] = await pool.query(
    `
  SELECT id_user FROM user WHERE user_name = ?`,
    [user_name]
  );

  // Si existe algún usuario con ese nombre lanzamos un error.
  if (user.length > 0) {
    userAlreadyRegisteredError();
  }

  // Buscamos en la base de datos algún usuario con ese email.
  [user] = await pool.query(`SELECT id_user FROM user WHERE email = ?`, [
    email,
  ]);

  // Si existe algún usuario con ese email lanzamos un error.
  if (user.length > 0) {
    emailAlreadyRegisteredError();
  }
  // Encriptamos la contraseña.
  const hashedPass = await bcrypt.hash(password, 10);

  // Insertamos el usuario.
  await pool.query(
    `INSERT INTO user ( user_name, password, email) VALUES( ?, ?, ? )`,
    [user_name, hashedPass, email]
  );
};

export default insertUserModel;
