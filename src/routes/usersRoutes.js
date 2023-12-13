// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import { newUserController } from "../controllers/users/index.js";

// Crear un usuario
router.post("/usuario/registro", newUserController);

export default router;
