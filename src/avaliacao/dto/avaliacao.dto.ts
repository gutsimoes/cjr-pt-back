export type AvaliacaoDto = {
    id?: number;
    userId: number
    professorID: number;
    disciplinaID: number;
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