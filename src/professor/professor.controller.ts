import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async create(@Body() createProfessorDto: CreateProfessorDto) {
    const professor = await this.professorService.create(createProfessorDto);
    return professor;
  }

    @Get()
    async findAll() {
        return this.professorService.findAll();
    }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProfessorDto: UpdateProfessorDto) {
    const updatedProfessor = await this.professorService.update(id, updateProfessorDto);
    return updatedProfessor;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedProfessor = await this.professorService.remove(id);
    return deletedProfessor;
  }

    @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const professor = await this.professorService.findOne(id);
    return professor;
  }
}