import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { Persona, Usuario } from '../interfaces/interfaces';

import connection from '../database/config';
import generateJWT from '../helpers/generate-jwt';

export const create = async (req: Request, res: Response) => {
   const { usuario, password, ...rest } = req.body;

   const newPersona: Persona = rest;
   const newUsuario: Usuario = { email: usuario, usuario, password, isActive: true, rol: 1, persona_id: null };

   try {
      const conn = await connection();
      conn.query('INSERT INTO personas SET ?', newPersona, (err, results: any, fields) => {
         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         newUsuario.persona_id = results.insertId;

         const salt = bcryptjs.genSaltSync(10);
         newUsuario.password = bcryptjs.hashSync(password, salt);

         conn.query('INSERT INTO usuarios SET ?', newUsuario, async (err, results: any, fields) => {
            if (err) {
               res.status(500).json({
                  msg: 'Server error',
                  resultado: err,
                  ok: false
               })
            }

            const usuario_id = results.insertId
            const token = await generateJWT(usuario_id);

            res.json({
               msg: 'Usuario se ha registrado correctamente',
               resultado: {
                  token,
                  usuario_id
               },
               ok: true
            });
         });
      });
   } catch (error) {
      res.status(500).json({
         msg: 'Server error',
         resultado: error,
         ok: false
      })
   }
}