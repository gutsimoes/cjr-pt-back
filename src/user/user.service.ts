import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

function base64ToBuffer(dataUrl: string): Buffer {
  const base64 = dataUrl.split(',')[1]; // remove o prefixo
  return Buffer.from(base64, 'base64'); // cria o buffer
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }


  // cria um novo usuário
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
        fotoPerfil: createUserDto.fotoPerfil || null, // aqui é só a string base64
      },
    });
  }


  // busca e retorna todos os usuários com campos true
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

  // Busca e retorna um usuário com campos true
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

  // busca usuário pelo email (serve na autenticação)
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  // atualiza os dados de um usuário existent
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    let hashedPassword: string | undefined;

    // se a senha foi atualizada cria o outro hash 
    if (updateUserDto.senha) {
      hashedPassword = await bcrypt.hash(updateUserDto.senha, 10);
    }


    return await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        ...(hashedPassword && { senha: hashedPassword }),
        fotoPerfil: updateUserDto.fotoPerfil ?? user.fotoPerfil,
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


  // Remove um usuário pelo ID
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

  async findPublicProfile(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        fotoPerfil: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }
}