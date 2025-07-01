import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private readonly prisma: PrismaService) { }

  //verifica se todos os campos foram preenchidos  
  async create(createProfessorDto: CreateProfessorDto) {
    if (!createProfessorDto) {
      throw new BadRequestException('Dados do professor são obrigatórios');
    }

    // verifica se disciplina existe
    const disciplina = await this.prisma.disciplina.findUnique({
      where: { id: createProfessorDto.disciplinaID },
    });

    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    // evita criar professor duplicado com mesmo nome e disciplina 
    const existingProfessor = await this.prisma.professor.findFirst({
      where: {
        nome: createProfessorDto.nome,
        disciplinaID: createProfessorDto.disciplinaID,
      },
    });

    if (existingProfessor) {
      throw new ConflictException('Professor com esse nome e disciplina já existe');
    }

    //retorna o registro completo 
    return await this.prisma.professor.create({
      data: {
        nome: createProfessorDto.nome,
        departamento: createProfessorDto.departamento,
        disciplinaID: createProfessorDto.disciplinaID,
      },
      include: {
        disciplina: {
          select: { id: true, nome: true },
        },
        avaliacoes: true, //inclui  as avaliações relacionadas
      },
    });
  }

  //busca todos os professores cadastrados no banco 
  async findAll() {
    return await this.prisma.professor.findMany({
      include: {
        disciplina: {
          select: { id: true, nome: true },
        },
        avaliacoes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  //busca um professores cadastrado no banco 
  async findOne(id: number) {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
      include: {
        disciplina: {
          select: { id: true, nome: true },
        },
        avaliacoes: true,
      },
    });

    //se não existir esse professor
    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado`);
    }

    return professor;
  }

  // atualiza um professor
  async update(id: number, updateProfessorDto: UpdateProfessorDto) {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
    });

    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado`);
    }

    if (updateProfessorDto.disciplinaID) {
      const disciplina = await this.prisma.disciplina.findUnique({
        where: { id: updateProfessorDto.disciplinaID },
      });
      if (!disciplina) {
        throw new NotFoundException('Disciplina não encontrada');
      }
    }

    return await this.prisma.professor.update({
      where: { id },
      data: updateProfessorDto,
      include: {
        disciplina: {
          select: { id: true, nome: true },
        },
        avaliacoes: true,
      },
    });
  }

  // remove um professor
  async remove(id: number) {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
    });

    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado`);
    }

    return await this.prisma.professor.delete({
      where: { id },
      include: {
        disciplina: {
          select: { id: true, nome: true },
        },
      },
    });
  }
}
