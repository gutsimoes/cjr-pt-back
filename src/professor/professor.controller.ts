import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) { }

  // cria professor
  @Post()
  async create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.create(createProfessorDto);
  }

  //lista todos os professores (sem autentidicação) 
  @Public()
  @Get()
  async findAll() {
    return this.professorService.findAll();
  }

  //lista um professor especifico  (sem autentidicação) 
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.professorService.findOne(id);
  }


  //atualiza os professor
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ) {
    return this.professorService.update(id, updateProfessorDto);
  }

  //deletar professor
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.professorService.remove(id);
  }
}

//PerseIntPipe converte pra inteiro 
