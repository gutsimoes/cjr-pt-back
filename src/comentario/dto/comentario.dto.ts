import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDefined,
  IsNumber,
} from 'class-validator';


export class ComentarioDto {
    @IsOptional()
    id?: number;

    @IsNotEmpty({ message: 'O comentário deve estar associada a um usuário.' })
    @IsNumber()
    userId: number;

    @IsNotEmpty({ message: 'O comentário deve estar associado a uma avaliação.' })
    @IsNumber()
    avaliacaoID: number;

    @IsNotEmpty({ message: 'O comentário não pode estar vazio.' })
    @IsString()
    conteudo: string;


}


// model Comentario {
//   id           Int        @id @default(autoincrement())
//   userId       Int
//   avaliacaoID  Int
//   conteudo     String
//   createdAt    DateTime   @default(now())
//   updatedAt    DateTime   @updatedAt

//   user         User       @relation(fields: [userId], references: [id])
//   avaliacao    Avaliacao  @relation(fields: [avaliacaoID], references: [id])
// }