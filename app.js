// importamos dotenv para sacar las variables necesarias, usamos express para el servidor
// y morgan para su respectivo uso y filepload para recibir archivos

import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

//  importamos las rutas
import routes from './src/routes/index.js';
import errorController from './src/controllers/errores/errorController.js';
import { PORT } from './env.js';
// creamos server express y utilizamos morgan
const app = express();
app.use(morgan('dev'));

// usamos express para recibir leer los datos que lleguen en json y en formato filedata
app.use(express.json());

app.use(cors());
app.use(fileUpload());
// indicamos a express la ruta del archivo estatico
app.use('/uploads', express.static('./src/uploads'));
// usamos e indica el router
app.use(routes);
// le indicamos a express el controlador de errores
app.use(errorController);
// ponemos a escuchar el servidor
app.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});
