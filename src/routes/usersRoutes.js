// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import {
  newUserController,
  loginController,
} from "../controllers/users/index.js";

// Crear un usuario
router.post("/user/register", newUserController);

// Acceso administrador
router.post("/user/login", loginController);

export default router;
