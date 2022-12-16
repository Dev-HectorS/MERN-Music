import { Request, Response } from 'express';

import { MiMusica } from '../interfaces/interfaces';

import connection from '../database/config';

export const createMusic = async (req: any, res: Response) => {
   const createMusica: MiMusica = req.body;
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

         createMusica.persona_id = results[0].persona_id;

         conn.query('INSERT INTO mimusica SET ?', createMusica, (err, results: any, fields) => {
            if (err) {
               res.status(500).json({
                  msg: 'Server error',
                  resultado: err,
                  ok: false
               })
            }

            conn.query('SELECT m.mi_musica_id, m.name, m.author FROM mimusica m WHERE m.mi_musica_id = ?', results.insertId, (err, results: any, fields) => {
               if (err) {
                  res.status(500).json({
                     msg: 'Server error',
                     resultado: err,
                     ok: false
                  })
               }

               const music = results[0];

               res.json({
                  msg: 'Nueva canción fue agregada',
                  resultado: {
                     music
                  },
                  ok: true
               })
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

export const updateMusic = async (req: any, res: Response) => {
   const { music_id } = req.params;

   const updateMusic: MiMusica = req.body;
   delete updateMusic.mi_musica_id

   try {
      const conn = await connection();
      conn.query('UPDATE mimusica SET ? WHERE mi_musica_id = ?', [updateMusic, music_id], (err, results: any, fields) => {
         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         conn.query('SELECT m.mi_musica_id, m.name, m.author FROM mimusica m WHERE m.mi_musica_id = ?', music_id, (err, results: any, fields) => {
            if (err) {
               res.status(500).json({
                  msg: 'Server error',
                  resultado: err,
                  ok: false
               })
            }

            const music = results[0];

            res.json({
               msg: 'Canción fue actualizada',
               resultado: {
                  music
               },
               ok: true
            })
         })
      });
   } catch (error) {
      res.status(500).json({
         msg: 'Server error',
         resultado: error,
         ok: false
      })
   }
}

export const deleteMusic = async (req: any, res: Response) => {
   const { music_id } = req.params;

   try {
      const conn = await connection();
      conn.query('DELETE FROM mimusica WHERE mi_musica_id = ?', music_id, (err, results: any, fields) => {
         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         res.json({
            msg: 'Canción fue eliminada',
            ok: true
         })
      });
   } catch (error) {
      res.status(500).json({
         msg: 'Server error',
         resultado: error,
         ok: false
      })
   }
}

export const getMusic = async (req: Request, res: Response) => {
   const { usuario_id } = req.params;

   try {
      const conn = await connection();
      conn.query('SELECT u.usuario, u.email, u.rol, p.persona_id, p.telefono, p.nombre, p.genero, p.fecha_nacimiento  FROM personas p JOIN usuarios u ON u.persona_id = p.persona_id WHERE u.usuario_id = ?', usuario_id, (err, results: any, fields) => {
         if (err) {
            res.status(500).json({
               msg: 'Server error',
               resultado: err,
               ok: false
            })
         }

         const persona_id = results[0].persona_id;
         delete results[0].persona_id;

         const user = results[0];

         conn.query('SELECT m.mi_musica_id, m.name, m.author FROM mimusica m WHERE m.persona_id = ?', persona_id, (err, results: any, fields) => {
            if (err) {
               res.status(500).json({
                  msg: 'Server error',
                  resultado: err,
                  ok: false
               })
            }

            const music = results;

            res.json({
               resultado: {
                  usuario_id: usuario_id,
                  details: user,
                  gustos: {
                     music
                  }
               },
               ok: true
            })
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