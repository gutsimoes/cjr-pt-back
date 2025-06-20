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
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsDefined()
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @IsDefined()
  @IsString()
  departamento: string;

  @IsDefined()
  @IsString()
  curso: string;

  @IsOptional()
  fotoPerfil?: Buffer;
}
