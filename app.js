// importamos dotenv para sacar las variables necesarias, usamos express para el servidor
// y morgan para su respectivo uso
import "dotenv/config";
import express from "express";
import morgan from "morgan";
// creamos server express y utilizamos morgan
const app = express();
app.use(express.json());
app.use(morgan("dev"));

// ponemos a escuchar el servidor
app.listen(process.env.PORT, () => {
  console.log(`servidor escuchando en http:localhost:${process.env.PORT}`);
});
