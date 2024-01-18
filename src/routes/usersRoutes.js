// Importamos las dependencias.
import express from 'express';

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import {
  newUserController,
  loginController,
  sendRecoverPassController,
  editUserPassController,
  userProfileController,
} from '../controllers/users/index.js';

import { authUser } from '../middleware/authUser.js';
// Crear un usuario
router.post('/user/register', newUserController);

// Acceso administrador
router.post('/user/login', loginController);
// devuelve el perfil de usuario
router.get('/user/:userId', authUser, userProfileController);

//  enviar email de recuperacion de contraseña
router.post('/user/password/recover', sendRecoverPassController);
// editar contraseña nueva
router.put('/user/password/reset', editUserPassController);
export default router;
