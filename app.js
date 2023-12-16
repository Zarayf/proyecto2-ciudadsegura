// importamos dotenv para sacar las variables necesarias, usamos express para el servidor
// y morgan para su respectivo uso y filepload para recibir archivos

import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";

//  importamos las rutas
import routes from "./src/routes/index.js";
import { PORT } from "./env.js";
// creamos server express y utilizamos morgan
const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(fileUpload());
app.use(routes);

// ponemos a escuchar el servidor
app.listen(PORT, () => {
  console.log(`servidor escuchando en http:localhost:${PORT}`);
});
