// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import {
  newProblemsController,
  editProblemsController,
  listProblemsController,
} from "../controllers/problems/index.js";

// Acceso administrador para crear problema
router.post("/problems/", newProblemsController);

//Acceso admin para editar problema
router.put("/problems/:id_problem", editProblemsController);

//Consultar problemas indicando un barrio (añado /districts/ para distinguir de lo anterior)
router.get("/problems/districts/:id_district", listProblemsController);

export default router;
