import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
export declare class ProfessorService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProfessorDto): import(".prisma/client").Prisma.Prisma__ProfessorClient<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProfessorClient<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, data: UpdateProfessorDto): import(".prisma/client").Prisma.Prisma__ProfessorClient<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProfessorClient<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
