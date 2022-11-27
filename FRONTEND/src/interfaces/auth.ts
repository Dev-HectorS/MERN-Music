
export interface NewUsuario {
   apaterno: string;
   amaterno: string;
   telefono: string;
   usuario: string;
   genero: string;
   fecha_nacimiento: string;
   password: string;
}

export interface LoginUsuario {
   usuario: string;
   password: string;
}