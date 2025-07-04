import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ComentarioDto } from './dto/comentario.dto';
import { ComentarioService } from './comentario.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';
import { Public } from 'src/auth/decorators/isPublic.decorator';


@Controller('comentario')
export class ComentarioController {

    constructor (private readonly comentarioService: ComentarioService) {}

    @Post()
    async create(@Body() data: ComentarioDto, @CurrentUser() currentUser: UserPayload) {
        if(data.userId !== currentUser.sub) {
            throw new UnauthorizedException("Você só pode comentar como você mesmo.")
        }
        return this.comentarioService.create(data);
    }

    @Public()
    @Get()
    async findAll() {
        return this.comentarioService.findAll();
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: ComentarioDto, @CurrentUser() currentUser: UserPayload) {
        if(data.userId !== currentUser.sub) {
            throw new UnauthorizedException("Você só pode comentar como você mesmo.");
        }
        return this.comentarioService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param("id") id : number, @CurrentUser() currentUser : UserPayload ) {
        
        //ver se comentario do id é do autor que mandou solicitacao

        const autorReal = (await this.comentarioService.getById(id)).userId;

        if(autorReal !== currentUser.sub) {
            throw new UnauthorizedException("Você só pode apagar comentarios criados por você.");
        }

        return this.comentarioService.delete(id);
    }

    @Public()
    @Get(":id")
    async getById(@Param("id") id : number) {
        return this.comentarioService.getById(id);
    }

    @Public()
    @Get("/autor/:userId")
    async getByAutor(@Param("userId") userId : number) {
        return this.comentarioService.getByAutor(userId);
    }

    @Public()
    @Get("/avaliacao/:avaliacaoID")
    async getByAvaliacao(@Param("avaliacaoID") avaliacaoID : number) {

        return this.comentarioService.getByAvaliacao(avaliacaoID);
    }

    @Public()
    @Get("/n_avaliacao/:avaliacaoID")
    async getNumeroByAvaliacao(@Param("avaliacaoID") avaliacaoID : number) {
        return this.comentarioService.getNumeroByAvaliacao(avaliacaoID);
    }


}
