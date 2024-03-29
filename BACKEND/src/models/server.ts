import express, { Application } from 'express';
import cors from 'cors';
import 'colors';

import dbConnection from '../database/config';

import authRoutes from '../routes/auth';
import userRoutes from '../routes/user';
import gustoRoutes from '../routes/gusto';

class Server {
   private app: Application;
   private port: string;
   private path = '/api/v1/usuarios';

   constructor() {
      this.app = express();
      this.port = process.env.PORT || '8080';

      this.connectDB();

      this.middlewares();

      this.routes();
   }


   async connectDB() {
      try {
         await dbConnection().connect((err: any) => {
            if (err) { return console.error('Failed to connect to database'.red) };
            console.log('Database:', 'online'.cyan);
         });
      } catch (error) {
         throw new Error('Failed to connect to database'.red);
      }
   }

   middlewares() {
      // Cors
      this.app.use(cors());

      // Express parse
      this.app.use(express.json());
   }

   routes() {
      this.app.use(this.path, authRoutes)
      this.app.use(this.path, userRoutes)
      this.app.use(this.path, gustoRoutes)
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log(`Express server running on port: ${this.port.cyan}`);
      })
   }
}

export default Server;