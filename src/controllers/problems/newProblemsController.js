// Importamos los modelos.
import insertProblemsModel from "../../models/problems/insertProblemsModel.js";
//importamos modulo fs para crear directorio y poder guardar la foto ahi
import fs from "fs/promises";

//Como __dirname no está en ES modules:
import * as url from "url";
//fileURLToPath sirve para que el formato valga para todos (windows, mac, linux)
//creo una nueva ruta y le digo que salga de estas dos carpetas y vaya a la raiz
const __dirname = url.fileURLToPath(new URL("../../", import.meta.url));

import path from "path";
//import sharp from "sharp";
import { nanoid } from "nanoid";
// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import newProblemsSchemas from "../../schemas/problems/newProblemsSchemas.js";
//  para crear el directorio lo usamos aqui por que no nos funciona la importacion
//  por ahora lo dejamos asi :(
const createdpath = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

// Función controladora final que agrega una nueva entrada.
const newProblemsController = async (req, res, next) => {
  try {
    const { id_district, title, description, photo, place_detail } = req.body;
    let imageFileName;
    //si en la peticion hay un archivo y el archivo se llama photo(en postman poner lo mismo)
    if (req.files && req.files.photo) {
      // Creo el path del directorio uploads
      const uploadsDir = path.join(__dirname, "/uploads");

      // Creo el directorio si no existe
      await createdpath(uploadsDir);

      /*Redimensionar la imagen: esta comentado porque esta dando fallo y no sabemos porque
      const image = sharp(req.files.photo.data);
      image.resize(500);*/

      // Guardo la imagen con un nombre aleatorio en el directorio uploads
      imageFileName = `${nanoid(24)}.jpg`;

      //Guardamos la ruta de la imagen en una constante
      const imgPath = path.join(uploadsDir, imageFileName);

      //Guardamos la imagen en la carpeta uploads.
      //Usamos el modulo fs nativo de node para poner la foto en uploads
      const moveImg = async (path, photo) => {
        try {
          await fs.writeFile(path, photo);
        } catch {
          console.error("No se pudo guardar la imagen");
        }
      };
      let photo = req.files.photo; //guardo en constante photo la imagen recibida en body
      await moveImg(imgPath, photo.data); //del objeto photo usamos propiedad data para que genere la imagen
    }
    // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
    await validateSchemaUtil(newProblemsSchemas, Object.assign(req.body));

    // Insertamos la entrada y obtenemos el id que se le ha asignado.
    const problem = await insertProblemsModel(
      id_district,
      title,
      description,
      imageFileName,
      place_detail
    );

    res.send({
      status: "ok",
      data: {
        entry: {
          id_district,
          title,
          description,
          imageFileName,
          place_detail,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default newProblemsController;
