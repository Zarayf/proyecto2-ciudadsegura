// Importamos express
import express from "express";

// Importamos las rutas de los usuarios y demás rutas
import usersRoutes from "./usersRoutes.js";

// Creamos router
const router = express.Router();

// Indicamos a express donde estan las rutas y exportamos router
router.use(usersRoutes);

export default router;
