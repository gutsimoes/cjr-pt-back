import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' }) //garante que não esta vazia 
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O departamento é obrigatório' })//garante que não esta vazia 
  departamento: string;

  @IsInt({ message: 'O ID da disciplina deve ser um número' }) //garante que é um numero
  disciplinaID: number;
}
