import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O departamento é obrigatório' })
  departamento: string;

  @IsInt({ message: 'O ID da disciplina deve ser um número' })
  disciplinaID: number;
}
