import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já está em uso.');
    }

    const user = await this.prisma.user.create({ data });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário ${id} não encontrado`);
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({ where: { id }, data });
      return updatedUser;
    } catch {
      throw new NotFoundException(`Usuário ${id} não encontrado`);
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({ where: { id } });
      return deletedUser;
    } catch {
      throw new NotFoundException(`Usuário ${id} não encontrado`);
    }
  }
}