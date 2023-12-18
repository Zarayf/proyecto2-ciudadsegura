# Ciudad más accesible

Se trata de una web donde se publican problemas de accesibilidad en la ciudad.
El administrador crea un nuevo lugar con algun problema. Los usuarios pueden escoger un barrio y ver los problemas activos y pendientes que tiene. 

## Instalar

1. Instalar las dependencias mediante el comando __npm install__ o __npm i__.


2. Guardar el archivo __.env.js__ como __.env__ y cubrir los datos necesarios.


3. Ejecutar __npm run initDb__ para crear las tablas necesarias en la base de datos.


4. Ejecutar __npm run__ dev para lanzar el servidor.

## Base de datos

### user

|   Campo              |   Tipo       |  Descripción                          |
|----------------------|--------------|---------------------------------------|
| id_user                 | VARCHAR(20)  | Identificador único del usuario       |
| user_name              | VARCHAR(20)  | Nombre del usuario                    |
| pass           | VARCHAR(20)  | Contraseña del usuario                |
| user_type         | ENUM         | Rol del usuario ("admin" o "normal")  |
| email  | VARCHAR(20)  | Correo electrónico del usuario        |
| create_date       | DATETIME     | Fecha y hora de creación del usuario  |
| recovery_code     | VARCHAR(30)  | Código de recuperación de contraseña  |
| update_date   | DATETIME     | Fecha/hora de la última modificación  |

### city

|   Campo              |   Tipo       |  Descripción                          |
|----------------------|--------------|---------------------------------------|
|  id_city             | INT          | Identificador única de la ciudad      |
| city_name| VARCHAR(20) | Nombre de la ciudad |
| 

### district

|   Campo              |   Tipo       |  Descripción                          |
|----------------------|--------------|---------------------------------------|
| id_district | INT | Identificador único del barrio |
| id_city | INT | Identificador de la ciudad a la que pertenece el barrio |
| district_name | VARCHAR(40) | Nombre del barrio |

### problem

|   Campo              |   Tipo       |  Descripción                          |
|----------------------|--------------|---------------------------------------|
| id_problem | INT | Identificador único del problema de accesibilidad|
| id_district | INT | Identificador del barrio donde está el problema |
| title | VARCHAR(30) | Título del problema de accesibilidad |
| description | TEXT | Descripción del problema |
| create_date | DATETIME | Fecha y hora de creación del problema |
| solution_date | DATETIME | Fecha de la solución al problema |
| photo | VARCHAR(100) | Foto del problema |
| place_detail | VARCHAR(100) | Detalles del lugar del problema |
| problem_status |  ENUM  | Estado del problema ('Resuelto', 'Pendiente') |


## Endpoints del usuario

* __POST - /user/login__ - El usuario-admin se logea.

## Endpoints de los problemas de accesibilidad

* __POST - /problems__ - Crea un problema.


* __GET - /problems/districts/:id_district__ - Retorna el listado de problemas de un barrio.


* __PUT - /problems/:id_problem__ - Edita un problema.





