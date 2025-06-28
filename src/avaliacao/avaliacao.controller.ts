import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException } from "@nestjs/common";
import { AvaliacaoDto } from "./dto/avaliacao.dto";
import { AvaliacaoService } from "./avaliacao.service";
import { Public } from "src/auth/decorators/isPublic.decorator";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UserPayload } from "src/auth/types/UserPayload";


@Controller('avaliacao') 

export class AvaliacaoController {

    constructor (private readonly avaliacaoService: AvaliacaoService) {}

    @Post()
    async create(@Body() data: AvaliacaoDto, @CurrentUser() currentUser: UserPayload) {      
        if(data.userId !== currentUser.sub) {
            throw new UnauthorizedException("Você só pode criar avaliações como você mesmo.");
        }
        return this.avaliacaoService.create(data);
    }

    @Public()
    @Get()
    async findAll() {
        return this.avaliacaoService.findAll();
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: AvaliacaoDto, @CurrentUser() currentUser: UserPayload) {
        if(data.userId !== currentUser.sub) {
            throw new UnauthorizedException("Você só pode criar avaliações como você mesmo.");
        }
        return this.avaliacaoService.update(Number(id), data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return this.avaliacaoService.delete(Number(id));
    }

    @Public()
    @Get(":id")
    async getById(@Param("id") id : number) {
        return this.avaliacaoService.getById(Number(id));
    }

    @Public()
    @Get("/autor/:userId")
    async pegarPorAutor(@Param('userId') userId : number) {
        return this.avaliacaoService.pegarPorAutor(Number(userId));
    }

}