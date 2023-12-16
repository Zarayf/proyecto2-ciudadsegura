// Importamos express
import express from "express";

// Importamos las rutas de los usuarios y demás rutas
import usersRoutes from "./usersRoutes.js";
import problemsRoutes from "./problemsRoutes.js";

// Creamos router
const router = express.Router();

// Indicamos a express donde estan las rutas y exportamos router
router.use(usersRoutes);
router.use(problemsRoutes);

export default router;
