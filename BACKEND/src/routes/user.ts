import { Router } from 'express';
import { check } from 'express-validator';

import { usuarioExists } from '../helpers/db-validators';

import { validateFields } from '../middlewares/validate-fileds';

import { create } from '../controllers/user';

const router = Router();

router.post('/', [
   check('usuario').custom(usuarioExists),
   validateFields
], create);


export default router;