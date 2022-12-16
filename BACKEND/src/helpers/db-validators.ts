import connection from '../database/config';

const usuarioExists = async (usuario: string) => {
   const conn = connection();
   const usuarioExists = await conn.promise().query('SELECT * FROM usuarios u WHERE u.usuario = ?', usuario);
   if ((usuarioExists[0] as Array<{}>).length != 0) {
      throw new Error(`El usuario ${usuario} ya existe, intente otro`);
   }
}

export {
   usuarioExists
};