import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsDefined,
  IsByteLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' }) 	//ve se não ta vazio
  nome: string;

  @IsDefined()
  @IsEmail({}, { message: 'E-mail inválido' }) //	valida se o valor é um e-mail válido.
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' }) //minimo de caracters pra senha
  senha: string;

  @IsDefined() //Obrigatório.
  @IsString()
  departamento: string;

  @IsDefined() //Obrigatório.
  @IsString()
  curso: string;

  @IsOptional()
  @IsString()
  fotoPerfil?: string;
}
