// Importamos los modelos.
import insertProblemsModel from "../../models/problems/insertProblemsModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

//  ! QUEDA EL ESQUEMA Y VALIDAR LA FUNCION CONTROLADORA Y CAMBIAR PASSWORD POR PASS
// Importamos el esquema.
import newProblemsSchemas from "../../schemas/problems/newProblemsSchemas.js";

// Función controladora final que agrega una nueva entrada.
const newEntryController = async (req, res, next) => {
  try {
    const { title, description, photo, city, district } = req.body;

    console.log(title);
    // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
    await validateSchemaUtil(newProblemsSchemas, Object.assign(req.body));

    // Insertamos la entrada y obtenemos el id que se le ha asignado.
    const problem = await insertProblemsModel(
      title,
      photo,
      description,
      city,
      district,
      req.user.id
    );

    console.log(entryId);

    res.send({
      status: "ok",
      data: {
        entry: {
          id: entryId,
          title,
          photo,
          description,
          city,
          district,
          userId: req.user.id,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default newEntryController;
