import { Injectable } from '@nestjs/common';
import { ComentarioDto } from './dto/comentario.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ComentarioService {

    constructor(private prisma:PrismaService) {}

    async create (data: ComentarioDto) {

        const usuario = await this.prisma.user.findUnique({where: {id: data.userId}});
        if (!usuario) {
            throw new Error("não existe usuário com o userId fornecido");
        }

        
        
        const avaliacao = await this.prisma.avaliacao.findUnique({where: {id: data.avaliacaoID}});
        if (!avaliacao) {
            throw new Error("não existe avaliacao com o id fornecido");
        }

        const comentario = await this.prisma.comentario.create({
            data
        });

        return comentario;

    }

    async findAll() {
        return await this.prisma.comentario.findMany()
    }

    async update (id: number, data : ComentarioDto) {
       const comentarioExiste = await this.prisma.comentario.findUnique({
           where: {id,}
       });
       if(!comentarioExiste) {
           throw new Error("comentario nao existe com esse id");
       }
       
       return await this.prisma.comentario.update({
           data,
           where: {
               id,
           }
       })
    
    }

    async delete (id: number) {
       const comentarioExiste = await this.prisma.comentario.findUnique({
           where: {id,}
       });
       if(!comentarioExiste) {
           throw new Error("comentario nao existe com esse id");
       }
       
       return await this.prisma.comentario.delete({
           where: {
               id,
           }
       })
    }

    async getById(id:number) {
        const comentarioExiste = await this.prisma.comentario.findUnique({
           where: {id,}
        });
        if(!comentarioExiste) {
            throw new Error("comentario nao existe com esse id");
        }

        return comentarioExiste;

    }

    async getByAutor(userId:number) {

        const usuario = await this.prisma.user.findUnique({where: {id: userId}});
        if (!usuario) {
            throw new Error("não existe usuário com o userId fornecido");
        }

        const comentarios = await this.prisma.comentario.findMany({where: {userId}});

        return comentarios;
    }

    async getByAvaliacao(avaliacaoID:number) {
        const avaliacao = await this.prisma.avaliacao.findUnique({where: {id: avaliacaoID}});
        if (!avaliacao) {
            throw new Error("não existe avaliacao com o id fornecido");
        }

        const comentarios = await this.prisma.comentario.findMany({where: {avaliacaoID}});

        return comentarios;
    }

    async getNumeroDeComentariosPorAvaliacao():Promise<Record<number,number>> {
        const conta = await this.prisma.comentario.groupBy({
            by: ['avaliacaoID'],
            _count : {
                id: true
            }
        })



        const resultado: Record<number,number> = {};
        conta.forEach((item)=> {
            resultado[item.avaliacaoID] = item._count.id;
        })


        return resultado;
    }



}
