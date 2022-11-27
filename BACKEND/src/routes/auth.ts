import { Router } from 'express';
import { check } from 'express-validator';

import { SignIn, renewLogin } from '../controllers/auth';

import { validateFields } from '../middlewares/validate-fileds';
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.post('/auth/sign-in', [
   check('usuario', 'Usuario es requerido').not().isEmpty(),
   check('password', 'Usuario es requerido').not().isEmpty(),
   validateFields
], SignIn);


router.get('/auth/renew', validateJWT, renewLogin)

export default router;