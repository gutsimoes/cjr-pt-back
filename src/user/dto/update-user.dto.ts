import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//copia as propriedades do CreateUserDto e transforma em opicional
export class UpdateUserDto extends PartialType(CreateUserDto) { }