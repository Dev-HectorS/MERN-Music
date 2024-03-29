import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import connection from '../database/config';

const validateJWT = async (req: Request | any, res: Response, next: NextFunction) => {
   const token = req.header('x-token');
   if (!token) {
      return res.status(401).json({
         msg: 'Acceso no autorizado',
         ok: false
      })
   }

   try {
      const { usuario_id }: any = jwt.verify(token, process.env.PRIVATEKEY!);

      const conn = connection();
      conn.query('SELECT u.usuario_id FROM usuarios u WHERE u.usuario_id = ?', usuario_id, (err, results: any, fields) => {

         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         if (results.length == 0) {
            return res.status(401).json({
               msg: 'Acceso no autorizado',
               resultado: err,
               ok: false
            })
         }

         req.user = results[0];

         next();
      });
   } catch (error) {
      console.log(error);
      res.status(401).json({
         msg: 'Token not valid',
         ok: false
      })
   }
}

export {
   validateJWT
}