//Importamos modelo para hacer búsqueda
import selectProblems from "../../models/problems/selectProblems.js";

// Función controladora final que retorna el listado de Problemas según barrio elegido.
const listProblemsControllerComplete = async (req, res, next) => {
  try {

    //A la consulta del modelo, le pasamos el id del barrio
    const problems = await selectProblems();

    res.send({
      status: "ok",
      data: {
        problems,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default listProblemsControllerComplete;
