import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Avaliacao', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('cria uma nova avaliacao', async () => {
    const avaliacao = await prisma.avaliacao.create({
      data: {
        professorID: 1,
        usuarioID: 1,
        disciplinaID: 1,
        conteudo: 'Bom professor!',
      },
    })

    expect(avaliacao).toHaveProperty('id')
    expect(avaliacao.conteudo).toBe('Bom professor!')
  })
})
