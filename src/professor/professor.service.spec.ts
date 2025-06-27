import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorService } from './professor.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProfessorService', () => {
  let service: ProfessorService;

  const dto = {
    nome: 'Teste Professor',
    departamento: 'Matemática',
    disciplinaID: 1,
  };

  const prismaMock = {
    professor: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ProfessorService>(ProfessorService);
  });

  it('deve criar um professor com sucesso', async () => {
    const result = await service.create(dto);

    expect(result).toEqual({
      id: 1,
      ...dto,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    expect(prismaMock.professor.create).toHaveBeenCalledWith({
      data: dto,
    });
  });
});



