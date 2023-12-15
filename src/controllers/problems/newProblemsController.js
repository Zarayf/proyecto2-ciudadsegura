// Importamos los modelos.
import insertProblemsModel from "../../models/problems/insertProblemsModel.js";
// import fs from 'fs/promises';
// import path from 'path';
// import sharp from 'sharp';
// import { v4 as uuid } from 'uuid';
// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

//  ! QUEDA EL ESQUEMA -hecho :)
//Y VALIDAR LA FUNCION CONTROLADORA Y CAMBIAR PASSWORD POR PASS
// Importamos el esquema.
import newProblemsSchemas from "../../schemas/problems/newProblemsSchemas.js";

// Función controladora final que agrega una nueva entrada.
const newProblemsController = async (req, res, next) => {
  try {
    const { id_district, title, description, photo, place_detail } = req.body;

    // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
    await validateSchemaUtil(newProblemsSchemas, Object.assign(req.body));

    // Insertamos la entrada y obtenemos el id que se le ha asignado.
    const problem = await insertProblemsModel(
      id_district,
      title,
      description,
      photo,
      place_detail
      //req.user.id lo comento porque no usamos el id del usuario
    );

    console.log(problem);

    res.send({
      status: "ok",
      data: {
        entry: {
          id_district,
          title,
          description,
          photo,
          place_detail,
          //userId: req.user.id, lo comento porque no usamos el id del usuario
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default newProblemsController;
