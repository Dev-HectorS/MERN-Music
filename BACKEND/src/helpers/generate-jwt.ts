import jwt from 'jsonwebtoken';

const generateJWT = (usuario_id = '') => {
   return new Promise((resolve, reject) => {
      const payload = { usuario_id };

      jwt.sign(payload, process.env.PRIVATEKEY!, {
         expiresIn: '12h'
      }, (err, token) => {
         if (err) {
            console.log(err);
            reject(`Can't generate token`);
         } else {
            resolve(token);
         }
      })
   })
}

export default generateJWT;