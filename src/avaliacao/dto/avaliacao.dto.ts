import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDefined,
  IsNumber,
} from 'class-validator';

export class AvaliacaoDto {
    @IsOptional()
    id?: number;

    @IsDefined()
    @IsNumber()
    userId: number;

    @IsNotEmpty({ message: 'A avaliação deve estar associada a um professor.' })
    @IsDefined()
    @IsNumber()
    professorID: number;

    @IsNotEmpty({ message: 'A avaliação deve estar associada a uma disciplina.' })
    @IsDefined()
    @IsNumber()
    disciplinaID: number;

    @IsNotEmpty({ message: 'O conteúdo não pode estar vazio.' })
    @IsDefined()
    @IsString()
    conteudo: string;
}
// id           Int         @id @default(autoincrement())
//   userId       Int
//   professorID  Int
//   disciplinaID Int
//   conteudo     String
//   createdAt    DateTime    @default(now())
//   updatedAt    DateTime    @updatedAt

//   user         User        @relation(fields: [userId], references: [id])
//   professor    Professor   @relation(fields: [professorID], references: [id])
//   disciplina   Disciplina  @relation(fields: [disciplinaID], references: [id])
//   comentarios  Comentario[]