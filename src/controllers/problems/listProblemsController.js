//Importamos modelo para hacer búsqueda
import selectAllProblemsModel from "../../models/problems/selectAllProblemsModel.js";

// Función controladora final que retorna el listado de Problemas según barrio elegido.
const listProblemsController = async (req, res, next) => {
  try {
    //Obtengo el ID del barrio para saber cual mostrar
    const { id_district } = req.params;

    //A la consulta del modelo, le pasamos el id del barrio
    const problems = await selectAllProblemsModel(id_district);

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

export default listProblemsController;
