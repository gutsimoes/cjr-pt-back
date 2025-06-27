import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProfessorDto) {
    return this.prisma.professor.create({ data });
  }

  findAll() {
    return this.prisma.professor.findMany();
  }

  findOne(id: number) {
    return this.prisma.professor.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateProfessorDto) {
    return this.prisma.professor.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.professor.delete({ where: { id } });
  }
}
