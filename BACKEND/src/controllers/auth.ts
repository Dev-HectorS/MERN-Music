import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import generateJWT from '../helpers/generate-jwt';

import connection from '../database/config';

export const SignIn = async (req: Request, res: Response) => {
   const { usuario, password } = req.body;

   try {
      const conn = await connection();
      conn.query('SELECT * FROM usuarios u WHERE u.usuario = ?', usuario, async (err, results: any, fields) => {
         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: res,
               ok: false
            })
         }

         if (results.length == 0) {
            return res.status(400).json({
               msg: 'Usuario / Contraseña no existe',
               ok: false
            })
         }

         if (!results[0].isActive) {
            return res.status(400).json({
               msg: 'Usuario se encuentra inactivo',
               ok: false
            })
         }

         const validPassword = bcryptjs.compareSync(password, results[0].password);
         if (!validPassword) {
            return res.status(400).json({
               msg: 'Usuario o Contraseña no es valido',
               ok: false
            })
         }

         const usuario_id = results[0].usuario_id;
         const token = await generateJWT(usuario_id);

         res.json({
            msg: 'Sesión iniciada correctamente',
            resultado: {
               token,
               usuario_id
            },
            ok: true
         })
      });
   } catch (error) {
      res.json({
         msg: 'Login Error',
         ok: false,
      })
   }
}

export const renewLogin = async (req: Request | any, res: Response) => {
   const { usuario_id } = req.user;

   const token = await generateJWT(usuario_id);

   res.json({
      msg: 'Sesión renovada correctamente',
      resultado: {
         token,
         usuario_id,
      },
      ok: true,
   })
}