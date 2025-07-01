import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';

//copia as propriedades do CreateProfessorDto e transforma em opicional
export class UpdateProfessorDto extends PartialType(CreateProfessorDto) { }