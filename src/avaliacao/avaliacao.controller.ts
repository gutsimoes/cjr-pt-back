import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException } from "@nestjs/common";
import { AvaliacaoDto } from "./dto/avaliacao.dto";
import { AvaliacaoService } from "./avaliacao.service";
import { Public } from "src/auth/decorators/isPublic.decorator";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UserPayload } from "src/auth/types/UserPayload";
import { ParseIntPipe } from "@nestjs/common";

@Controller('avaliacao')

export class AvaliacaoController {

    constructor(private readonly avaliacaoService: AvaliacaoService) { }

    @Post()
    async create(@Body() data: AvaliacaoDto, @CurrentUser() currentUser: UserPayload) {
        if (data.userId !== currentUser.sub) {
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
        if (data.userId !== currentUser.sub) {
            throw new UnauthorizedException("Você só pode criar avaliações como você mesmo.");
        }
        return this.avaliacaoService.update(Number(id), data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number, @CurrentUser() currentUser: UserPayload) {

        const autorReal = (await this.avaliacaoService.getById(id)).userId;

        if (autorReal !== currentUser.sub) {
            throw new UnauthorizedException("Você só pode apagar avaliações criadas por você.");
        }

        return this.avaliacaoService.delete(Number(id));
    }

    @Public()
    @Get(":id")
    async getById(@Param("id") id: number) {
        return this.avaliacaoService.getById(Number(id));
    }

    @Public()
    @Get("/autor/:userId")
    async pegarPorAutor(@Param('userId') userId: number) {
        return this.avaliacaoService.pegarPorAutor(Number(userId));
    }

    @Public()
    @Get('professor/:professorId')
    async getAvaliacoesDoProfessor(@Param('professorId', ParseIntPipe) professorId: number) {
        return this.avaliacaoService.getByProfessorId(professorId);
    }
}