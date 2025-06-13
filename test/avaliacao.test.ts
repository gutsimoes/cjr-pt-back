import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('Testes de Avaliação com User, Professor e Disciplina', () => {
  beforeAll(async () => {
    await prisma.comentario.deleteMany();
    await prisma.avaliacao.deleteMany();
    await prisma.professor.deleteMany();
    await prisma.user.deleteMany();
    await prisma.disciplina.deleteMany();
  });

  it('deve criar uma avaliação corretamente', async () => {
    const user = await prisma.user.create({
      data: {
        nome: "Aluno Teste",
        email: "teste@exemplo.com",
        senha: "senha123",
        departamento: "Computação",
        curso: "Engenharia de Software"
      }
    });

    const disciplina = await prisma.disciplina.create({
      data: {
        nome: "Cálculo 1"
      }
    });

    const professor = await prisma.professor.create({
      data: {
        nome: "Prof. João",
        departamento: "Exatas",
        disciplina: {
          connect: { id: disciplina.id }
        }
      }
    });

    const avaliacao = await prisma.avaliacao.create({
      data: {
        conteudo: "Ótimo professor!",
        user: { connect: { id: user.id } },
        professor: { connect: { id: professor.id } },
        disciplina: { connect: { id: disciplina.id } }
      }
    });

    expect(avaliacao).toHaveProperty("id");
    expect(avaliacao.conteudo).toBe("Ótimo professor!");
  });
});