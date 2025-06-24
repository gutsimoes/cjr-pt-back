import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      nome: "teste",
      senha: "123456",
      email: "teste@example.com",
      curso: "cic",
      departamento: "CIC/EST",
    },
  });

  console.log("Usuário criado:", user);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
