// Importamos las dependencias.
import bcrypt from "bcrypt";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";
// importamos los errores
import {
  userAlreadyRegisteredError,
  emailAlreadyRegisteredError,
} from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
const insertUserModel = async (
  nombre_usuario,
  contrasenya,
  correo_electronico
) => {
  const pool = await getPool();

  // Buscamos en la base de datos algún usuario con ese nombre.
  let [users] = await pool.query(
    `SELECT id FROM usuario WHERE nombre_usuario = ?`,
    [nombre_usuario]
  );

  // Si existe algún usuario con ese nombre lanzamos un error.
  if (users.length > 0) {
    userAlreadyRegisteredError();
  }

  // Buscamos en la base de datos algún usuario con ese email.
  [users] = await pool.query(
    `SELECT id FROM usuario WHERE correo_electronico = ?`,
    [correo_electronico]
  );

  // Si existe algún usuario con ese email lanzamos un error.
  if (users.length > 0) {
    emailAlreadyRegisteredError();
  }
  // Encriptamos la contraseña.
  const hashedPass = await bcrypt.hash(contrasenya, 8);

  // Insertamos el usuario.
  await pool.query(
    `INSERT INTO usuario (nombre_usuario, contrasenya, correo_electronico) VALUES(?, ?, ?)`,
    [nombre_usuario, hashedPass, correo_electronico]
  );
};

export default insertUserModel;
