import { Router } from 'express';
import { check } from 'express-validator';

import { usuarioExists } from '../helpers/db-validators';

import { validateFields } from '../middlewares/validate-fileds';
import { validateJWT } from '../middlewares/validate-jwt';

import { createUser, getUser, deleteUser, updateUser } from '../controllers/user';

const router = Router();

router.post('/', [
   check('usuario').custom(usuarioExists),
   validateFields
], createUser);

router.put('/', validateJWT, updateUser);

router.delete('/', validateJWT, deleteUser);

router.get('/:usuario_id', validateJWT, getUser);

export default router;