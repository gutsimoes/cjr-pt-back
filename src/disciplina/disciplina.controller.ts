import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { DisciplinaDto } from "./dto/disciplina.dto";
import { DisciplinaService } from "./disciplina.service";
import { Public } from "src/auth/decorators/isPublic.decorator";


@Controller('disciplina') 

export class DisciplinaController {

    constructor (private readonly disciplinaService: DisciplinaService) {}

    @Post()
    async create(@Body() data: DisciplinaDto) {
        return this.disciplinaService.create(data);
    }

    @Public()
    @Get()
    async findAll() {
        return this.disciplinaService.findAll();
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: DisciplinaDto) {
        return this.disciplinaService.update(Number(id), data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return this.disciplinaService.delete(Number(id));
    }

    @Public()
    @Get(":id")
    async getById(@Param("id") id : number) {
        return this.disciplinaService.getById(Number(id));
    }

    @Public()
    @Get(":id/professores")
    async getProfessores(@Param("id") id : number) {
        return this.disciplinaService.getProfessores(Number(id));
    }


}