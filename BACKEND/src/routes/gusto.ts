import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-jwt';

import { createMusic, updateMusic, deleteMusic, getMusic } from '../controllers/music';

const router = Router();

router.post('/gustos', validateJWT, createMusic);

router.put('/gustos/:music_id', validateJWT, updateMusic);

router.delete('/gustos/:music_id', validateJWT, deleteMusic);

router.get('/gustos/:usuario_id', validateJWT, getMusic)

export default router;