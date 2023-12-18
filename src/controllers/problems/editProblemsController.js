//Importo Modelo (vamos a buscar la entrada y luego actualizar datos)
import editProblemsModel from "../../models/problems/editProblemsModel.js";

const editProblemsController = async (req, res, next) => {
  try {
    //Obtengo el ID del problema para saber cual vamos a editar
    const { id_problem } = req.params;

    //Obtengo el objeto Body para recoger los cambios que me pida el usuario
    /*Queriamos aprovechar para editar la entrada. 
    De momento sólo se puede cambiar estado (Pendiente o resuelto)*/
    const { problem_status } = req.body;

    //llamo a la base de datos y le paso los cambios recogidos en el req.body
    await editProblemsModel(id_problem, problem_status);

    //Responder con un objeto de la entrada con los cambios nuevos
    res.send({
      status: "datos actualizados",
      data: {
        problem: {
          problem_status,
          solution_date: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default editProblemsController;
