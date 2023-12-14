// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import {
  newUserController,
  loginUserController,
} from "../controllers/users/index.js";
// import { authUserController } from "../middleware/index.js";

// Crear un usuario
router.post("/user/register", newUserController);

// Acceso administrador
router.post("/user/login", loginUserController);

export default router;
