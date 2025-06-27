import { Injectable } from '@nestjs/common';
import { DisciplinaDto } from './dto/disciplina.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DisciplinaService {
    
    constructor(private prisma: PrismaService) {}


    async create (data: DisciplinaDto) {
        const disciplina = await this.prisma.disciplina.create({
            data
        });

        return disciplina
    }

    async findAll() {
        return await this.prisma.disciplina.findMany()
    }
  

    async update (id: number, data : DisciplinaDto) {
        const disciplinaExiste = await this.prisma.disciplina.findUnique({

            where: {id,}
        });

        if(!disciplinaExiste) {
            throw new Error("disciplina nao existe com esse id");
        }
        
        return await this.prisma.disciplina.update({
            data,
            where: {
                id,
            }
        })

    }

    async delete (id:number) {
        const disciplinaExiste = await this.prisma.disciplina.findUnique({

            where: {id,}
        }); 
        if(!disciplinaExiste) {
            throw new Error("disciplina nao existe com esse id");
        }

        return await this.prisma.disciplina.delete({
            where: {id}
        })
    }

    async getById (id:number) {
        const disciplinaExiste = await this.prisma.disciplina.findUnique({

            where: {id,}
        }); 
        if(!disciplinaExiste) {
            throw new Error("disciplina nao existe com esse id");
        }

        return disciplinaExiste;
    }

}
