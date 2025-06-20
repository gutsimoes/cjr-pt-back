import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

 @Get(':id')
async findOne(
  @Param('id', ParseIntPipe) id: number,
  @CurrentUser() currentUser: UserPayload,
) {
  if (id !== currentUser.sub) {
    throw new UnauthorizedException('Você só pode acessar seu próprio perfil.');
  }

  return this.userService.findOne(id);
}



  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (id !== currentUser.sub) {
      throw new UnauthorizedException('Você só pode atualizar sua própria conta.');
    }
    return this.userService.update(id, updateUserDto);
  }


  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (id !== currentUser.sub) {
      throw new UnauthorizedException('Você só pode deletar sua própria conta.');
    }
    return this.userService.remove(id);
  }
}
