// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import {
  newUserController,
  loginController,
  sendRecoverPassController,
  editUserPassController,
} from "../controllers/users/index.js";

// Crear un usuario
router.post("/user/register", newUserController);

// Acceso administrador
router.post("/user/login", loginController);

//  enviar email de recuperacion de contraseña
router.post("/user/password/recover", sendRecoverPassController);
// editar contraseña nueva
router.put("/user/password/reset", editUserPassController);
export default router;
