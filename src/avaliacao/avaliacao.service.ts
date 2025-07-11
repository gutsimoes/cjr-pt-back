import { Injectable } from '@nestjs/common';
import { AvaliacaoDto } from './dto/avaliacao.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AvaliacaoService {

    constructor(private prisma: PrismaService) { }


    async create(data: AvaliacaoDto) {
        const avaliacao = await this.prisma.avaliacao.create({
            data
        });

        return avaliacao
    }

    async findAll() {
        return await this.prisma.avaliacao.findMany()
    }


    async update(id: number, data: AvaliacaoDto) {
        const avaliacaoExiste = await this.prisma.avaliacao.findUnique({

            where: { id, }
        });

        if (!avaliacaoExiste) {
            throw new Error("avaliacao nao existe com esse id");
        }

        return await this.prisma.avaliacao.update({
            data,
            where: {
                id,
            }
        })

    }

    async delete(id: number) {
        const avaliacaoExiste = await this.prisma.avaliacao.findUnique({

            where: { id, }
        });
        if (!avaliacaoExiste) {
            throw new Error("avaliacao nao existe com esse id");
        }

        return await this.prisma.avaliacao.delete({
            where: { id }
        })
    }

    async getById(id: number) {
        const avaliacaoExiste = await this.prisma.avaliacao.findUnique({

            where: { id, }
        });
        if (!avaliacaoExiste) {
            throw new Error("avaliacao nao existe com esse id");
        }

        return avaliacaoExiste;
    }


    async pegarPorAutor(userId: number) {
        const avaliacaoExiste = await this.prisma.avaliacao.findMany({
            where: { userId },
        })
        return avaliacaoExiste
    }

    async getByProfessorId(professorId: number) {
        const avaliacoesDoProfessor = await this.prisma.avaliacao.findMany({
            where: { professorID: professorId },
        })
        return avaliacoesDoProfessor
    }
}