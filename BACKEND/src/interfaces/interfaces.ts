export interface Persona {
   persona_id?: number;
   telefono: string;
   nombre: string;
   apaterno: string;
   amaterno: string;
   fecha_nacimiento: Date;
   genero: string;
}

export interface Usuario {
   usuario_id?: number;
   persona_id?: number | null;
   rol: number;
   email: string;
   usuario: string;
   password: string;
   token?: string;
   token_recovery?: string;
   isActive: boolean;
   createdAt?: string;
   updateAt?: string;
   deletedAt?: string;
}

export interface MiMusica {
   mi_musica_id?: number;
   persona_id?: number;
   name: string;
   author: string;
}