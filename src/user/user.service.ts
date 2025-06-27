import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Este e-mail já está sendo usado.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        senha: hashedPassword,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        departamento: true,
        curso: true,
        fotoPerfil: true,
        createdAt: true,
        updatedAt: true,
        avaliacoes: true,
        comentarios: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        departamento: true,
        curso: true,
        fotoPerfil: true,
        createdAt: true,
        updatedAt: true,
        avaliacoes: true,
        comentarios: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    let hashedPassword: string | undefined;

    if (updateUserDto.senha) {
      hashedPassword = await bcrypt.hash(updateUserDto.senha, 10);
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        ...(hashedPassword && { senha: hashedPassword }),
      },
      select: {
        id: true,
        nome: true,
        email: true,
        departamento: true,
        curso: true,
        fotoPerfil: true,
        createdAt: true,
        updatedAt: true,
        avaliacoes: true,
        comentarios: true,
      },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        departamento: true,
        curso: true,
        fotoPerfil: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
