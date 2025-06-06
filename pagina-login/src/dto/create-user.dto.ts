export class CreateUserDto {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  departamento: string;
  curso: string;
  fotoPerfil?: Buffer; 
}

