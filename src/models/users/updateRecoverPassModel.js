// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos los servicios.
import sendMailUtil from "../../utils/sendMailUtil.js";

const updateRecoverPassModel = async (email, recovery_code) => {
  const pool = await getPool();

  // Actualizamos el código de recuperación de contraseña del usuario.
  await pool.query(`UPDATE user SET recovery_code = ? WHERE email = ?`, [
    recovery_code,
    email,
  ]);

  // Creamos el asunto del email de recuperación de contraseña.
  const emailSubject = "Recuperación de contraseña de ciudad segura app :)";

  // Creamos el contenido del email
  const emailBody = `
            Se ha solicitado la recuperación de contraseña para este usuario de ciudad segura, 
                
            Utiliza el siguiente código para crear una nueva contraseña: ${recovery_code}

            Si no has sido tú ignora este email.
        `;

  // Enviamos el email de verificación al usuario.
  await sendMailUtil(email, emailSubject, emailBody);
};

export default updateRecoverPassModel;
