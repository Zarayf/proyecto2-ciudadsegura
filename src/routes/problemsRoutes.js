// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import { newProblemsController } from "../controllers/problems/index.js";

// Acceso administrador
router.post("/problems/", newProblemsController);

export default router;
