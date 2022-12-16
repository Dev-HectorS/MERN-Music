import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { Persona, Usuario } from '../interfaces/interfaces';

import connection from '../database/config';
import generateJWT from '../helpers/generate-jwt';

export const createUser = async (req: Request, res: Response) => {
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

export const updateUser = async (req: any, res: Response) => {
   const updatePersona: Persona = req.body;
   const usuario = req.user;

   try {
      const conn = await connection();
      conn.query('SELECT * FROM usuarios u WHERE u.usuario_id = ?', usuario.usuario_id, (err, results: any, fields) => {
         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         conn.query('UPDATE personas SET ? WHERE persona_id = ?', [updatePersona, results[0].persona_id], (err, results: any, fields) => {
            if (err) {
               res.status(500).json({
                  msg: 'Server error',
                  resultado: err,
                  ok: false
               })
            }

            res.json({
               msg: 'Información se actualizado correctamente',
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

export const deleteUser = async (req: any, res: Response) => {
   const { usuario_id } = req.user;

   try {
      const conn = await connection();
      conn.query('DELETE personas FROM personas JOIN usuarios  on usuarios.persona_id = personas.persona_id WHERE usuarios.usuario_id = ?', usuario_id, (err, results: any, fields) => {
         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         res.json({
            msg: 'Cuenta eliminada correctamente',
            ok: true
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

export const getUser = async (req: Request, res: Response) => {
   const { usuario_id } = req.params;

   try {
      const conn = await connection();
      conn.query('SELECT u.usuario, u.email, u.rol, p.telefono, p.nombre, p.genero, p.fecha_nacimiento  FROM personas p JOIN usuarios u ON u.persona_id = p.persona_id WHERE u.usuario_id = ?', usuario_id, (err, results: any, fields) => {

         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         if (results.length == 0) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         const details = results[0];

         res.json({
            resultado: {
               usuario_id,
               details: details
            },
            ok: true
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