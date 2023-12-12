# Ciudad más accesible.

Se trata de una web donde se publican problemas de accesibilidad en la ciudad.
El administrador crea un nuevo lugar con algun problema. Los usuarios pueden escoger un barrio y ver los problemas activos y pendientes que tiene. 

## Instalar

1. Instalar las dependencias mediante el comando npm install o npm i.


2. Guardar el archivo .env.example como .env y cubrir los datos necesarios.


3. Ejecutar npm run initDb para crear las tablas necesarias en la base de datos.


4. Ejecutar npm run dev para lanzar el servidor.

## Base de datos

### usuarios

|   Campo              |   Tipo       |  Descripción                          |
|--------------------- |--------------|---------------------------------------|
| id                   | VARCHAR(20)  | Identificador único del usuario       |
| nombre               | VARCHAR(20)  | Nombre del usuario                    |
| contrasenya          | VARCHAR(20)  | Contraseña del usuario                |
| dni                  | VARCHAR(9)   | Dni del usuario                       |
| tipo usuario         | ENUM         | Rol del usuario ("admin" o "normal")  |
|  correo electronico  | VARCHAR(20)  | Correo electrónico del usuario        |
|  fecha creacion      |


